import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TagifyModule } from 'ngx-tagify';
import { ExampleSimpleComponent } from './example-simple/example-simple.component';
import { ExampleServiceComponent } from './example-service/example-service.component';
import { ExampleReactiveFormComponent } from './example-reactive-form/example-reactive-form.component';
import { ExampleMixedComponent } from './example-mixed/example-mixed.component';
import { ExampleTemplatesComponent } from './example-templates/example-templates.component';

@NgModule({
  declarations: [
    AppComponent,
    ExampleSimpleComponent,
    ExampleServiceComponent,
    ExampleReactiveFormComponent,
    ExampleMixedComponent,
    ExampleTemplatesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TagifyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
