import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffregistrationComponent } from './staffregistration.component';

describe('StaffregistrationComponent', () => {
  let component: StaffregistrationComponent;
  let fixture: ComponentFixture<StaffregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
