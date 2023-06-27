import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResidencyTableComponent } from './components/residency-table/residency-table.component';
import { ResidencyTablePageComponent } from './pages/residency-table-page/residency-table-page.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { RouterModule } from '@angular/router';
import { ResidencyRoutes } from './residency.routes';
import { MaterialModule } from 'src/app/material.module';
import { SuchEmptyComponent } from '../shared/components/such-empty/such-empty.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ResidencyTableComponent,
    ResidencyTablePageComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResidencyRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class ResidencyModule { }
