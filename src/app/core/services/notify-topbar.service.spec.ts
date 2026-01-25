/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotifyTopbarService } from './notify-topbar.service';

describe('Service: NotifyTopbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifyTopbarService]
    });
  });

  it('should ...', inject([NotifyTopbarService], (service: NotifyTopbarService) => {
    expect(service).toBeTruthy();
  }));
});
