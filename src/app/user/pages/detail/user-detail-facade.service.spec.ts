import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UserDetailFacadeService } from './user-detail-facade.service';
import { UserActions } from '../../store/user.actions';
import { User } from '../../services/user.types';
import * as UserSelectors from '../../store/user.selectors';
import { HttpClientModule } from '@angular/common/http';

const MOCK_USER = {
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

describe('UserDetailFacadeService', () => {
  let service: UserDetailFacadeService;
  let store: MockStore;
  const initialState = {
    isUserLoading: false,
    user: undefined
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UserDetailFacadeService,
        provideMockStore({ initialState })
      ]
    });
    service = TestBed.inject(UserDetailFacadeService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch loadUser action', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const userId = 1;
    service.loadUser(userId);
    expect(dispatchSpy).toHaveBeenCalledWith(UserActions.getUser({ userId }));
  });

  it('should select isUserLoading$', (done) => {
    store.overrideSelector(UserSelectors.selectIsUserLoading, true);
    service.isUserLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should select user$', (done) => {
    const user: User = MOCK_USER;
    store.overrideSelector(UserSelectors.selectUser, user);
    service.user$.subscribe((selectedUser) => {
      expect(selectedUser).toEqual(user);
      done();
    });
  });
});
