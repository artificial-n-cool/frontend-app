import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { HostTablePageComponent } from "./pages/host-table-page/host-table-page.component";

export const HostTableRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: HostTablePageComponent,
        // canActivate: [RoleGuard],
        // data: { roles: ['ADMIN', 'MANAGER'] }
    },
];