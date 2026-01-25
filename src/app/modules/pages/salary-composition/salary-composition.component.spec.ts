import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryCompositionComponent } from './salary-composition.component';

describe('SalaryCompositionComponent', () => {
  let component: SalaryCompositionComponent;
  let fixture: ComponentFixture<SalaryCompositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalaryCompositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalaryCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
