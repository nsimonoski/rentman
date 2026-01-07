import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { FoldersService } from './folders.service';

describe('FoldersService ', () => {
  const httpClientMock = {
    get: jest.fn().mockReturnValue(of({})),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FoldersService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });
    jest.clearAllMocks();
  });

  it('should call getFolders', inject(
    [FoldersService],
    (service: FoldersService) => {
      service.getAll();

      expect(httpClientMock.get).toHaveBeenCalled();
    }
  ));
});
