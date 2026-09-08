import type { TileData } from "@/types/wordle";

interface TileProps {
  tile: TileData;
}

export default function Tile({ tile }: TileProps) {
  let bg = "bg-slate-800 border border-slate-600";
  if (tile.status === "correct") bg = "bg-emerald-600 border-emerald-700";
  if (tile.status === "present") bg = "bg-amber-500 border-amber-600";
  if (tile.status === "absent") bg = "bg-slate-700 border-slate-700";

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center text-2xl font-bold uppercase rounded ${bg}`}
    >
      {tile.letter}
    </div>
  );
}
