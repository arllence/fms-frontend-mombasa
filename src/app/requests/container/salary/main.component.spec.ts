import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSalaryRequestsComponent } from './main.component';

describe('ViewSalaryRequestsComponent', () => {
  let component: ViewSalaryRequestsComponent;
  let fixture: ComponentFixture<ViewSalaryRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSalaryRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSalaryRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
