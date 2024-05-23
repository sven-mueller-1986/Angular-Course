import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown.directive';
import { AlertComponent } from './alert/modal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DropdownDirective,
    AlertComponent
  ],
  imports: [
    SharedModule,
    FormsModule
  ],
  exports: [
    DropdownDirective,
    AlertComponent
  ]
})
export class CoreModule { }
