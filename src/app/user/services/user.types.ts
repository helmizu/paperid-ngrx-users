export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface UserApiResponse {
  data: User[];
}

export const UserFeatureName = 'User';

export const UserInitialState: UserState = {
  isUsersLoading: false,
  users: [],

  isUserLoading: false,
  user: undefined,
};

export interface UserState {
  isUsersLoading: boolean;
  users: User[];

  isUserLoading: boolean;
  user: User | undefined;

}
