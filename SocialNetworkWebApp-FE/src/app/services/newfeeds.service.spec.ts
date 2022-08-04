import { TestBed } from '@angular/core/testing';

import { NewfeedsService } from './newfeeds.service';

describe('NewfeedsService', () => {
  let service: NewfeedsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewfeedsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
