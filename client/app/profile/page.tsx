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
  ],
};

const mockOthers: PublicProfile[] = [
  { _id: "2", username: "Ada", bio: "Three guesses or bust.", streak: 12 },
  { _id: "3", username: "Linus", bio: "", streak: 2 },
];

export default function ProfileInfo() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: user details on top, other profiles below */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <UserDetails user={mockUser} />
          <OtherProfiles profiles={mockOthers} />
        </div>

        {/* Right column: game history */}
        <div className="lg:col-span-2">
          <GameHistory games={mockUser.past_games} />
        </div>
      </div>
    </div>
  );
}