import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RRIGoalsComponent } from './rri-goals.component';

describe('RRIGoalsComponent', () => {
  let component: RRIGoalsComponent;
  let fixture: ComponentFixture<RRIGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RRIGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RRIGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
