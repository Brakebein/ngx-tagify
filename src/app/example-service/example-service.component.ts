import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagifyModule, TagifyService, TagifySettings } from 'ngx-tagify';

@Component({
  selector: 'app-example-service',
  templateUrl: './example-service.component.html',
  imports: [TagifyModule],
})
export class ExampleServiceComponent {
  private readonly tagifyService = inject(TagifyService);

  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit'],
  };

  whitelist$ = new BehaviorSubject<string[]>(['Hello', 'World']);

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
