import Letter from "../components/Letter";

export default function HomePage() {
  const word = "REACT";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-5 gap-2">
        {word.split("").map((char, index) => (
          <Letter key={index} value={char} />
        ))}
      </div>
    </div>
  );
}


