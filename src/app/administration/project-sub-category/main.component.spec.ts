import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubCategoryComponent } from './main.component';

describe('ProjectSubCategoryComponent', () => {
  let component: ProjectSubCategoryComponent;
  let fixture: ComponentFixture<ProjectSubCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSubCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
