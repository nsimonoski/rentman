import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Folder, FoldersRawResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class FoldersService {
  private baseUrl = `/assets/external-api/folders`;
  private http = inject(HttpClient);

  getAll(): Observable<Folder[]> {
    return this.http
      .get<FoldersRawResponse>(`${this.baseUrl}/all.json`)
      .pipe(map((response: FoldersRawResponse) => this.mapRawData(response)));
  }

  private mapRawData(response: FoldersRawResponse): Folder[] {
    const { folders: foldersRaw, items: itemsRaw } = response;

    const folders = foldersRaw.data.map((row) => ({
      id: row[0] ? Number(row[0]) : null,
      title: row[1] && row[1].toString(),
      parentId: row[2] ? Number(row[2]) : null,
    }));

    const items = itemsRaw.data.map((row) => ({
      id: row[0] ? Number(row[0]) : null,
      title: row[1] && row[1].toString(),
      folderId: row[2] ? Number(row[2]) : null,
    }));

    return folders.map((f) => ({
      ...f,
      items: items.filter((i) => i.folderId === f.id),
    })) as Folder[];
  }
}
