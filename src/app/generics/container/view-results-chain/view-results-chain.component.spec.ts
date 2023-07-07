import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResultsChainComponent } from './view-results-chain.component';

describe('ViewResultsChainComponent', () => {
  let component: ViewResultsChainComponent;
  let fixture: ComponentFixture<ViewResultsChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewResultsChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewResultsChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
