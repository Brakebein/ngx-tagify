import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { TagifyService, TagifySettings } from 'ngx-tagify';
import { TagifyService, TagifySettings } from '../../projects/ngx-tagify/src/public-api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private valuesData: {value: string}[] = [{ value: 'Super' }];

  get values(): {value: string}[] {
    return this.valuesData;
  }

  set values(v: {value: string}[]) {
    this.valuesData = v;
  }

  public settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit']
  };

  suggestion$ = new BehaviorSubject<string[]>(['Hello', 'World']);

  constructor(private tagifyService: TagifyService) { }

  onAdd(tagify) {
    console.log('added a tag', tagify);
  }

  onRemove(tags) {
    console.log('removed a tag', tags);
  }

  clearTags() {
    this.tagifyService.get('test').removeAllTags();
  }

  addTags() {
    this.tagifyService.get('test').addTags(['this', 'is', 'cool']);
  }

  replaceTags() {
    this.values = [
      {value: 'this'},
      {value: 'is'},
      {value: 'awesome'}
    ];
  }

}
