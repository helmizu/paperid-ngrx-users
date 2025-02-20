import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserDetailComponent } from './user-detail.component';
import { UserDetailFacadeService } from './user-detail-facade.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userDetailFacadeService: jasmine.SpyObj<UserDetailFacadeService>;
  let activatedRouteStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    const userDetailFacadeSpy = jasmine.createSpyObj('UserDetailFacadeService', ['loadUser']);
    activatedRouteStub = {
      paramMap: of({
        get: (key: string) => '1',
      }) as Observable<ParamMap>
    };

    await TestBed.configureTestingModule({
      imports: [AsyncPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule],
      providers: [
        { provide: UserDetailFacadeService, useValue: userDetailFacadeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userDetailFacadeService = TestBed.inject(UserDetailFacadeService) as jasmine.SpyObj<UserDetailFacadeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadUser on init with the correct userId', () => {
    expect(userDetailFacadeService.loadUser).toHaveBeenCalledWith(1);
  });

  it('should unsubscribe from routeSub on destroy', () => {
    spyOn(component['routeSub'] as any, 'unsubscribe');
    component.ngOnDestroy();
    if (component['routeSub']) {
      expect(component['routeSub'].unsubscribe).toHaveBeenCalled();
    }
  });
});
