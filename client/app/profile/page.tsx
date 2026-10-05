import UserDetails from "@/components/Profile/UserDetails";
import OtherProfiles from "@/components/Profile/OtherProfiles";
import GameHistory from "@/components/Profile/GameHistory";
import type { UserProfile, PublicProfile } from "@/lib/types";

// Placeholder data shaped like your Mongoose models. Replace with a real fetch later.
const mockUser: UserProfile = {
  _id: "1",
  username: "Nick",
  email: "nick@example.com",
  bio: "Wordle enjoyer.",
  streak: 4,
  created_at: "2026-01-15T00:00:00.000Z",
  past_games: [
    { _id: "g1", word: "CRANE", guessed_words: ["SLATE", "TRAIN", "CRANE"], date: "2026-10-03T00:00:00.000Z" },
    { _id: "g2", word: "PLUMB", guessed_words: ["SLATE", "CRANE", "MOIST", "BLIMP", "CLUMP", "SHAKE"], date: "2026-10-02T00:00:00.000Z" },
    { _id: "g3", word: "GHOST", guessed_words: ["SLATE", "ROAST", "GHOST"], date: "2026-10-01T00:00:00.000Z" },
    { _id: "g4", word: "BRICK", guessed_words: ["SLATE", "CRONY", "TRICK", "BRICK"], date: "2026-09-30T00:00:00.000Z" },
    { _id: "g5", word: "FLUSH", guessed_words: ["SLATE", "CRONY", "PLUMB", "BLUSH", "FLUSH"], date: "2026-09-29T00:00:00.000Z" },
    { _id: "g6", word: "WALTZ", guessed_words: ["SLATE", "CRONY", "MAGIC", "PIXEL", "FJORD", "VAULT"], date: "2026-09-28T00:00:00.000Z" },
    { _id: "g7", word: "STONE", guessed_words: ["CRANE", "STONE"], date: "2026-09-27T00:00:00.000Z" },
    { _id: "g8", word: "PRIZE", guessed_words: ["SLATE", "CRONY", "PRIDE", "PRIZE"], date: "2026-09-26T00:00:00.000Z" },
    { _id: "g9", word: "JAZZY", guessed_words: ["SLATE", "CRONY", "MUDDY", "PUPPY", "FUZZY", "JAZZY"], date: "2026-09-25T00:00:00.000Z" },
    { _id: "g10", word: "MANGO", guessed_words: ["SLATE", "CRONY", "MAGIC", "MANGA", "MANGO"], date: "2026-09-24T00:00:00.000Z" },
    { _id: "g11", word: "QUEEN", guessed_words: ["SLATE", "CRONY", "MUDDY", "QUEST", "QUELL", "QUEER"], date: "2026-09-23T00:00:00.000Z" },
  ],
};

export default function ProfilePage() {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-slate-900 text-slate-100 px-6 py-10 flex flex-col">
      <div className="mx-auto w-full max-w-6xl flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-6">
        {/* Left column: user details on top, other players fill the rest */}
        <div className="lg:col-span-1 flex flex-col gap-6 min-h-0">
          <UserDetails user={mockUser} />
          <OtherProfiles excludeUsername={mockUser.username} />
        </div>

        {/* Right column: game history fills the full height */}
        <div className="lg:col-span-2 min-h-0">
          <GameHistory games={mockUser.past_games} />
        </div>
      </div>
    </div>
  );
}