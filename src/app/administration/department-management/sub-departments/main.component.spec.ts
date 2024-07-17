import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentComponent } from './main.component';

describe('SubDepartmentComponent', () => {
  let component: SubDepartmentComponent;
  let fixture: ComponentFixture<SubDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
