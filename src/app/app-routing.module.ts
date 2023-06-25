import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';

const routes: Routes = [
    {
        path: 'auth',
        // component: LoginComponent,
        loadChildren: () =>
            import("./modules/auth/auth.module").then((m) => m.AuthModule)
        
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
