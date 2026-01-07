interface RawData {
  columns: string[];
  data: (null | number | string)[][];
}

export interface FoldersRawResponse {
  folders: RawData;
  items: RawData;
}

interface Item {
  id: number;
  title: string;
}

export interface Folder {
  id: number;
  parentId?: number | null;
  title: string;
  items?: Item[];
}
