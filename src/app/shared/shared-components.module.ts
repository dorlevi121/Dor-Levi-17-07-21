import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureTypePipe } from './pipes/temperature-type.pipe';



@NgModule({
  declarations: [TemperatureTypePipe],
  imports: [
    CommonModule,
  ],
  exports: [
    TemperatureTypePipe
  ]
})
export class SharedModule { }
