import { EffectsModule } from "@ngrx/effects";
import { importProvidersFrom } from "@angular/core";
import { Route } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { UserListComponent } from "./pages/list/user-list.component";
import { UserEffects } from "./store/user.effects";
import { UserReducer } from "./store/user.reducer";
import { UserFeatureName } from "./services/user.types";
import { UserDetailComponent } from "./pages/detail/user-detail.component";

export const UserRoutes: Route[] = [
    {
        path: '',
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(UserFeatureName, UserReducer),
                EffectsModule.forFeature([UserEffects]),
            )
        ],
        component: UserListComponent
    },
    {
        path: ':id',
        providers: [
            importProvidersFrom(
                StoreModule.forFeature(UserFeatureName, UserReducer),
                EffectsModule.forFeature([UserEffects]),
            )
        ],
        component: UserDetailComponent
    }
];
