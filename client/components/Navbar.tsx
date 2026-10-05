"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getUsername } from "@/lib/session";

const links = [
  { href: "/", label: "Game" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  // On every page change: read who is signed in, and kick out anyone who isn't
  useEffect(() => {
    const stored = getUsername();
    setUsername(stored);
    if (!stored && pathname !== "/login") router.replace("/login");
  }, [pathname, router]);

  const handleSignOut = () => {
    clearSession();
    router.push("/login");
  };

  // No navbar on the login screen
  if (pathname === "/login") return null;

  return (
    <nav className="w-full border-b border-slate-700 bg-slate-800 px-6 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/Wordle.png" width={32} alt="" />
          <span className="text-lg font-bold tracking-widest text-slate-100">WORDLE</span>
        </Link>

        <ul className="flex items-center gap-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={
                  pathname === href
                    ? "font-semibold text-emerald-400"
                    : "text-slate-300 hover:text-white"
                }
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-3">
            {username && <span className="text-sm opacity-60">{username}</span>}
            <button
              onClick={handleSignOut}
              className="rounded bg-slate-700 px-3 py-1 text-sm text-slate-100 hover:bg-slate-600"
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}