/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UpdateListService } from './UpdateList.service';

describe('Service: UpdateList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateListService]
    });
  });

  it('should ...', inject([UpdateListService], (service: UpdateListService) => {
    expect(service).toBeTruthy();
  }));
});
