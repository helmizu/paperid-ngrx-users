import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    {
        path: 'user',
        loadChildren: () => import('./user/user.routes').then(m => m.UserRoutes)
    },
];
