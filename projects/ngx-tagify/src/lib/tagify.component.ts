import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  OnDestroy,
  output,
  viewChild,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  asyncScheduler,
  BehaviorSubject,
  fromEvent,
  Observable,
  pairwise,
  Subject,
} from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import Tagify, { BaseTagData, TagData, TagifySettings } from '@yaireo/tagify';
import { TagifyService } from './tagify.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'tagify',
  imports: [NgClass],
  template: `<input [ngClass]="inputClass()" #inputRef />
    <span style="display: none"><ng-content></ng-content></span>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagifyComponent),
      multi: true,
    },
  ],
})
export class TagifyComponent<T extends BaseTagData = TagData>
  implements AfterViewInit, ControlValueAccessor, OnDestroy
{
  private valueData: string | T[];
  private valueType = 'undefined';
  private onChange: any = Function.prototype;
  private onTouched: any = Function.prototype;

  private unsubscribe$ = new Subject<void>();
  private value$ = new BehaviorSubject<string | T[]>(null);
  private tagify: Tagify<T>;
  private skip = false;

  private tagifyService = inject(TagifyService);
  private element = inject(ElementRef<HTMLElement>);

  inputRef = viewChild<ElementRef<HTMLInputElement>>('inputRef');

  settings = input<TagifySettings<T>>({});

  name = input<string>('');

  whitelist = input<Observable<string[] | T[]>>();

  inputClass = input<string>('');

  readonly = input<boolean>(false);

  disabled = input<boolean>(false);

  get value(): string | T[] {
    return this.valueData;
  }

  set value(v: string | T[]) {
    if (v !== this.valueData) {
      this.valueData = v;
      this.onChange(v);
    }
  }

  add = output<{ tags: T[]; added: T }>();
  remove = output<T[]>();
  tInput = output<string>();

  constructor() {
    effect(() => {
      const readonly = this.readonly();
      if (this.tagify) {
        this.tagify.setReadonly(readonly);
      }
    });
    effect(() => {
      const disabled = this.disabled();
      if (this.tagify) {
        this.tagify.setDisabled(disabled);
      }
    });
    toObservable(this.inputClass)
      .pipe(pairwise())
      .subscribe(([oldValue, newValue]) => {
        this.setTagsClass(oldValue, newValue);
      });
  }

  ngAfterViewInit(): void {
    const settings = this.settings();
    settings.callbacks = settings.callbacks || {};

    if (!Object.prototype.hasOwnProperty.call(settings.callbacks, 'add')) {
      settings.callbacks.add = () =>
        this.add.emit({
          tags: this.tagify.value,
          added: this.tagify.value[this.tagify.value.length - 1],
        });
    }

    if (!Object.prototype.hasOwnProperty.call(settings.callbacks, 'remove')) {
      settings.callbacks.remove = () => this.remove.emit(this.tagify.value);
    }

    const innerText = this.element.nativeElement.textContent;

    this.tagify = new Tagify(this.inputRef().nativeElement, settings);

    // add to service if name is provided
    if (this.name().length) {
      this.tagifyService.add(this.name(), this.tagify);
    }

    this.tagify.setReadonly(this.readonly());
    this.tagify.setDisabled(this.disabled());

    // if there is some text inside component, load this value and skip first change check
    if (innerText.length) {
      this.tagify.loadOriginalValues(innerText);
      this.skip = true;
      setTimeout(() => {
        this.setValue();
      });
    }

    // listen to value changes from outside
    this.value$.pipe(takeUntil(this.unsubscribe$)).subscribe((tags) => {
      if (tags === null) return;

      if (this.skip) {
        this.skip = false;
        return;
      }

      if (this.valueType === 'undefined') {
        this.valueType = typeof tags;
      }

      // if string is passed, e.g. via reactive forms
      if (typeof tags === 'string') {
        this.tagify.loadOriginalValues(tags);
        setTimeout(() => {
          this.setValue();
        });
        return;
      }

      // add all tags (already existing tags will be skipped
      this.tagify.addTags(tags, false, true);

      // remove all tags that are not part of value anymore
      this.tagify.value.forEach((v) => {
        if (!tags.find((t) => t.value === v.value)) {
          // somehow removeTags() with string parameter doesn't always find the tag element
          // this is a workaround for finding the right tag element
          const tagElm = this.tagify
            .getTagElms()
            .find(
              (el) =>
                el.attributes.getNamedItem('value').textContent === v.value,
            );
          this.tagify.removeTags(tagElm);
        }
      });
    });

    // listen to tagify events
    this.tagify.on('input', (e) => {
      const value = 'value' in e.detail ? e.detail.value : e.detail.textContent;
      this.tInput.emit(value);
      if (this.valueType === 'string' && this.tagify.settings.mode === 'mix') {
        this.value = this.tagify.getMixedTagsAsString();
      }
    });

    fromEvent(this.tagify, 'change')
      .pipe(
        // throttle used to reduce number of value changes when adding/removing a bunch of tags
        throttleTime(0, asyncScheduler, { leading: false, trailing: true }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe(() => {
        this.setValue();
      });

    // listen to suggestions updates
    this.whitelist()
      ?.pipe(takeUntil(this.unsubscribe$))
      .subscribe((list) => {
        this.tagify.settings.whitelist = list;
      });
  }

  writeValue(tags: string | T[]) {
    this.value$.next(tags);
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  private setValue(): void {
    if (this.valueType === 'string') {
      if (this.tagify.settings.mode === 'mix') {
        this.value = this.tagify.getMixedTagsAsString();
      } else {
        this.value = this.tagify.DOM.originalInput.value;
      }
    } else {
      this.value = this.tagify.value.slice();
    }
  }

  /**
   * Tagify creates a `tags` element to which the classes of the `input` element are applied.
   * Changes of `inputClass` are applied automatically to the `input` element, but have to be
   * manually applied to the `tags` element.
   */
  private setTagsClass(oldClass: string, newClass: string): void {
    const tagsElement = this.element.nativeElement.querySelector('tags');
    if (tagsElement) {
      tagsElement.classList.remove(...oldClass.split(/\s+/));
      tagsElement.classList.add(...newClass.split(/\s+/));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.tagify.destroy();

    const instanceName = this.name();
    if (instanceName.length) {
      this.tagifyService.remove(instanceName);
    }
  }
}
