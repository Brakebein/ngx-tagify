import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagifyComponent } from './tagify.component';
import { TagifyService } from './tagify.service';

@NgModule({
  declarations: [ TagifyComponent ],
  imports: [ CommonModule ],
  exports: [ TagifyComponent ],
  providers: [ TagifyService ]
})
export class TagifyModule {
  static forRoot(): ModuleWithProviders<TagifyModule> {
    return {
      ngModule: TagifyModule,
      providers: [ TagifyService ]
    };
  }
}
