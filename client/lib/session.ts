const KEY = "wordle-username";

//since we're currently not worried about authentication, we can just use localStorage to store the username of the current session 
export const getUsername = (): string | null =>
  typeof window === "undefined" ? null : localStorage.getItem(KEY);

export const setSession = (username: string): void => localStorage.setItem(KEY, username);

export const clearSession = (): void => localStorage.removeItem(KEY);