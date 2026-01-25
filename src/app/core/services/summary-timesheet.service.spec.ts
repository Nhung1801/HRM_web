import { TestBed } from '@angular/core/testing';

import { SummaryTimesheetService } from '../../summary-timesheet.service';

describe('SummaryTimesheetService', () => {
  let service: SummaryTimesheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummaryTimesheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
