/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GpsTimekeepingService } from './gps-timekeeping.service';

describe('Service: GpsTimekeeping', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GpsTimekeepingService]
    });
  });

  it('should ...', inject([GpsTimekeepingService], (service: GpsTimekeepingService) => {
    expect(service).toBeTruthy();
  }));
});
