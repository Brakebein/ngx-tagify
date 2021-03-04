import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { TagData, TagifyService, TagifySettings } from 'ngx-tagify';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form = new FormGroup({
    tags: new FormControl( [], Validators.minLength(3))
  });
  predefinedValue = 'Reactive, Form';

  tags: TagData[] = [{ value: 'Super' }];

  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit']
  };

  whitelist$ = new BehaviorSubject<string[]>(['Hello', 'World']);

  readonly = false;

  mixedSettings: TagifySettings = {
    mode: 'mix',
    pattern: /@|#/,
    tagTextProp: 'text',
    dropdown: {
      enabled: 1,
      position: 'text',
      mapValueTo: 'text',
      highlightFirst: true
    }
  };

  originalText = '[[{"id":200, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[{"value":"homer simpson", "readonly":true}]] because he\'s a relic.';
  mixedValue = '[[{"id":200, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[{"value":"homer simpson", "readonly":true}]] because he\'s a relic.';

  constructor(
    private tagifyService: TagifyService
  ) { }

  ngOnInit() {

    // listen to value changes of reactive form
    this.form.valueChanges.subscribe(value => {
      console.log('form value changed', value);
    });

  }

  onAdd(tagify) {
    console.log('added a tag', tagify);
  }

  onRemove(tags) {
    console.log('removed a tag', tags);
  }

  replaceTags() {
    this.tags = [
      {value: 'this'},
      {value: 'is'},
      {value: 'awesome'}
    ];
  }

  clearTags() {
    this.tagifyService.get('test').removeAllTags();
  }

  addTags() {
    this.tagifyService.get('test').addTags(['this', 'is', 'cool']);
  }

}
