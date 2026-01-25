import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInDepartmentComponent } from './project-in-department.component';

describe('ProjectInDepartmentComponent', () => {
  let component: ProjectInDepartmentComponent;
  let fixture: ComponentFixture<ProjectInDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectInDepartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectInDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
