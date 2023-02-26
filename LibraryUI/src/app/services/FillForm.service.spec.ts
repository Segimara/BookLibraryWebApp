/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FillFormService } from './FillForm.service';

describe('Service: FillForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FillFormService]
    });
  });

  it('should ...', inject([FillFormService], (service: FillFormService) => {
    expect(service).toBeTruthy();
  }));
});
