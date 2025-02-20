import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User, UserFeatureName } from "../services/user.types";

export const UserActions = createActionGroup({
    source: UserFeatureName,
    events: {
        'getUsers': emptyProps(),
        'getUsersError': emptyProps(),
        'getUsersSuccess': props<{ payload: User[] }>(),

        'getUser': props<{ userId: number }>(),
        'getUserError': emptyProps(),
        'getUserSuccess': props<{ payload: User }>(),
    },
});
