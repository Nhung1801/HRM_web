import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelegacyDialogComponent } from './delegacy-dialog.component';

describe('DelegacyDialogComponent', () => {
  let component: DelegacyDialogComponent;
  let fixture: ComponentFixture<DelegacyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelegacyDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelegacyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
