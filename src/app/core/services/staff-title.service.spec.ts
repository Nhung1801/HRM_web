/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StaffTitleService } from './staff-title.service';

describe('Service: StaffTitle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaffTitleService]
    });
  });

  it('should ...', inject([StaffTitleService], (service: StaffTitleService) => {
    expect(service).toBeTruthy();
  }));
});
