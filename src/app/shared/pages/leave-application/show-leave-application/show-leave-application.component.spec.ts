import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLeaveApplicationComponent } from './show-leave-application.component';

describe('ShowLeaveApplicationComponent', () => {
  let component: ShowLeaveApplicationComponent;
  let fixture: ComponentFixture<ShowLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowLeaveApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
