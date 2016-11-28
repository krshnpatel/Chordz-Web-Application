/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChordsService } from './chords.service';

describe('ChordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChordsService]
    });
  });

  it('should ...', inject([ChordsService], (service: ChordsService) => {
    expect(service).toBeTruthy();
  }));
});
