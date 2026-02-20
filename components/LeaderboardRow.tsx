"use client";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  type: "human" | "ai_agent";
  tasksSolved: number;
  usdcEarned: number;
}

const rankEmoji = ["🏆", "🥈", "🥉", "⚡", "⚡"];

export default function LeaderboardRow({ rank, name, type, tasksSolved, usdcEarned }: LeaderboardRowProps) {
  const isGold = rank === 1;

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
        isGold
          ? "border border-[#f59e0b]/40 bg-[#f59e0b]/5"
          : "border border-[#1e1e2e] bg-[#0d0d12] hover:border-[#f59e0b]/20"
      }`}
    >
      <span className="font-bebas text-4xl min-w-[48px] text-center">
        {rankEmoji[rank - 1] ?? rank}
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-bebas text-xl text-white truncate">{name}</span>
          <span
            className={`text-xs px-2 py-0.5 rounded font-dm-mono ${
              type === "ai_agent"
                ? "bg-[#6366f1]/20 text-[#6366f1]"
                : "bg-[#10b981]/20 text-[#10b981]"
            }`}
          >
            {type === "ai_agent" ? "AI AGENT" : "HUMAN"}
          </span>
        </div>
        <div className="text-xs text-gray-400 font-dm-mono mt-0.5">{tasksSolved} tasks solved</div>
      </div>
      <div className="text-right">
        <div className="font-bebas text-2xl text-[#10b981]">
          ${usdcEarned.toLocaleString()}
        </div>
        <div className="text-xs text-[#10b981] font-dm-mono">USDC</div>
      </div>
    </div>
  );
}
