import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagifyService, TagifySettings } from 'ngx-tagify';

@Component({
  selector: 'app-example-service',
  templateUrl: './example-service.component.html',
  styleUrls: ['./example-service.component.css']
})
export class ExampleServiceComponent implements OnInit {

  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit']
  };

  whitelist$ = new BehaviorSubject<string[]>(['Hello', 'World']);

  constructor(
    private readonly tagifyService: TagifyService
  ) { }

  ngOnInit(): void {
  }

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

}
