import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { User, UserInitialState, UserState } from "../services/user.types";

export const getUsers = (state: UserState) => {
    return {
        ...state,
        isUsersLoading: true,
        users: []
    }
}

export const getUsersError = (state: UserState) => {
    return {
        ...state,
        isUsersLoading: false,
    }
}

export const getUsersSuccess = (state: UserState, action: { payload: User[] }) => {
    const users: User[] = <User[]>JSON.parse(JSON.stringify(action.payload));
    return {
        ...state,
        isUsersLoading: false,
        users,
    }
}

export const getUser = (state: UserState, action: { userId: number }) => {
    return {
        ...state,
        isUserLoading: true,
        user: undefined,
    }
}

export const getUserError = (state: UserState) => {
    return {
        ...state,
        isUserLoading: false,
    }
}

export const getUserSuccess = (state: UserState, action: { payload: User }) => {
    const user: User = <User>JSON.parse(JSON.stringify(action.payload));
    return {
        ...state,
        isUserLoading: false,
        user,
    }
}

export const UserReducer = createReducer(
    UserInitialState,
    on(UserActions.getUsers, getUsers),
    on(UserActions.getUsersError, getUsersError),
    on(UserActions.getUsersSuccess, getUsersSuccess),
    on(UserActions.getUser, getUser),
    on(UserActions.getUserError, getUserError),
    on(UserActions.getUserSuccess, getUserSuccess),
);
