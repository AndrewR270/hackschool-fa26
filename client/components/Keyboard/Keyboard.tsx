import KeyboardRow from "./KeyboardRow";
import KeyButton from "./KeyButton";

interface KeyboardProps {
  onKey: (key: string) => void;
}

const ALPHABET = [
  "Q","W","E","R","T","Y","U","I","O","P",
  "A","S","D","F","G","H","J","K","L",
  "Z","X","C","V","B","N","M"
];

export default function Keyboard({ onKey }: KeyboardProps) {
  return (
    <div className="flex flex-col gap-2">
      <KeyboardRow letters={ALPHABET.slice(0, 10)} onKey={onKey} />
      <KeyboardRow letters={ALPHABET.slice(10, 19)} onKey={onKey} />

      <div className="flex gap-1 justify-center">
        <KeyButton label="ENTER" wide onClick={() => onKey("ENTER")} />
        <KeyboardRow letters={ALPHABET.slice(19)} onKey={onKey} />
        <KeyButton label="⌫" wide onClick={() => onKey("BACKSPACE")} />
      </div>
    </div>
  );
}
