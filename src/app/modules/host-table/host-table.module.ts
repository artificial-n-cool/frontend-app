import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostTablePageComponent } from './pages/host-table-page/host-table-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SuchEmptyComponent } from '../shared/components/such-empty/such-empty.component';
import { SharedModule } from '../shared/shared.module';
import { HostTableComponent } from './components/host-table/host-table.component';
import { HostTableRoutes } from './host-table.routes';
import { SearchFormComponent } from './components/search-form/search-form.component';



@NgModule({
  declarations: [
    HostTableComponent,
    HostTablePageComponent,
    SearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HostTableRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class HostTableModule { }
