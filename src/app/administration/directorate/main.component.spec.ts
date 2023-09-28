import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateComponent } from './main.component';

describe('DirectorateComponent', () => {
  let component: DirectorateComponent;
  let fixture: ComponentFixture<DirectorateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
