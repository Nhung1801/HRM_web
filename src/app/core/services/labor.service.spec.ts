/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LaborService } from './labor.service';

describe('Service: Labor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LaborService]
    });
  });

  it('should ...', inject([LaborService], (service: LaborService) => {
    expect(service).toBeTruthy();
  }));
});
