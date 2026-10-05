import Game from "@/components/Game";

export default function Home() {
  return (
    <div className="scroll-dark flex-1 min-h-0 overflow-y-auto bg-slate-900 text-slate-100 flex items-center justify-center py-10">
      <Game />
    </div>
  );
}
