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
import { ResidencyPageComponent } from './pages/residency-page/residency-page.component';
import { PromotionsTableComponent } from './components/promotions-table/promotions-table.component';
import { PromotionFormComponent } from './pages/promotion-form/promotion-form.component';
import { CreatePromotionPageComponent } from './pages/create-promotion-page/create-promotion-page.component';
import { UpdatePromotionPageComponent } from './pages/update-promotion-page/update-promotion-page.component';
import { InavailabilityTableComponent } from './pages/inavailability-table/inavailability-table.component';
import { ReservationTableComponent } from './pages/reservation-table/reservation-table.component';
import { NewReservationsTableComponent } from './pages/new-reservations-table/new-reservations-table.component';



@NgModule({
  declarations: [
    ResidencyTableComponent,
    ResidencyTablePageComponent,
    SearchFormComponent,
    ResidencyPageComponent,
    PromotionsTableComponent,
    PromotionFormComponent,
    CreatePromotionPageComponent,
    UpdatePromotionPageComponent,
    InavailabilityTableComponent,
    ReservationTableComponent,
    NewReservationsTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ResidencyRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class ResidencyModule { }
