import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoHeightDirective } from './auto-height.directive';
import { ThResizeDirective } from './th-resize.directive';

@NgModule({
  declarations   : [ AutoHeightDirective, ThResizeDirective ],
  exports        : [ AutoHeightDirective, ThResizeDirective ],
  imports        : [
    CommonModule
  ]
})
export class ShareModule {
}
