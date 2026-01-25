import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupApproveComponent } from './popup-approve.component';

describe('PopupApproveComponent', () => {
  let component: PopupApproveComponent;
  let fixture: ComponentFixture<PopupApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupApproveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
