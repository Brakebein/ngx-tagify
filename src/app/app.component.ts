import { Component } from '@angular/core';
import { ExampleSimpleComponent } from './example-simple/example-simple.component';
import { ExampleMixedComponent } from './example-mixed/example-mixed.component';
import { ExampleReactiveFormComponent } from './example-reactive-form/example-reactive-form.component';
import { ExampleServiceComponent } from './example-service/example-service.component';
import { ExampleTemplatesComponent } from './example-templates/example-templates.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    ExampleSimpleComponent,
    ExampleMixedComponent,
    ExampleReactiveFormComponent,
    ExampleServiceComponent,
    ExampleTemplatesComponent,
  ],
  standalone: true,
})
export class AppComponent {}
