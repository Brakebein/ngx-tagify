import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TagifyModule } from 'ngx-tagify';
import { TagData } from '@yaireo/tagify';

@Component({
  selector: 'app-example-reactive-form',
  templateUrl: './example-reactive-form.component.html',
  imports: [CommonModule, ReactiveFormsModule, TagifyModule],
  standalone: true,
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
