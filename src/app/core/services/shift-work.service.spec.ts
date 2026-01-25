/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ShiftWorkService } from './shift-work.service';

describe('Service: ShiftWork', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftWorkService]
    });
  });

  it('should ...', inject([ShiftWorkService], (service: ShiftWorkService) => {
    expect(service).toBeTruthy();
  }));
});
