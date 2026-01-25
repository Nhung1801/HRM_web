import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfVacationComponent } from './type-of-vacation.component';

describe('TypeOfVacationComponent', () => {
  let component: TypeOfVacationComponent;
  let fixture: ComponentFixture<TypeOfVacationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeOfVacationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeOfVacationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
