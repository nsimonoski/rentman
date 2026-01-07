import { debounceTime, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { withLoading, withSnackbar } from '@rentman/shared-utils';
import { TreeComponentUtils, TreeNode } from '@rentman/shared-ui';
import { FoldersService } from '../data-access/services';
import { Folder } from '../data-access/models';

export const DemoTreeStore = signalStore(
  withState<{ folders: Folder[] }>({ folders: [] }),
  withLoading(),
  withProps(() => ({ foldersService: inject(FoldersService) })),
  withSnackbar(),
  withMethods((state) => {
    return {
      getFolders: rxMethod<void>(
        pipe(
          tap(() => state.setLoading()),
          debounceTime(1000),
          switchMap(() => state.foldersService.getAll()),
          tap((folders) => {
            patchState(state, { folders });
            state.setLoading(false);
          })
        )
      ),
    };
  }),
  withComputed((state) => {
    const mapFolderToTreeNodes = (
      folders: Folder[],
      parentId: number | null = null
    ): TreeNode[] => {
      return folders
        .filter((f) => f.parentId === parentId)
        .map((f) => ({
          text: f.title,
          value: f.id,
          children: [
            ...(f.items || []).map((i) => ({
              text: i.title,
              value: i.id,
            })),
            ...(mapFolderToTreeNodes(folders, f.id) || []),
          ],
        }));
    };
    return {
      foldersTree: computed<TreeNode[]>(() => {
        const sortedNodes = TreeComponentUtils.sortAlphabetically(
          mapFolderToTreeNodes(state.folders())
        );
        return TreeComponentUtils.expandAllNodes(sortedNodes);
      }),
    };
  }),
  withHooks({
    onInit(state) {
      state.getFolders();
    },
  })
);
