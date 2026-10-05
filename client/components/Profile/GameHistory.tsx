import type { PastGame } from "@/lib/types";

export default function GameHistory({ games }: { games: PastGame[] }) {
  // Newest first, without mutating the prop
  const sorted = [...games].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <section className="rounded-lg bg-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Game History</h2>

      {sorted.length === 0 ? (
        <p className="text-sm opacity-60">No games played yet.</p>
      ) : (
        <ul className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
          {sorted.map((game) => {
            const won =
              game.guessed_words.at(-1)?.toUpperCase() === game.word.toUpperCase();

            return (
              <li key={game._id} className="rounded bg-slate-700 p-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold tracking-widest">{game.word.toUpperCase()}</span>
                  <span className={won ? "text-emerald-400" : "text-red-400"}>
                    {won ? `Won in ${game.guessed_words.length}/6` : "Lost"}
                  </span>
                </div>
                <p className="text-xs opacity-60 mt-1">
                  {new Date(game.date).toLocaleDateString()}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs font-mono opacity-80">
                  {game.guessed_words.map((g, i) => (
                    <span key={i} className="rounded bg-slate-600 px-2 py-1">
                      {g.toUpperCase()}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}