import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerViewDepartmentComponent } from './container-view-department.component';

describe('ContainerViewDepartmentComponent', () => {
  let component: ContainerViewDepartmentComponent;
  let fixture: ComponentFixture<ContainerViewDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerViewDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerViewDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
