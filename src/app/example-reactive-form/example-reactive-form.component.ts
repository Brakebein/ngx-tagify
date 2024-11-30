import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagData } from '@yaireo/tagify';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
})
export class ExampleReactiveFormComponent implements OnInit {
  form = new FormGroup({
    tags: new FormControl<TagData[]>([], Validators.minLength(3)),
  });
  predefinedValue = 'Reactive, Form';

  ngOnInit(): void {
    // listen to value changes of reactive form
    this.form.valueChanges.subscribe((value) => {
      console.log('form value changed', value);
    });
  }
}
