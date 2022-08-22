import { Component } from '@angular/core';
import { TagifySettings } from 'ngx-tagify';

@Component({
  selector: 'app-example-mixed',
  templateUrl: './example-mixed.component.html',
  styleUrls: ['./example-mixed.component.css']
})
export class ExampleMixedComponent {

  mixedSettings: TagifySettings = {
    mode: 'mix',
    pattern: /@|#/,
    tagTextProp: 'text',
    dropdown: {
      enabled: 1,
      position: 'text',
      mapValueTo: 'text',
      highlightFirst: true
    },
    transformTag: (tagData) => {
      tagData.style = '--tag-bg:hsl(90,50%,70%)';
    },
  };

  originalText = '[[{"id":200, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[{"value":"homer simpson", "readonly":true}]] because he\'s a relic.';
  mixedValue = '[[{"id":200, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[{"value":"homer simpson", "readonly":true}]] because he\'s a relic.';

}
