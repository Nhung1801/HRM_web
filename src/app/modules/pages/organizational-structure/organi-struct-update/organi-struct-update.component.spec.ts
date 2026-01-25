import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiStructUpdateComponent } from './organi-struct-update.component';

describe('OrganiStructUpdateComponent', () => {
  let component: OrganiStructUpdateComponent;
  let fixture: ComponentFixture<OrganiStructUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiStructUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiStructUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
