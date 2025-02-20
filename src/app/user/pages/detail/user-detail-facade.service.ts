import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "../../services/user.types";
import { UserActions } from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserDetailFacadeService {
  isUserLoading$: Observable<boolean> = this.store.select(UserSelectors.selectIsUserLoading);
  user$: Observable<User | undefined> = this.store.select(UserSelectors.selectUser);

  constructor(private store: Store) {
  }

  loadUser(userId: number): void {
    this.store.dispatch(UserActions.getUser({ userId }));
  }
}
