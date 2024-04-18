import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReportComponent } from './main.component';

describe('QuoteReportComponent', () => {
  let component: QuoteReportComponent;
  let fixture: ComponentFixture<QuoteReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
