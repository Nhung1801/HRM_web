import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimkeepingUnitCreateComponent } from './timkeeping-unit-create.component';

describe('TimkeepingUnitCreateComponent', () => {
  let component: TimkeepingUnitCreateComponent;
  let fixture: ComponentFixture<TimkeepingUnitCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimkeepingUnitCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimkeepingUnitCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
