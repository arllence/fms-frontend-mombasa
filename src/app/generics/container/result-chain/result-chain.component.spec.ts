import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultChainComponent } from './result-chain.component';

describe('ResultChainComponent', () => {
  let component: ResultChainComponent;
  let fixture: ComponentFixture<ResultChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
