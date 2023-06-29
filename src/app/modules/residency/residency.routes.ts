import { Routes } from "@angular/router";
import { RoleGuard } from "../auth/guards/role/role.guard";
import { ResidencyTablePageComponent } from "./pages/residency-table-page/residency-table-page.component";
import { ResidencyPageComponent } from "./pages/residency-page/residency-page.component";
import { PromotionsTableComponent } from "./components/promotions-table/promotions-table.component";
import { CreatePromotionPageComponent } from "./pages/create-promotion-page/create-promotion-page.component";
import { UpdatePromotionPageComponent } from "./pages/update-promotion-page/update-promotion-page.component";
import { InavailabilityTableComponent } from "./pages/inavailability-table/inavailability-table.component";
import { ReservationTableComponent } from "./pages/reservation-table/reservation-table.component";
import { NewReservationsTableComponent } from "./pages/new-reservations-table/new-reservations-table.component";

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
    },
    {
        path: "promotions/:id",
        component: PromotionsTableComponent,
    },
    {
        path: "promotion/create/:smestajId",
        component: CreatePromotionPageComponent
    },
    {
        path: "promotion/update/:id/for/:smestajId",
        component: UpdatePromotionPageComponent,
    },
    {
        path: "unavailabilities/:id",
        component: InavailabilityTableComponent
    },
    {
        path: "reservations",
        component: ReservationTableComponent
    },
    {
        path: "new-reservations/:id",
        component: NewReservationsTableComponent
    }
];