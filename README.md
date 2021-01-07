# ngx-tagify

Proper Angular library that wraps [@yaireo/tagify](https://github.com/yairEO/tagify).
It allows multiple instances of tagify, implements ControlValueAccessor (for use with `ngModel` and reactive forms), and includes proper type declarations.

__[Demo](https://brakebein.github.io/ngx-tagify/)__

Built with Angular version 9.1.4.

## Usage

Install via npm:

    npm install ngx-tagify

Import module:

```typescript
import { TagifyModule } from 'ngx-tagify'; 

@NgModule({
  imports: [
    ...
    TagifyModule.forRoot(),
    ...
  ]
})
export class AppModule() {}
```

Include styling (see [below](#styling)).

## Component

You can use the `<tagify>` component either with `ngModel` or with reactive forms.
Either way, it takes an array of `TagData`, i.e. an `Object` that contains a unique property `value`:

```typescript
interface TagData {
  value: string;
  [key: string]: any;
}
```

### Usage with `ngModel`

Import `FormsModule` to your module.

```html
<tagify name="example1"
        [(ngModel)]="tags"
        inputClass="form-control"
        [settings]="settings"
        [whitelist]="whitelist$"
        (add)="onAdd($event)"
        (remove)="onRemove($event)"
</tagify>
```

```typescript
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TagData, TagifySettings } from 'ngx-tagify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  tags: TagData[] = [{ value: 'foo' }];
    
  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit'],
    callbacks: {
      click: (e) => { console.log(e.detail); }
    }
  };
  
  whitelist$ = new BehaviorSubject<string[]>(['hello', 'world']);
  
  onAdd(tagify) {
    console.log('added a tag', tagify);  
  }
  
  onRemove(tags) {
    console.log('removed a tag', tags);
  }
  
}
```

__Note:__ The component only recognizes reference changes, it won't deep check for changes within the array.
`this.tags.push({value: 'bar'});` won't do anything.
Instead, use `this.tags = this.tags.concat([{value: 'bar'}]);` (or similar) to update changes.

### Usage with Reactive Forms

Import `ReactiveFormsModule` to your module.

```html
<form [formGroup]="form">
  <tagify name="example2" formControlName="tags"></tagify>
</form>
```

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  form = new FormGroup({
    tags: new FormControl([{ value: 'Reactive' }])
  });
    
  ngOnInit(): void {
      
    this.form.valueChanges.subscribe(value => {
      console.log('form value changed', value);
    });
      
  }
  
}
```

### Inputs

| <!-- --> | <!-- --> |
|---|---|
|`name`|_Type:_ `string`<br>_Default value:_ `0`<br>Use different names if you want to use more than one tagify component on your page.|
|`settings`|_Type:_ `TagifySettings`<br>See [tagify/Settings](https://github.com/yairEO/tagify#settings).|
|`inputClass`|_Type:_ `string`<br>Apply one or more CSS classes to the input field (e.g. Bootstrap's `form-control`).|
|`whitelist`|_Type:_ `Observable<string[]\|TagData[]>`<br>Execution of the observable updates the whitelist of tagify. You can listen to user's inputs and update the whitelist respectively using this observable.| 

### Outputs

| <!-- --> | <!-- --> |
|---|---|
|`add`|Fires when a tag has been added.|
|`remove`|Fires when a tag has been removed.|
|`tInput`|Listen to the `input` event of the tagify input element.|

Listen to all other events by defining respective callbacks ([tagify/Events](https://github.com/yairEO/tagify#events)).


## Service

You can also gain access to the full [tagify API](https://github.com/yairEO/tagify#methods) via a service.

```html
<tagify name="example3"</tagify>
<button (click)="addTags()">Add tags</button>
```

```typescript
import { Component } from '@angular/core';
import { TagifyService } from 'ngx-tagify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private tagifyService: TagifyService
  ) {}
  
  addTags() {
    this.tagifyService.get('example3').addTags(['this', 'is', 'cool']);
  }
  
}
```

## Styling

You have two options to include the styling of Tagify.

__Option 1:__ Modify your `angular.json` by adding the `.scss` file to the `styles` property.

```json
"options": {
  "styles": [
    "src/styles.scss",
    "node_modules/ngx-tagify/styles/tagify.scss"
  ]
}
```

__Option 2:__ If you want to override some of the styling, import it to a sass file. Have a look at [tagify/CSS Variables](https://github.com/yairEO/tagify#css-variables) and respective demo page for details.

```scss
// src/styles.scss
@import "~ngx-tagify/styles/tagify";

.tagify
  --tags-border-color: #ff0000;
```
