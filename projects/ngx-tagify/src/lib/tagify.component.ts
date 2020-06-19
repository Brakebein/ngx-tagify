import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {TagifyService} from './tagify.service';
import {TagifySettings} from './tagify-settings';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import Tagify from '@yaireo/tagify';

interface TagData {
  value: string;
  [key: string]: any;
}

@Component({
  selector: 'tagify',
  template: `<input [name]="name" [ngClass]="inputClass" #inputRef/>`,
  styles: [
  ]
})
export class TagifyComponent implements AfterViewInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  private value$ = new BehaviorSubject<TagData[]>(null);
  private tagify: Tagify;

  @ViewChild('inputRef', {static: true}) inputRef: ElementRef;

  @Input() settings: TagifySettings = {};
  @Input() inputClass = '';
  @Input() name = '0';
  @Input() suggestions: Observable<any>;
  @Input()
  set value(v: TagData[]) {
    this.value$.next(v);
  }

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() tInput = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<TagData[]>();

  constructor(private tagifyService: TagifyService) { }

  ngAfterViewInit() {
    this.settings.callbacks = this.settings.callbacks || {};

    if (!this.settings.callbacks.hasOwnProperty('add')) {
      this.settings.callbacks.add = () => this.add.emit({
        tags: this.tagify.value,
        added: this.tagify.value[this.tagify.value.length - 1]
      });
    }

    if (!this.settings.callbacks.hasOwnProperty('remove')) {
      this.settings.callbacks.remove = () => this.remove.emit(this.tagify.value);
    }

    this.tagify = this.tagifyService.init(this.inputRef.nativeElement, this.settings);

    // listen to value changes from outside
    this.value$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(tags => {
        if (!tags) { return; }
        tags.forEach(t => {
          if (!this.tagify.value.find(v => v.value === t.value)) {
            this.tagify.addTags([t]);
          }
        });
      });

    // listen to tagify events
    this.tagify.on('input', e => {
      console.log(e);
      this.tInput.emit(e.detail.value);
    });

    this.tagify.on('add', () => {
      this.valueChange.emit(this.tagify.value.slice());
    });

    this.tagify.on('remove', () => {
      this.valueChange.emit(this.tagify.value.slice());
    });

    // listen to suggestions updates
    if (this.suggestions) {
      this.suggestions
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(list => {
          this.tagify.settings.whitelist = list;
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.tagifyService.destroy(this.name);
  }

}
