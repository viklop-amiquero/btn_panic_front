import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { publicActivateGuard } from './public-activate.guard';

describe('publicActivateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => publicActivateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
