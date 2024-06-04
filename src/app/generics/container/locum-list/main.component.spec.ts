import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocumListComponent } from './main.component';

describe('LocumListComponent', () => {
  let component: LocumListComponent;
  let fixture: ComponentFixture<LocumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
