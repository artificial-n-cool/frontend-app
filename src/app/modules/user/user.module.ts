import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user.routes';
import { MaterialModule } from 'src/app/material.module';
import { CreateUpdateUserDialogComponent } from './pages/create-update-user-dialog/create-update-user-dialog.component';
import { UpdatePasswordDialogComponent } from './pages/update-password-dialog/update-password-dialog.component';



@NgModule({
  declarations: [
    CreateUpdateUserDialogComponent,
    UpdatePasswordDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    MaterialModule,
  ]
})
export class UserModule { }
