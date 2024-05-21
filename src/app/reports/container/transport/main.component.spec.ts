import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacementsReportComponent } from './main.component';

describe('ReplacementsReportComponent', () => {
  let component: ReplacementsReportComponent;
  let fixture: ComponentFixture<ReplacementsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacementsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacementsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
