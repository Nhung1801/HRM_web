import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedAttendanceComponent } from './detailed-attendance.component';

describe('DetailedAttendanceComponent', () => {
  let component: DetailedAttendanceComponent;
  let fixture: ComponentFixture<DetailedAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedAttendanceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
