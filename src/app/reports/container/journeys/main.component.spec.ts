import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JourneyReportComponent } from './main.component';

describe('JourneyReportComponent', () => {
  let component: JourneyReportComponent;
  let fixture: ComponentFixture<JourneyReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JourneyReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JourneyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
