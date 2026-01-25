import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimkeepingUnitUpdateComponent } from './timkeeping-unit-update.component';

describe('TimkeepingUnitUpdateComponent', () => {
  let component: TimkeepingUnitUpdateComponent;
  let fixture: ComponentFixture<TimkeepingUnitUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimkeepingUnitUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimkeepingUnitUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
