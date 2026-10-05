const User = require("../models/userModel");

const names = [
  "Ada", "Linus", "Grace", "Alan", "Margaret", "Dennis", "Barbara", "Ken",
  "Radia", "Tim", "Hedy", "Guido", "Katherine", "Bjarne", "Sophie", "Donald",
  "Frances", "Brian", "Anita", "Vint", "Shafi", "Edsger", "Lynn", "Niklaus",
  "Jean", "Leslie", "Yukihiro", "Carol", "James", "Joan",
];

const bios = [
  "Three guesses or bust.",
  "Starts every game with SLATE.",
  "Streak or nothing.",
  "Vowels first, ask questions later.",
  "",
  "Here for the daily puzzle.",
];

// Possible answers, and filler guesses used to pad out each game
const WORDS = [
  "CRANE", "PLUMB", "GHOST", "BRICK", "FLUSH", "WALTZ", "STONE", "PRIZE", "JAZZY", "MANGO",
  "QUEEN", "SHARK", "LEMON", "TIGER", "OLIVE", "PIANO", "BEACH", "FROST", "CLOUD", "SPICE",
];
const FILLERS = [
  "SLATE", "CRONY", "MOIST", "MAGIC", "PIXEL", "FJORD",
  "MUDDY", "PUPPY", "AUDIO", "RAISE", "TRAIN", "BLIMP",
];

const DAY = 24 * 60 * 60 * 1000;

const randInt = (max) => Math.floor(Math.random() * max);

// Builds `count` fake games, one per day going back from today.
// A win ends with the answer; a loss uses all 6 guesses without it.
// This matches how GameHistory decides whether a game was won.
function buildPastGames(count) {
  const games = [];

  for (let i = 0; i < count; i++) {
    const word = WORDS[randInt(WORDS.length)];
    const won = Math.random() < 0.75; // roughly 3 in 4 games are wins

    // Wins take 2-6 guesses (the last one is the answer), losses take 6
    const totalGuesses = won ? 2 + randInt(5) : 6;
    const wrongGuessCount = won ? totalGuesses - 1 : totalGuesses;

    // Shuffle the fillers and take as many wrong guesses as we need
    const wrongGuesses = FILLERS.filter((w) => w !== word)
      .sort(() => Math.random() - 0.5)
      .slice(0, wrongGuessCount);

    games.push({
      word,
      guessed_words: won ? [...wrongGuesses, word] : wrongGuesses,
      date: new Date(Date.now() - (i + 1) * DAY),
    });
  }

  return games;
}

function buildSeedUsers() {
  const others = names.map((name, i) => ({
    email: `${name.toLowerCase()}@example.com`,
    username: name,
    password: "mock-password-123",
    bio: bios[i % bios.length],
    streak: Math.floor(Math.random() * 30),
    created_at: new Date(Date.now() - (i + 1) * DAY),
    past_games: buildPastGames(3 + randInt(10)), // 3 to 12 games each
  }));

  // Nick keeps a hand-written history so there's always predictable data to look at
  const nick = {
    email: "nick@example.com",
    username: "Nick",
    password: "mock-password-123",
    bio: "Wordle connoisseur >:D",
    streak: 4,
    past_games: [
      { word: "CRANE", guessed_words: ["SLATE", "TRAIN", "CRANE"], date: new Date("2026-10-03") },
      { word: "PLUMB", guessed_words: ["SLATE", "CRANE", "MOIST", "BLIMP", "CLUMP", "SHAKE"], date: new Date("2026-10-02") },
      { word: "GHOST", guessed_words: ["SLATE", "ROAST", "GHOST"], date: new Date("2026-10-01") },
      { word: "BRICK", guessed_words: ["SLATE", "CRONY", "TRICK", "BRICK"], date: new Date("2026-09-30") },
      { word: "FLUSH", guessed_words: ["SLATE", "CRONY", "PLUMB", "BLUSH", "FLUSH"], date: new Date("2026-09-29") },
      { word: "WALTZ", guessed_words: ["SLATE", "CRONY", "MAGIC", "PIXEL", "FJORD", "VAULT"], date: new Date("2026-09-28") },
      { word: "STONE", guessed_words: ["CRANE", "STONE"], date: new Date("2026-09-27") },
      { word: "PRIZE", guessed_words: ["SLATE", "CRONY", "PRIDE", "PRIZE"], date: new Date("2026-09-26") },
      { word: "JAZZY", guessed_words: ["SLATE", "CRONY", "MUDDY", "PUPPY", "FUZZY", "JAZZY"], date: new Date("2026-09-25") },
      { word: "MANGO", guessed_words: ["SLATE", "CRONY", "MAGIC", "MANGA", "MANGO"], date: new Date("2026-09-24") },
      { word: "QUEEN", guessed_words: ["SLATE", "CRONY", "MUDDY", "QUEST", "QUELL", "QUEER"], date: new Date("2026-09-23") },
    ],
  };

  return [nick, ...others];
}

// Inserts mock users only when the collection is empty, so it's safe to run on every start
async function seedUsers() {
  if (await User.exists({})) {
    console.log("Users collection already has data, skipping seed.");
    return;
  }
  const created = await User.insertMany(buildSeedUsers());
  console.log(`Seeded ${created.length} users.`);
}

module.exports = { seedUsers };