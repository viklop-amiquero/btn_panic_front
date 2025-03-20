import { TestBed } from '@angular/core/testing';

import { BotonService } from './boton.service';

describe('BotonService', () => {
  let service: BotonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BotonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
