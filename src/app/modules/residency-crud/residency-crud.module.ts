import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { ResidencyFormComponent } from './pages/residency-form/residency-form/residency-form.component';
import { ResidencyCrudRoutes } from './residency-crud.routes';

@NgModule({
  declarations: [
    ResidencyFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResidencyCrudRoutes),
    MaterialModule
  ]
})
export class ResidencyCrudModule { }