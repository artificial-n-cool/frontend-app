import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthRoutes } from './auth.routes';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthRoutes),
  ]
})
export class AuthModule { }
