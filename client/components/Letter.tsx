"use client";

import { useState } from "react";

export default function Letter({ value }: { value: string }) {
  const [highlighted, setHighlighted] = useState(false);

  return (
    <div
      onClick={() => setHighlighted(!highlighted)}
      className={`
        w-12 h-12 border border-gray-700 
        flex items-center justify-center 
        text-xl font-bold cursor-pointer
        ${highlighted ? "bg-yellow-300 text-black" : "bg-white text-white"}
      `}
    >
      {value}
    </div>
  );
}
