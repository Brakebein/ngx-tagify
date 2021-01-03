# ngx-tagify

Proper Angular library that wraps [@yaireo/tagify](https://github.com/yairEO/tagify).
It allows multiple instances of tagify and includes proper type declarations.

## Usage

Install via npm:

    npm install ngx-tagify

Import module:

```typescript
import { TagifyModule } from 'ngx-tagify';

@NgModule({
  imports: [TagifyModule.forRoot(),...]
})
export class AppModule() {}
```

Include styling (see [below](#styling)).

## Component

```html
<tagify name="test"
        [(value)]="tags"
        [settings]="settings"
        [suggestions]="suggestion$"
        (add)="onAdd($event)"
        (remove)="onRemove($event)"
</tagify>
```

```typescript
import { Component } from '@angular/core';
import { TagifySettings } from 'ngx-tagify';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
  private tagsData: {value: string}[] = [];
  
  get tags(): {value: string}[] {
    return this.tagsData;
  }
  
  set tags(v: {value: string}[]) {
    this.tagsData = v;
    // you can also react here to value changes
  }
    
  settings: TagifySettings = {
    placeholder: 'Start typing...',
    blacklist: ['fucking', 'shit'],
    callbacks: {
      click: (e) => { console.log(e.detail); }
    }
  };
  
  suggestion$ = new BehaviorSubject<string[]>(['Hello', 'World']);
  
  onAdd(tagify) {
    console.log('added a tag', tagify);  
  }
  
  onRemove(tags) {
    console.log('removed a tag', tags);
  }
  
}
```

### Inputs

| <!-- --> | <!-- --> |
|---|---|
|`value`|_Type:_ `{value: string, [key: string]: any}[]`<br>Tags array. Changes by tagify are reflected in this array.|
|`name`|_Type:_ `string`<br>_Default value:_ `0`<br>Use different names if you want to use more than one tagify component.|
|`settings`|_Type:_ `TagifySettings`<br>See [tagify/Settings](https://github.com/yairEO/tagify#settings).|
|`inputClass`|_Type:_ `string`<br>Apply one or more CSS classes to the input field (e.g. Bootstrap's `form-control`).|
|`suggestions`|_Type:_ `Observable<string[]>`<br>Execution of the observable updates the whitelist of the tagify. You can listen to user's inputs and update the whitelist respectively using this observable.| 

### Outputs

| <!-- --> | <!-- --> |
|---|---|
|`add`|Fires when a tag has been added.|
|`remove`|Fires when a tag has been removed.|
|`tInput`|Listen to the `input` event of the input element.|

Listen to all other events by defining respective callbacks ([tagify/Events](https://github.com/yairEO/tagify#events)).


## Service

You can also gain access to the full [tagify API](https://github.com/yairEO/tagify#methods) via a service.

```html
<tagify name="test"</tagify>
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
    this.tagifyService.get('test').addTags(['this', 'is', 'cool']);
  }
  
}
```

### Methods

| <!-- --> | <!-- --> |
|---|---|
|`get(name: string): Tagify`|Gain full access to tagify API.|
|`init(inputRef: HTMLInputElement, settings: TagifySettings): Tagify`|Used internally to initialize tagify when component is created.|
|`destroy(name: string): void`|Used internally when component gets destroyed.|


## Styling

You have two options to include the styling of Tagify.

__Option 1:__ Modify your `angular.json` by adding the `.scss` file to the `styles` property.

```json
"options": {
  ...
  "styles": [
    "src/styles.scss",
    "node_modules/ngx-tagify/styles/tagify.scss"
  ],
  ...
}
```

__Option 2:__ If you want to override some of the styling, import it to a sass file. Have a look at [tagify/CSS Variables](https://github.com/yairEO/tagify#css-variables) and respective demo page for details.

```scss
// src/styles.scss
@import "~ngx-tagify/styles/tagify";

.tagify
  --tags-border-color: #ff0000;
```

## Build instructions
- run `npm i` in order to install all required dependencies.
- run `npm run packagr` in order to tell ng-packager to bundle the ng-tagify-wrapper module
- from the generated /dist run `npm pack` to pack it as an npm ready package

- `ng build ngx-tagify`
