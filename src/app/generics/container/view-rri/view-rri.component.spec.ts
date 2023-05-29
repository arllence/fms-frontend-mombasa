import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRRIComponent } from './view-rri.component';

describe('ViewRRIComponent', () => {
  let component: ViewRRIComponent;
  let fixture: ComponentFixture<ViewRRIComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRRIComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRRIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
