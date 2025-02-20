import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { ApiService } from '../../core/services/api.service';
import { User } from './user.types';

describe('UserService', () => {
  let service: UserService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: ApiService, useValue: spy }
      ]
    });

    service = TestBed.inject(UserService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected users (getUsers)', (done: DoneFn) => {
    const expectedUsers: User[] = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }] as User[];

    apiServiceSpy.get.and.returnValue(of(expectedUsers));

    service.getUsers().subscribe(users => {
      expect(users).toEqual(expectedUsers);
      done();
    });

    expect(apiServiceSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should return expected user (getUser)', (done: DoneFn) => {
    const expectedUser: User = { id: 1, name: 'John' } as User;

    apiServiceSpy.get.and.returnValue(of(expectedUser));

    service.getUser(1).subscribe(user => {
      expect(user).toEqual(expectedUser);
      done();
    });

    expect(apiServiceSpy.get.calls.count()).toBe(1, 'one call');
  });
});