import { TestBed } from '@angular/core/testing';

import { ValidatorGuard } from './validator.guard';

describe('ValidatorGuard', () => {
  let guard: ValidatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
