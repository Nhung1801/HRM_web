/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrganizationsServiceService } from './organizationsService.service';

describe('Service: OrganizationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationsServiceService]
    });
  });

  it('should ...', inject([OrganizationsServiceService], (service: OrganizationsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
