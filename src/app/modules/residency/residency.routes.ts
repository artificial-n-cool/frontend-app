import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { ResidencyTablePageComponent } from "./pages/residency-table-page/residency-table-page.component";
import { ResidencyPageComponent } from "./pages/residency-page/residency-page.component";

export const ResidencyRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: ResidencyTablePageComponent,
        // canActivate: [RoleGuard],
        // data: { roles: ['ADMIN', 'MANAGER'] }
    },
    {
        path: 'residency-details/:id',
        component: ResidencyPageComponent,
    }
];