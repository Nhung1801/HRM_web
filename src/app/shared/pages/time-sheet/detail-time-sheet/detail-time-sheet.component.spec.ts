import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTimeSheetComponent } from './detail-time-sheet.component';

describe('DetailTimeSheetComponent', () => {
  let component: DetailTimeSheetComponent;
  let fixture: ComponentFixture<DetailTimeSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTimeSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailTimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
