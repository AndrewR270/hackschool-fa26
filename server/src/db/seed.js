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

const DAY = 24 * 60 * 60 * 1000;

function buildSeedUsers() {
  const others = names.map((name, i) => ({
    email: `${name.toLowerCase()}@example.com`,
    username: name,
    password: "mock-password-123",
    bio: bios[i % bios.length],
    streak: Math.floor(Math.random() * 30),
    created_at: new Date(Date.now() - (i + 1) * DAY),
  }));

  const nick = {
    email: "nick@example.com",
    username: "Nick",
    password: "mock-password-123",
    bio: "Wordle enjoyer.",
    streak: 4,
    past_games: [
      { word: "CRANE", guessed_words: ["SLATE", "TRAIN", "CRANE"], date: new Date("2026-10-03") },
      { word: "PLUMB", guessed_words: ["SLATE", "CRANE", "MOIST", "BLIMP", "CLUMP", "SHAKE"], date: new Date("2026-10-02") },
      { word: "GHOST", guessed_words: ["SLATE", "ROAST", "GHOST"], date: new Date("2026-10-01") },
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