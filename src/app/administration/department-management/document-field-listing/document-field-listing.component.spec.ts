import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentFieldListingComponent } from './document-field-listing.component';

describe('DocumentFieldListingComponent', () => {
  let component: DocumentFieldListingComponent;
  let fixture: ComponentFixture<DocumentFieldListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentFieldListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentFieldListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
