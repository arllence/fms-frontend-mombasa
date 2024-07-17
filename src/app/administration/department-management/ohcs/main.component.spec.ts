import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OHCsComponent } from './main.component';

describe('OHCsComponent', () => {
  let component: OHCsComponent;
  let fixture: ComponentFixture<OHCsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OHCsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OHCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
