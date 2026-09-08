import Row from "./Row";
import type { RowData } from "@/lib/types";

interface BoardProps {
  rows: RowData[];
}

export default function Board({ rows }: BoardProps) {
  return (
    <div className="grid grid-rows-6 gap-2">
      {rows.map((row, i) => (
        <Row key={i} tiles={row} />
      ))}
    </div>
  );
}
