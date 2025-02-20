import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { User } from "../../services/user.types";
import { UserActions } from '../../store/user.actions';
import * as UserSelectors from '../../store/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserListFacadeService {
  isUsersEmpty$: Observable<boolean> = this.store.select(UserSelectors.selectIsUsersEmpty);
  isUsersLoaded$: Observable<boolean> = this.store.select(UserSelectors.selectIsUsersLoaded);
  isUsersLoading$: Observable<boolean> = this.store.select(UserSelectors.selectIsUsersLoading);
  users$: Observable<User[]> = this.store.select(UserSelectors.selectUsers);

  constructor(private store: Store) {
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.getUsers());
  }
}
