"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Game" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b border-slate-700 bg-slate-800 px-6 py-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/Wordle.png" width={32} alt="" />
          <span className="text-lg font-bold tracking-widest text-slate-100">WORDLE</span>
        </Link>

        <ul className="flex gap-6">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    active
                      ? "font-semibold text-emerald-400"
                      : "text-slate-300 hover:text-white"
                  }
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}