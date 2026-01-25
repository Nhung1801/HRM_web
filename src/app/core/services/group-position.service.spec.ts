/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GroupPositionService } from './group-position.service';

describe('Service: GroupPosition', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupPositionService]
    });
  });

  it('should ...', inject([GroupPositionService], (service: GroupPositionService) => {
    expect(service).toBeTruthy();
  }));
});
