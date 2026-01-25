import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulationsCommonComponent } from './regulations-common.component';

describe('RegulationsCommonComponent', () => {
  let component: RegulationsCommonComponent;
  let fixture: ComponentFixture<RegulationsCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulationsCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegulationsCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
