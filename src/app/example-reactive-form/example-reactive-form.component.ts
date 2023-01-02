import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  styleUrls: ['./example-reactive-form.component.css']
})
export class ExampleReactiveFormComponent implements OnInit {

  form = new UntypedFormGroup({
    tags: new UntypedFormControl([], Validators.minLength(3))
  });
  predefinedValue = 'Reactive, Form';

  ngOnInit(): void {

    // listen to value changes of reactive form
    this.form.valueChanges.subscribe(value => {
      console.log('form value changed', value);
    });

  }

}
