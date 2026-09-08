import KeyboardRow from "./KeyboardRow";
import KeyButton from "./KeyButton";
import type { LetterStatus } from "@/types/wordle";

interface KeyboardProps {
  onKey: (key: string) => void;
  letterStatuses: Record<string, LetterStatus>;
}

const ALPHABET = [
  "Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "Z","X","C","V","B","N","M"
];

export default function Keyboard({ onKey, letterStatuses }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2">
      <KeyboardRow letters={ALPHABET.slice(0, 10)} onKey={onKey} letterStatuses={letterStatuses} />
      <KeyboardRow letters={ALPHABET.slice(10, 19)} onKey={onKey} letterStatuses={letterStatuses} />

      <div className="flex gap-1 justify-center">
        <KeyButton label="ENTER" wide onClick={() => onKey("ENTER")} />
        <KeyboardRow letters={ALPHABET.slice(19)} onKey={onKey} letterStatuses={letterStatuses} />
        <KeyButton label="⌫" wide onClick={() => onKey("BACKSPACE")} />
      </div>
    </div>
  );
}