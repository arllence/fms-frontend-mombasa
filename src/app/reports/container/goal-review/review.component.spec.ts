import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalReviewComponent } from './review.component';

describe('GoalReviewComponent', () => {
  let component: GoalReviewComponent;
  let fixture: ComponentFixture<GoalReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
