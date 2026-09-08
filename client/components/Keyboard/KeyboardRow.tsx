import KeyButton from "./KeyButton";
import type { LetterStatus } from "@/types/wordle";

interface KeyboardRowProps {
  letters: string[];
  onKey: (key: string) => void;
  letterStatuses: Record<string, LetterStatus>;
}

export default function KeyboardRow({ letters, onKey, letterStatuses }: KeyboardRowProps) {
  return (
    <div className="flex gap-1 justify-center">
      {letters.map(letter => (
        <KeyButton
          key={letter}
          label={letter}
          status={letterStatuses[letter] ?? "empty"}
          onClick={() => onKey(letter)}
        />
      ))}
    </div>
  );
}
