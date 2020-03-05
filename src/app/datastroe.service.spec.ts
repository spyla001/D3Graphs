import { TestBed } from '@angular/core/testing';

import { DatastroeService } from './datastroe.service';

describe('DatastroeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastroeService = TestBed.get(DatastroeService);
    expect(service).toBeTruthy();
  });
});
