import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {TagifyService} from './tagify.service';
import {TagifySettings} from './tagify-settings';

@Component({
  selector: 'tagify',
  template: `<input [ngClass]="inputClass" #inputRef/>`,
  styles: [
  ]
})
export class TagifyComponent implements AfterViewInit {

  @Input() settings: TagifySettings = {};
  @Input() inputClass = '';
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();

  @ViewChild('inputRef', {static: true}) inputRef: ElementRef;

  private tagify;

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
  }

}
