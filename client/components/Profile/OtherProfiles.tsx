import type { PublicProfile } from "@/lib/types";

export default function OtherProfiles({ profiles }: { profiles: PublicProfile[] }) {
  return (
    <section className="rounded-lg bg-slate-800 p-6">
      <h2 className="text-2xl font-bold mb-4">Other Players</h2>

      {profiles.length === 0 ? (
        <p className="text-sm opacity-60">No other players yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {profiles.map((p) => (
            <li key={p._id} className="flex items-center gap-3 rounded bg-slate-700 p-3">
              <img src="/profile.png" width={36} alt="" className="rounded-full" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{p.username}</p>
                {p.bio && <p className="text-xs opacity-60 truncate">{p.bio}</p>}
              </div>
              <span className="text-sm opacity-80">🔥 {p.streak}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}