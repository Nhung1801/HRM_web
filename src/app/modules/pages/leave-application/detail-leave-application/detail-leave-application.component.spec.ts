import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLeaveApplicationComponent } from './detail-leave-application.component';

describe('DetailLeaveApplicationComponent', () => {
  let component: DetailLeaveApplicationComponent;
  let fixture: ComponentFixture<DetailLeaveApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailLeaveApplicationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailLeaveApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
