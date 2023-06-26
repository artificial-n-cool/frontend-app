import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { CreateUpdateUserDialogComponent } from "./pages/create-update-user-dialog/create-update-user-dialog.component";


export const UserRoutes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: CreateUpdateUserDialogComponent,
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_GUEST', 'ROLE_HOST'] }
    },
];
