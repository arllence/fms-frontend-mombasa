import { TestBed } from '@angular/core/testing';

import { BusinessAnalystGuard } from './business-analyst.guard';

describe('BusinessAnalystGuard', () => {
  let guard: BusinessAnalystGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BusinessAnalystGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
