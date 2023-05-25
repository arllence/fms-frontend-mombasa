import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeListingComponent } from './document-type-listing.component';

describe('DocumentTypeListingComponent', () => {
  let component: DocumentTypeListingComponent;
  let fixture: ComponentFixture<DocumentTypeListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
