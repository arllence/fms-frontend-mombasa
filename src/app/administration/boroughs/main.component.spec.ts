import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoroughsComponent } from './main.component';

describe('BoroughsComponent', () => {
  let component: BoroughsComponent;
  let fixture: ComponentFixture<BoroughsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoroughsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoroughsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
