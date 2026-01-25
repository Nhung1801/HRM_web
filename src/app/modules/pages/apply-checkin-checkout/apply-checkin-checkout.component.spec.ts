import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCheckinCheckoutComponent } from './apply-checkin-checkout.component';

describe('ApplyCheckinCheckoutComponent', () => {
  let component: ApplyCheckinCheckoutComponent;
  let fixture: ComponentFixture<ApplyCheckinCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyCheckinCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyCheckinCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
