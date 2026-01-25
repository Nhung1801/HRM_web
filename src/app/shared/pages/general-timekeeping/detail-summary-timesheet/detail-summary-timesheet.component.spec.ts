import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSummaryTimesheetComponent } from './detail-summary-timesheet.component';

describe('DetailSummaryTimesheetComponent', () => {
  let component: DetailSummaryTimesheetComponent;
  let fixture: ComponentFixture<DetailSummaryTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSummaryTimesheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailSummaryTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
