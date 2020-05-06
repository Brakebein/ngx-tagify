import { TestBed } from '@angular/core/testing';

import { TagifyService } from './tagify.service';

describe('TagifyService', () => {
  let service: TagifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
