"use client";

type PropTypes = {
  value: string;
}

export default function Letter({ value }: PropTypes) {
  return (
    <div>
      {value}
    </div>
  );
}



