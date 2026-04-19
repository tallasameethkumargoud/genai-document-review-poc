import { TestBed } from '@angular/core/testing';

import { GenaiExtractionService } from './genai-extraction.service';

describe('GenaiExtractionService', () => {
  let service: GenaiExtractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenaiExtractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
