import { TestBed, async, inject } from '@angular/core/testing';

import { UpdateProfileGuard } from './update-profile.guard';

describe('UpdateProfileGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProfileGuard]
    });
  });

  it('should ...', inject([UpdateProfileGuard], (guard: UpdateProfileGuard) => {
    expect(guard).toBeTruthy();
  }));
});