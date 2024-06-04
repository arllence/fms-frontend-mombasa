import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocumAttendanceComponent } from './main.component';

describe('LocumAttendanceComponent', () => {
  let component: LocumAttendanceComponent;
  let fixture: ComponentFixture<LocumAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocumAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocumAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
