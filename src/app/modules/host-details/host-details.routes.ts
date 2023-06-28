import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { HostDetailsPageComponent } from "./pages/host-details-page/host-details-page.component";

export const HostDetailsRoutes: Routes = [
    // {
    //     path: "",
    //     pathMatch: "full",
    //     component: HostDetailsPageComponent,
    //     // canActivate: [RoleGuard],
    //     // data: { roles: ['ADMIN', 'MANAGER'] }
    // },
    {
        path:"view/:id",
        component: HostDetailsPageComponent
    }
];