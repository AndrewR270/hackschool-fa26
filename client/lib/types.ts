// Possible statuses for a letter in the game (correct, present, absent, or empty)
export type LetterStatus = "correct" | "present" | "absent" | "empty";

// Data structure representing a single tile on the game board
export interface TileData {
  letter: string;
  status: LetterStatus;
}

// A row of tiles on the game board
export type RowData = TileData[];

export type PastGame = {
  _id: string;
  word: string;
  guessed_words: string[];
  date: string; 
};

export type UserProfile = {
  _id: string;
  username: string;
  email: string;
  bio: string;
  streak: number;
  past_games: PastGame[];
  created_at: string;
};

// What other users expose publicly (no email, no game history)
export type PublicProfile = Pick<UserProfile, "_id" | "username" | "bio" | "streak">;
