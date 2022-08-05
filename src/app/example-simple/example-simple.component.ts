import { Component } from '@angular/core';
import { TagData } from 'ngx-tagify';

@Component({
  selector: 'app-example-simple',
  templateUrl: './example-simple.component.html',
  styleUrls: ['./example-simple.component.css']
})
export class ExampleSimpleComponent {

  tags: TagData[] = [{ value: 'Super' }];

  readonly = false;

  replaceTags() {
    this.tags = [
      {value: 'this'},
      {value: 'is'},
      {value: 'awesome'}
    ];
  }

  onAdd(tagify) {
    console.log('added a tag', tagify);
  }

  onRemove(tags) {
    console.log('removed a tag', tags);
  }

}
