import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterEvent, RouteConfigLoadEnd, RouteConfigLoadStart } from '@angular/router';
import { of, Subject } from 'rxjs';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';
import { TemplateRef } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let loadingService: jasmine.SpyObj<LoadingService>;
  let router: jasmine.SpyObj<Router>;
  let routerEventsSubject: Subject<any>;

  beforeEach(async () => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingService', ['loadingOn', 'loadingOff'], { loading$: of(false) });
    routerEventsSubject = new Subject<any>();
    const routerSpy = jasmine.createSpyObj('Router', ['events'], { events: routerEventsSubject.asObservable() });

    await TestBed.configureTestingModule({
      imports: [CommonModule, MatProgressSpinnerModule, LoadingComponent],
      providers: [
        { provide: LoadingService, useValue: loadingServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    loadingService = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should initialize loading$ observable', () => {
    expect(component.loading$).toBe(loadingService.loading$);
  });

});