import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailKpiComponent } from './detail-kpi.component';

describe('DetailKpiComponent', () => {
  let component: DetailKpiComponent;
  let fixture: ComponentFixture<DetailKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailKpiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
