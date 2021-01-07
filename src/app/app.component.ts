import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
// import { TagifyService, TagifySettings } from 'ngx-tagify';
import { TagData, TagifyService, TagifySettings } from '../../projects/ngx-tagify/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form = new FormGroup({
    tags: new FormControl([{ value: 'Reactive' }], Validators.minLength(3))
  });

  tags: TagData[] = [{ value: 'Super' }];

  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit']
  };

  suggestion$ = new BehaviorSubject<string[]>(['Hello', 'World']);

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
