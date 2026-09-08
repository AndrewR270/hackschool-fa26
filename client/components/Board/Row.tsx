import Tile from "./Tile";
import type { RowData } from "@/types/wordle";

interface RowProps {
  tiles: RowData;
}

export default function Row({ tiles }: RowProps) {
  return (
    <div className="flex gap-2 justify-center">
      {tiles.map((tile, i) => (
        <Tile key={i} tile={tile} />
      ))}
    </div>
  );
}
