import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { async } from 'rxjs/internal/scheduler/async';
import Tagify from '@yaireo/tagify';
import { TagifyService } from './tagify.service';
import { TagData, TagifySettings } from './tagify-settings';


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

  @ViewChild('inputRef', {static: true}) inputRef: ElementRef<HTMLInputElement>;

  @Input() settings: TagifySettings = {};
  @Input() inputClass = '';
  @Input() name = '0';
  @Input() suggestions: Observable<string[]>;
  @Input()
  set value(v: TagData[]) {
    this.value$.next(v);
  }

  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() tInput = new EventEmitter<string>();
  @Output() valueChange = new EventEmitter<TagData[]>();

  constructor(
    private tagifyService: TagifyService
  ) { }

  ngAfterViewInit(): void {
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
        this.tagify.value.forEach(v => {
          if (!tags.find(t => t.value === v.value)) {
            this.tagify.removeTags(v.value);
          }
        });
      });

    // listen to tagify events
    this.tagify.on('input', e => {
      this.tInput.emit(e.detail.value);
    });

    merge(
      // @ts-ignore
      fromEvent(this.tagify, 'add'),
      // @ts-ignore
      fromEvent(this.tagify, 'remove')
    )
      .pipe(
        throttleTime(50, async, { leading: false, trailing: true }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(() => {
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.tagifyService.destroy(this.name);
  }

}
