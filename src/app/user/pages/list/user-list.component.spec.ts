import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserFeatureName } from '../../services/user.types';
import { UserReducer } from '../../store/user.reducer';
import { UserEffects } from '../../store/user.effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UserListFacadeService } from './user-list-facade.service';
import { of } from 'rxjs';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userListFacadeService: jasmine.SpyObj<UserListFacadeService>;

  beforeEach(async () => {
    const userListFacadeSpy = jasmine.createSpyObj('UserListFacadeService', ['loadUsers'], {
      isUsersEmpty$: of(false),
      isUsersLoaded$: of(true),
      isUsersLoading$: of(false),
      users$: of([])
    });

    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        RouterTestingModule,
        UserListComponent
      ],
      providers: [
        { provide: UserListFacadeService, useValue: userListFacadeSpy },
        importProvidersFrom(
          StoreModule.forFeature(UserFeatureName, UserReducer),
          EffectsModule.forFeature([UserEffects]),
        ),
        provideAnimationsAsync(),
        provideAnimations(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userListFacadeService = TestBed.inject(UserListFacadeService) as jasmine.SpyObj<UserListFacadeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUsers on init', () => {
    expect(userListFacadeService.loadUsers).toHaveBeenCalled();
  });

  it('should remove search query', () => {
    spyOn(component['router'], 'navigate');
    component.removeSearchQuery();
    expect(component['router'].navigate).toHaveBeenCalledWith([]);
    expect(component.dataSource.filter).toBe('');
    expect(component.value).toBe('');
  });

  it('should set search query when value is present', () => {
    spyOn(component['router'], 'navigate');
    component.value = 'test';
    component.setSearchQuery();
    expect(component['router'].navigate).toHaveBeenCalledWith([], { queryParams: { search: 'test' } });
    expect(component.dataSource.filter).toBe('test');
  });

  it('should remove search query when value is empty', () => {
    spyOn(component, 'removeSearchQuery');
    component.value = '';
    component.setSearchQuery();
    expect(component.removeSearchQuery).toHaveBeenCalled();
  });
});
