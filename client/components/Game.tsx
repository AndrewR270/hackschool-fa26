import { useState, useEffect } from "react";
import Board from "@components/Board/Board.tsx";
import Keyboard from "@components/Keyboard/Keyboard.tsx";
import type { RowData, TileData } from "@/types/wordle";

const TEST_WORDS = ["APPLE", "GRAPE", "BRAIN", "LIGHT", "STONE"];
const ROWS = 6;
const COLS = 5;

export default function Game() {
  const [solution, setSolution] = useState<string>("");
  const [rows, setRows] = useState<RowData[]>(
    Array.from({ length: ROWS }, () =>
      Array.from({ length: COLS }, () => ({ letter: "", status: "empty" }))
    )
  );
  const [currentRow, setCurrentRow] = useState<number>(0);
  const [currentCol, setCurrentCol] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    setSolution(TEST_WORDS[Math.floor(Math.random() * TEST_WORDS.length)]);
  }, []);

  const handleKey = (key: string): void => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (currentCol !== COLS) {
        setMessage("Not enough letters");
        return;
      }
      submitRow();
      return;
    }

    if (key === "BACKSPACE") {
      if (currentCol === 0) return;
      const newRows = [...rows];
      newRows[currentRow][currentCol - 1] = { letter: "", status: "empty" };
      setRows(newRows);
      setCurrentCol(currentCol - 1);
      return;
    }

    if (!/^[A-Z]$/.test(key)) return;
    if (currentCol >= COLS) return;

    const newRows = [...rows];
    newRows[currentRow][currentCol] = { letter: key, status: "empty" };
    setRows(newRows);
    setCurrentCol(currentCol + 1);
  };

  const submitRow = (): void => {
    const guess = rows[currentRow].map(t => t.letter).join("");
    const solutionChars = solution.split("");

    const newRow: RowData = rows[currentRow].map((tile, i) => {
      if (tile.letter === solutionChars[i]) return { ...tile, status: "correct" };
      if (solutionChars.includes(tile.letter)) return { ...tile, status: "present" };
      return { ...tile, status: "absent" };
    });

    const newRows = [...rows];
    newRows[currentRow] = newRow;
    setRows(newRows);

    if (guess === solution) {
      setGameOver(true);
      setMessage("You guessed it!");
      return;
    }

    if (currentRow === ROWS - 1) {
      setGameOver(true);
      setMessage(`Game over. Word was ${solution}`);
      return;
    }

    setCurrentRow(currentRow + 1);
    setCurrentCol(0);
  };

  const handleSave = (): void => {
    console.log("SAVE (stub)", { rows, currentRow, solution });
    setMessage("Save game (stub)");
  };

  const handleLoad = (): void => {
    console.log("LOAD (stub)");
    setMessage("Load game (stub)");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold tracking-widest">WORDLE</h1>

      <div className="flex gap-4">
        <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 rounded">
          Save Game
        </button>
        <button onClick={handleLoad} className="px-4 py-2 bg-indigo-600 rounded">
          Load Game
        </button>
      </div>

      {message && <div className="text-amber-300">{message}</div>}

      <Board rows={rows} />

      <Keyboard onKey={handleKey} />
    </div>
  );
}
