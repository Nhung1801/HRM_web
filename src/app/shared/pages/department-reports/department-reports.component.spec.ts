import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentReportsComponent } from './department-reports.component';

describe('DepartmentReportsComponent', () => {
  let component: DepartmentReportsComponent;
  let fixture: ComponentFixture<DepartmentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
