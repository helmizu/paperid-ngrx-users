import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial loading state as false', (done) => {
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should set loading state to true when loadingOn is called', (done) => {
    service.loadingOn();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeTrue();
      done();
    });
  });

  it('should set loading state to false when loadingOff is called', (done) => {
    service.loadingOn(); // First set it to true
    service.loadingOff();
    service.loading$.subscribe((loading) => {
      expect(loading).toBeFalse();
      done();
    });
  });
});