import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuoteComponent } from './main.component';

describe('ViewQuoteComponent', () => {
  let component: ViewQuoteComponent;
  let fixture: ComponentFixture<ViewQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
