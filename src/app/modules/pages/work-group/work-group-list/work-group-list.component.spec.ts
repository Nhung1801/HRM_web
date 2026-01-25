import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkGroupListComponent } from './work-group-list.component';

describe('WorkGroupListComponent', () => {
  let component: WorkGroupListComponent;
  let fixture: ComponentFixture<WorkGroupListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkGroupListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
