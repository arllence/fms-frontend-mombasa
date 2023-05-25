import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StafflistingComponent } from './stafflisting.component';

describe('StafflistingComponent', () => {
  let component: StafflistingComponent;
  let fixture: ComponentFixture<StafflistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StafflistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StafflistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
