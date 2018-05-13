import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservarPage } from './reservar';

@NgModule({
  declarations: [
    ReservarPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservarPage),
  ],
  exports: [
    ReservarPage
  ]
})
export class ReservarPageModule {}
