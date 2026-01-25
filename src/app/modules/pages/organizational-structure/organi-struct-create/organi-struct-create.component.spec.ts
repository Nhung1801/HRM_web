import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiStructCreateComponent } from './organi-struct-create.component';

describe('OrganiStructCreateComponent', () => {
  let component: OrganiStructCreateComponent;
  let fixture: ComponentFixture<OrganiStructCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiStructCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiStructCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
