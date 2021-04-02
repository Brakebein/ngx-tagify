# ngx-tagify

Proper Angular library that wraps [@yaireo/tagify](https://github.com/yairEO/tagify).
It allows multiple instances of tagify, implements ControlValueAccessor (for use with `ngModel` and reactive forms), and includes proper type declarations.

__[Demo](https://brakebein.github.io/ngx-tagify/)__

Built with Angular version 11.0.7.

* [Install](#install)
* [Component](#component)
  * [Usage with ngModel](#usage-with-ngmodel)
  * [Usage with Reactive Forms](#usage-with-reactive-forms)
  * [Predefined values](#predefined-values)
  * [Inputs](#inputs)
  * [Outputs](#outputs)
* [Service](#service)
* [Styling](#styling)
* [FAQ](#faq)

## Install

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
export class AppModule {}
```

Include styling (see [below](#styling)).

## Component

You can use the `<tagify>` component either with `ngModel` or with reactive forms.
Either way, it takes a `string` or an array of `TagData`, i.e. an `Object` that contains a unique property `value`:

```typescript
interface TagData {
  value: string;
  [key: string]: any;
}
```

If a string is passed, it gets parsed for tags by Tagify. The returned string is the stringified tags array or, if `mode: 'mix'`, the mixed text and tags string.

### Usage with `ngModel`

Import `FormsModule` to your module.

```html
<tagify [(ngModel)]="tags"
        inputClass="form-control"
        [settings]="settings"
        [whitelist]="whitelist$"
        [readonly]="readonly"
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
  // tags = 'foo'; -> if you want to pass as string
    
  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit'],
    callbacks: {
      click: (e) => { console.log(e.detail); }
    }
  };
  
  whitelist$ = new BehaviorSubject<string[]>(['hello', 'world']);
  
  readonly = false;
  
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
  <tagify formControlName="tags"></tagify>
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

### Predefined values

Use `ngModel` or reactive forms with an initial string value that gets parsed by Tagify.

If you want to pass predefined tags as text, but receive a tags array as output, pass the value as text between `<tagify></tagify>`. Mixed text & tags are also supported.
```html
<tagify>tag 1, tag 2</tagify>
```
```html
<tagify [settings]="{ mode: 'mix' }">
  [[Eric Cartman]] and [[kyle]] do not know [[homer simpson]] because he's a relic.
</tagify>
```

Angular has problems with hard-coded single curly braces. Use property binding to add predefined tags with json syntax.

```typescript
originalText = '[[{"id":200, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[{"value":"homer simpson", "readonly":true}]] because he\'s a relic.';
```
```html
<tagify [settings]="{ mode: 'mix' }">
  {{ originalText }}
</tagify>
```

### Inputs

| <!-- --> | <!-- --> |
|---|---|
|`settings`|_Type:_ `TagifySettings`<br>See [tagify/Settings](https://github.com/yairEO/tagify#settings).|
|`inputClass`|_Type:_ `string`<br>Apply one or more CSS classes to the input field (e.g. Bootstrap's `form-control`).|
|`whitelist`|_Type:_ `Observable<string[]\|TagData[]>`<br>Execution of the observable updates the whitelist of tagify. You can listen to user's inputs and update the whitelist respectively using this observable.|
|`readonly`|_Type:_ `boolean`<br>Dynamically change readonly status.|
|`name`|_Type:_ `string`<br>Use the name attribute if you want to access the tagify component via the [service](#service). This name should be unique.|

### Outputs

| <!-- --> | <!-- --> |
|---|---|
|`add`|Fires when a tag has been added.|
|`remove`|Fires when a tag has been removed.|
|`tInput`|Listen to the `input` event of the tagify input element.|

Listen to all other events by defining respective callbacks ([tagify/Events](https://github.com/yairEO/tagify#events)).


## Service

You can also gain access to the full [tagify API](https://github.com/yairEO/tagify#methods) via a service.
Provide a `name`, such that the tagify instance will be available via the service.

```html
<tagify name="example"></tagify>
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
    this.tagifyService.get('example').addTags(['this', 'is', 'cool']);
  }
  
}
```

The original Tagify class is also exposed and can be used for type declarations or custom implementations.

```typescript
import { Tagify } from 'ngx-tagify';

const tagify: Tagify = new Tagify(inputElement);
```

## Styling

You have two options to include the styling of Tagify.

__Option 1:__ Modify your `angular.json` by adding the `.scss` file to the `styles` property.

```json
"options": {
  "styles": [
    "node_modules/ngx-tagify/styles/tagify.scss",
    "src/styles.scss"
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
#### Usage with Bootstrap

If you are using Bootstrap as CSS framework (as used in the demo), you might need to tweak some styles in order that Tagify looks pretty:

```scss
.tagify
  --tag-pad: 0 0.5rem;  
  line-height: 1.5;

.tagify__input:empty::before
  line-height: inherit;

.tagify.form-control
  height: unset;
```


## FAQ

### I'm getting TS compilation error!

You are getting TypeScript compilation error with an error output like this:

```
 node_modules/@types/yaireo__tagify/index.d.ts:475:1
    475 export = Tagify;
        ~~~~~~~~~~~~~~~~
    This module is declared with using 'export =', and can only be used with a default import when using the 'allowSyntheticDefaultImports' flag.
```

To resolve this issue, set `allowSyntheticDefaultImports` within `compilerOptions` in your `tsconfig.json`:

```json
{
  "compilerOptions": {

    "allowSyntheticDefaultImports": true,

  }
}
```
