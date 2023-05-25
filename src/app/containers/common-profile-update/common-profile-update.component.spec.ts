import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonProfileUpdateComponent } from './common-profile-update.component';

describe('CommonProfileUpdateComponent', () => {
  let component: CommonProfileUpdateComponent;
  let fixture: ComponentFixture<CommonProfileUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonProfileUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonProfileUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
