import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {TagifyModule} from 'ngx-tagify';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TagifyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
