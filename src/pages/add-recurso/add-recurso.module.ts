import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRecursoPage } from './add-recurso';

@NgModule({
  declarations: [
    AddRecursoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddRecursoPage),
  ],
  exports: [
    AddRecursoPage
  ]
})
export class AddRecursoPageModule {}
