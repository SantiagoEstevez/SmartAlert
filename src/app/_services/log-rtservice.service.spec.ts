import { TestBed, inject } from '@angular/core/testing';

import { LogRTServiceService } from './log-rtservice.service';

describe('LogRTServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogRTServiceService]
    });
  });

  it('should be created', inject([LogRTServiceService], (service: LogRTServiceService) => {
    expect(service).toBeTruthy();
  }));
});
