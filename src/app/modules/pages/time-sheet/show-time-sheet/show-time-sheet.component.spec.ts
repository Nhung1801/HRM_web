import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTimeSheetComponent } from './show-time-sheet.component';

describe('ShowTimeSheetComponent', () => {
  let component: ShowTimeSheetComponent;
  let fixture: ComponentFixture<ShowTimeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowTimeSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
