import KeyButton from "./KeyButton";

interface KeyboardRowProps {
  letters: string[];
  onKey: (key: string) => void;
}

export default function KeyboardRow({ letters, onKey }: KeyboardRowProps) {
  return (
    <div className="flex gap-1 justify-center">
      {letters.map(letter => (
        <KeyButton key={letter} label={letter} onClick={() => onKey(letter)} />
      ))}
    </div>
  );
}
