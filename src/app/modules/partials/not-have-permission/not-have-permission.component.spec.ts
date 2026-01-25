import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotHavePermissionComponent } from './not-have-permission.component';

describe('NotHavePermissionComponent', () => {
  let component: NotHavePermissionComponent;
  let fixture: ComponentFixture<NotHavePermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotHavePermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotHavePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
