export type LetterStatus = "correct" | "present" | "absent" | "empty";

export interface TileData {
  letter: string;
  status: LetterStatus;
}

export type RowData = TileData[];
