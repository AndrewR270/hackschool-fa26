"use client";

import { useEffect, useRef, useState } from "react";
import type { PublicProfile } from "@/lib/types";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
const PAGE_SIZE = 10;

export default function OtherProfiles({ excludeUsername }: { excludeUsername?: string }) {
  const [all, setAll] = useState<PublicProfile[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const listRef = useRef<HTMLUListElement>(null);
  const sentinelRef = useRef<HTMLLIElement>(null);

  // Fetch everything once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/users`);
        if (res.status === 404) {
          if (!cancelled) setAll([]); 
          return;
        }
        if (!res.ok) throw new Error(`Request failed (${res.status})`);

        const data: PublicProfile[] = await res.json();
        if (!cancelled) {
          setAll(data.filter((u) => u.username !== excludeUsername));
          setVisible(PAGE_SIZE);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [excludeUsername, attempt]);

  const shown = all.slice(0, visible);
  const hasMore = visible < all.length;

  // Reveal 10 more profiles when user scrolls to bottom 
  useEffect(() => {
    const root = listRef.current;
    const target = sentinelRef.current;
    if (!root || !target || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible((v) => v + PAGE_SIZE); },
      { root, rootMargin: "100px" }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, visible]);

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-lg bg-slate-800 p-6">
      <h2 className="mb-4 shrink-0 text-2xl font-bold">Other Players</h2>

      {loading && <p className="text-sm opacity-60">Loading...</p>}

      {error && (
        <button onClick={() => setAttempt((a) => a + 1)} className="text-sm underline">
          Failed to load. Retry
        </button>
      )}

      {!loading && !error && all.length === 0 && (
        <p className="text-sm opacity-60">No other players yet.</p>
      )}

      {shown.length > 0 && (
        <ul
          ref={listRef}
          className="scroll-dark flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain pr-2 max-h-80 lg:max-h-none"
        >
          {shown.map((p) => (
            <li key={p._id} className="flex shrink-0 items-center gap-3 rounded bg-slate-700 p-3">
              <img src="/profile.png" width={36} alt="Profile" className="rounded-full" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.username}</p>
                {p.bio && <p className="truncate text-xs opacity-60">{p.bio}</p>}
              </div>
              <span className="text-sm opacity-80">🔥 {p.streak}</span>
            </li>
          ))}

          {hasMore ? (
            <li ref={sentinelRef} className="shrink-0 py-2 text-center text-xs opacity-60">
              Loading more...
            </li>
          ) : (
            <li className="shrink-0 py-2 text-center text-xs opacity-60">
              No more profiles :]
            </li>
          )}
        </ul>
      )}
    </section>
  );
}