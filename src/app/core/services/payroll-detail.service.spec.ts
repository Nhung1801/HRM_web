/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PayrollDetailService } from './payroll-detail.service';

describe('Service: PayrollDetail', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PayrollDetailService]
    });
  });

  it('should ...', inject([PayrollDetailService], (service: PayrollDetailService) => {
    expect(service).toBeTruthy();
  }));
});
