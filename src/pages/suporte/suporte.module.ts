import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuportePage } from './suporte';

@NgModule({
  declarations: [
    SuportePage,
  ],
  imports: [
    IonicPageModule.forChild(SuportePage),
  ],
  exports: [
    SuportePage
  ]
})
export class SuportePageModule {}
