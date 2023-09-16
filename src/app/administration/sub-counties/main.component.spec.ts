import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCountyComponent } from './main.component';

describe('SubCountyComponent', () => {
  let component: SubCountyComponent;
  let fixture: ComponentFixture<SubCountyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubCountyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubCountyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
