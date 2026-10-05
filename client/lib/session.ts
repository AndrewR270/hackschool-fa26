const KEY = "wordle-username";

export const getUsername = (): string | null =>
  typeof window === "undefined" ? null : localStorage.getItem(KEY);

export const setSession = (username: string): void => localStorage.setItem(KEY, username);

export const clearSession = (): void => localStorage.removeItem(KEY);