import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveLeaveApplicationComponent } from './approve-leave-application.component';

describe('ApproveLeaveApplicationComponent', () => {
  let component: ApproveLeaveApplicationComponent;
  let fixture: ComponentFixture<ApproveLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveLeaveApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
