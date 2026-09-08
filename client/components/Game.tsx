"use client";
import Toast from "./Toast";

import { useEffect, useState } from "react";
import Board from "./Board/Board";
import Keyboard from "./Keyboard/Keyboard";
import type { LetterStatus, RowData } from "@/types/wordle";
import { getWordOfTheDay } from "@/lib/wordOfTheDay";
import confetti from "canvas-confetti";


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

  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({});

  const [toast, setToast] = useState<string | null>(null);


  useEffect(() => {
    setSolution(getWordOfTheDay());
  }, []);


  /*
  useEffect(() => {
    setSolution(TEST_WORDS[Math.floor(Math.random() * TEST_WORDS.length)]);
  }, []);
  */

  const handleKey = (key: string): void => {
    if (gameOver) return;

    if (key === "ENTER") {
      if (currentCol !== COLS) {
        setToast("Not enough letters");
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
      setToast("Correct!");
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.3 }
      });
      return;
    }

    if (currentRow === ROWS - 1) {
      setGameOver(true);
      setToast(`Game over. Word was ${solution}`);
      return;
    }

    setCurrentRow(currentRow + 1);
    setCurrentCol(0);

    const updatedStatuses = { ...letterStatuses };

    newRow.forEach(tile => {
      const current = updatedStatuses[tile.letter];

      // Only upgrade statuses (correct > present > absent)
      if (tile.status === "correct") {
        updatedStatuses[tile.letter] = "correct";
      } else if (tile.status === "present" && current !== "correct") {
        updatedStatuses[tile.letter] = "present";
      } else if (!current) {
        updatedStatuses[tile.letter] = "absent";
      }
    });

    setLetterStatuses(updatedStatuses);
  };

  const handleSave = (): void => {
    console.log("SAVE (stub)", { rows, currentRow, solution });
    setToast("Save game (stub)");
  };

  const handleLoad = (): void => {
    console.log("LOAD (stub)");
    setToast("Load game (stub)");
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-row items-center">
        <img src="/Wordle.png" width={50} alt="Wordle Logo" className="mr-4" />
        <h1 className="text-4xl font-bold tracking-widest">WORDLE</h1>
      </div>

      <div className="flex gap-4">
        <button onClick={handleSave} className="px-4 py-2 bg-emerald-600 rounded">
          Save Game
        </button>
        <button onClick={handleLoad} className="px-4 py-2 bg-indigo-600 rounded">
          Load Game
        </button>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <Board rows={rows} />

      <Keyboard onKey={handleKey} letterStatuses={letterStatuses} />
    </div>
  );
}
