import { SOLUTION_WORDS } from "./wordList";

const epoch = new Date(2021, 5, 19); // June 19, 2021

export const getWordOfTheDay = (): string => {
  const today = new Date();
  const index = Math.floor(
    (today.getTime() - epoch.getTime()) / 86400000
  );
  return SOLUTION_WORDS[index % SOLUTION_WORDS.length];
};
