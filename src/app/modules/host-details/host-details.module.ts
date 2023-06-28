import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { SuchEmptyComponent } from '../shared/components/such-empty/such-empty.component';
import { SharedModule } from '../shared/shared.module';
import { HostDetailsPageComponent } from './pages/host-details-page/host-details-page.component';
import { HostDetailsRoutes } from './host-details.routes';
import { HostOceneTableComponent } from './components/host-ocene-table/host-ocene-table.component';
import { SearchOcenaFormComponent } from './components/search-ocena-form/search-ocena-form.component';
import { HostDetailsViewComponent } from './components/host-details-view/host-details-view.component';

@NgModule({
  declarations: [
    HostOceneTableComponent,
    HostDetailsPageComponent,
    SearchOcenaFormComponent,
    HostDetailsViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HostDetailsRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class HostDetailsModule { }
