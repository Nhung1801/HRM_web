import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTimekeepComponent } from './general-timekeep.component';

describe('GeneralTimekeepComponent', () => {
  let component: GeneralTimekeepComponent;
  let fixture: ComponentFixture<GeneralTimekeepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralTimekeepComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralTimekeepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
