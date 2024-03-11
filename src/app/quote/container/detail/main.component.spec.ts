import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailViewQuoteComponent } from './main.component';

describe('DetailViewQuoteComponent', () => {
  let component: DetailViewQuoteComponent;
  let fixture: ComponentFixture<DetailViewQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailViewQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailViewQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
