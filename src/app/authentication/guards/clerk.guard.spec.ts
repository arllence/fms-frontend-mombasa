import { TestBed } from '@angular/core/testing';

import { ClerkGuard } from './clerk.guard';

describe('ClerkGuard', () => {
  let guard: ClerkGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClerkGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
