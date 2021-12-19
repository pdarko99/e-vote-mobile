import { TestBed } from '@angular/core/testing';

import { EServicesService } from './e-services.service';

describe('EServicesService', () => {
  let service: EServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
