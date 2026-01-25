import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiStructListComponent } from './organi-struct-list.component';

describe('OrganiStructListComponent', () => {
  let component: OrganiStructListComponent;
  let fixture: ComponentFixture<OrganiStructListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiStructListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiStructListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
