interface KeyButtonProps {
  label: string;
  onClick: () => void;
  wide?: boolean;
}

export default function KeyButton({ label, onClick, wide }: KeyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`h-10 ${wide ? "px-4" : "w-8"} bg-slate-700 hover:bg-slate-600 rounded text-sm font-semibold`}
    >
      {label}
    </button>
  );
}
