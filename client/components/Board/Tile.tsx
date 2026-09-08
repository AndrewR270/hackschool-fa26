"use client";

import type { TileData } from "@/types/wordle";
import { useEffect, useState } from "react";

interface TileProps {
  tile: TileData;
}

export default function Tile({ tile }: TileProps) {
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (tile.status !== "empty") {
      setFlipping(true);
      const timer = setTimeout(() => setFlipping(false), 600);
      return () => clearTimeout(timer);
    }
  }, [tile.status]);

  let bg = "bg-slate-800 border border-slate-600";
  if (tile.status === "correct") bg = "bg-emerald-600 border-emerald-700";
  if (tile.status === "present") bg = "bg-amber-500 border-amber-600";
  if (tile.status === "absent") bg = "bg-slate-700 border-slate-700";

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-2xl font-bold uppercase rounded transition-all duration-300 ${
        flipping ? "tile-flip" : ""
      } ${bg}`}
    >
      {tile.letter}
    </div>
  );
}
