import { TestBed } from '@angular/core/testing';
import { UserListFacadeService } from './user-list-facade.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserFeatureName } from '../../services/user.types';
import { HttpClientModule } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import * as UserSelectors from '../../store/user.selectors';
import { UserActions } from '../../store/user.actions';

const MOCK_USER ={
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
describe('UserListFacadeService', () => {
  let service: UserListFacadeService;
  let store: MockStore;

  const initialState = {
    [UserFeatureName]: {
      users: [],
      isUsersEmpty: true,
      isUsersLoaded: false,
      isUsersLoading: false
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), HttpClientModule],
      providers: [
        UserListFacadeService,
        provideMockStore({ initialState }),
      ]
    });
    service = TestBed.inject(UserListFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadUsers action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    service.loadUsers();
    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.getUsers());
  });

  it('should select isUsersEmpty$', (done) => {
    store.overrideSelector(UserSelectors.selectIsUsersEmpty, true);
    service.isUsersEmpty$.subscribe(value => {
      expect(value).toBe(true);
      done();
    });
  });

  it('should select isUsersLoaded$', (done) => {
    store.overrideSelector(UserSelectors.selectIsUsersLoaded, false);
    service.isUsersLoaded$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should select isUsersLoading$', (done) => {
    store.overrideSelector(UserSelectors.selectIsUsersLoading, false);
    service.isUsersLoading$.subscribe(value => {
      expect(value).toBe(false);
      done();
    });
  });

  it('should select users$', (done) => {
    const users = [MOCK_USER];
    store.overrideSelector(UserSelectors.selectUsers, users);
    service.users$.subscribe(value => {
      expect(value).toEqual(users);
      done();
    });
  });
});
