import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { delay, of } from 'rxjs';

import { FoldersService } from '../data-access/services';
import { DemoTreeStore } from './demo-tree.store';

describe('DemoTreeStore', () => {
  const response = [
    {
      id: 1,
      title: 'Audio',
      parentId: null,
      items: [
        {
          id: 5,
          title: 'Audio item 1',
          folderId: 1,
        },
      ],
    },
  ];

  const setupStore = () => {
    const foldersService = {
      getAll: jest.fn(() => of(response)),
    };

    TestBed.configureTestingModule({
      providers: [
        DemoTreeStore,
        { provide: FoldersService, useValue: foldersService },
      ],
    });

    const store = TestBed.inject(DemoTreeStore);
    return store;
  };

  it('should call getFolders on store initialization', fakeAsync(() => {
    const store = setupStore();
    tick(1001);

    const foldersService = TestBed.inject(FoldersService);
    expect(foldersService.getAll).toHaveBeenCalledTimes(1);
    expect(store.folders()).toEqual([...response]);
  }));

  it('should mapped foldersTree correctly', fakeAsync(() => {
    const store = setupStore();
    tick(1001);

    expect(store.foldersTree()).toEqual([
      {
        text: 'Audio',
        value: 1,
        children: [{ text: 'Audio item 1', value: 5, expanded: true }],
        expanded: true,
      },
    ]);
  }));
});
