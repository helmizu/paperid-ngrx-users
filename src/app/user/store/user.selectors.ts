import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User, UserFeatureName, UserState } from "../services/user.types";

export const selectUserState = createFeatureSelector<UserState>(UserFeatureName);

export const selectIsUsersLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isUsersLoading
);

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
)

export const selectIsUsersLoaded = createSelector(
  selectUsers,
  (users: User[]) => users.length > 0
);

export const selectIsUsersEmpty = createSelector(
  selectIsUsersLoading,
  selectUsers,
  (isLoading: boolean, users: User[]) => !isLoading && users.length === 0
);

export const selectIsUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isUserLoading
);

export const selectUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
)
