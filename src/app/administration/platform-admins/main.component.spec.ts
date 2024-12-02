import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformAdminComponent } from './main.component';

describe('PlatformAdminComponent', () => {
  let component: PlatformAdminComponent;
  let fixture: ComponentFixture<PlatformAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlatformAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
