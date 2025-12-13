import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TagData, TagifyModule } from 'ngx-tagify';

@Component({
  selector: 'app-example-simple',
  templateUrl: './example-simple.component.html',
  imports: [CommonModule, FormsModule, TagifyModule],
})
export class ExampleSimpleComponent {
  tags: TagData[] = [{ value: 'Super' }];

  readonly = false;

  disabled = false;

  replaceTags() {
    this.tags = [{ value: 'this' }, { value: 'is' }, { value: 'awesome' }];
  }

  onAdd(tagify) {
    console.log('added a tag', tagify);
  }

  onRemove(tags) {
    console.log('removed a tag', tags);
  }
}
