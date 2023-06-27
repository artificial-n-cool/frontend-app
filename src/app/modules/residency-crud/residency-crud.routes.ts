import { Routes } from "@angular/router";
// import { LoginGuard } from "./guards/login/login.guard";
import { ResidencyFormComponent } from "./pages/residency-form/residency-form/residency-form.component";

export const ResidencyCrudRoutes: Routes = [
  {
    path: "add-residency",
    pathMatch: "full",
    component: ResidencyFormComponent,
  },
];
