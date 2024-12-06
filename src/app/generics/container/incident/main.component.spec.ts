import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentRequestComponent } from './main.component';

describe('IncidentRequestComponent', () => {
  let component: IncidentRequestComponent;
  let fixture: ComponentFixture<IncidentRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
