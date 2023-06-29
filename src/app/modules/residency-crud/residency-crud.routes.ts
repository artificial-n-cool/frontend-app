import { Routes } from "@angular/router";
// import { LoginGuard } from "./guards/login/login.guard";
import { ResidencyFormComponent } from "./pages/residency-form/residency-form/residency-form.component";
import { EditResidencyComponent } from "./pages/edit-residency/edit-residency.component";

export const ResidencyCrudRoutes: Routes = [
  {
    path: "add-residency",
    pathMatch: "full",
    component: ResidencyFormComponent,
  },
  {
    path: "update-residency/:id",
    component: EditResidencyComponent
  }
];
