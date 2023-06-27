import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { LayoutComponent } from './modules/root/components/layout/layout.component';
import { WelcomeComponent } from './modules/root/components/welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: WelcomeComponent,
      },
      {
        path: 'auth',
        // component: LoginComponent,
        loadChildren: () =>
          import('./modules/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./modules/user/user.module').then((m) => m.UserModule),
      },
      {
        path: 'smestaj',
        loadChildren: () =>
          import('./modules/residency/residency.module').then((m) => m.ResidencyModule),
      },
      {
        path: 'residency-crud',
        loadChildren: () =>
          import('./modules/residency-crud/residency-crud.module').then(
            (m) => m.ResidencyCrudModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
