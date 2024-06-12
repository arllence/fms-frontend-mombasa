import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiresReportComponent } from './main.component';

describe('HiresReportComponent', () => {
  let component: HiresReportComponent;
  let fixture: ComponentFixture<HiresReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiresReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiresReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
