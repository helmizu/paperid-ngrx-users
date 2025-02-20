import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserActions } from './user.actions';
import { LoadingService } from "../../shared/components/loading/loading.service";
import { UserService } from "../services/user.service";

@Injectable()
export class UserEffects {
    getUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getUsers),
            tap(() => {
                this.loadingService.loadingOn()
            }),
            switchMap(() =>
                this.userService.getUsers().pipe(
                    map((response) => UserActions.getUsersSuccess({ payload: response })),
                    catchError(() => of(UserActions.getUsersError()))
                )
            ),
            tap(() => {
                this.loadingService.loadingOff()
            })
        ));


    getUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.getUser),
            tap(() => {
                this.loadingService.loadingOn()
            }),
            switchMap((action) =>
                this.userService.getUser(action.userId).pipe(
                    map((response) => UserActions.getUserSuccess({ payload: response })),
                    catchError(() => of(UserActions.getUserError()))
                )
            ),
            tap(() => {
                this.loadingService.loadingOff()
            })
        ));

    constructor(
        private actions$: Actions,
        private loadingService: LoadingService,
        private userService: UserService,
    ) {
    }
}
