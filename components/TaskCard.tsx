"use client";

interface TaskCardProps {
  type: "security" | "ethics";
  urgency: "critical" | "high" | "medium" | "low";
  status: "open" | "solving" | "solved";
  title: string;
  reward: number;
  solverCount: number;
  timeAgo: string;
  postedBy: string;
  walletConnected?: boolean;
}

const urgencyColors = {
  critical: "bg-[#ef4444]/20 text-[#ef4444]",
  high: "bg-[#f59e0b]/20 text-[#f59e0b]",
  medium: "bg-blue-500/20 text-blue-400",
  low: "bg-gray-500/20 text-gray-400",
};

const statusColors = {
  open: "text-[#10b981]",
  solving: "text-[#f59e0b]",
  solved: "text-gray-400",
};

export default function TaskCard({
  type,
  urgency,
  status,
  title,
  reward,
  solverCount,
  timeAgo,
  postedBy,
  walletConnected = false,
}: TaskCardProps) {
  return (
    <div className="bg-[#0d0d12] border border-[#1e1e2e] rounded-xl p-4 hover:border-[#6366f1]/40 transition-all">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded font-dm-mono ${
            type === "security"
              ? "bg-[#ef4444]/20 text-[#ef4444]"
              : "bg-[#6366f1]/20 text-[#6366f1]"
          }`}
        >
          {type.toUpperCase()}
        </span>
        <span className={`text-xs font-medium px-2 py-0.5 rounded font-dm-mono uppercase ${urgencyColors[urgency]}`}>
          {urgency}
        </span>
        <span className={`text-xs font-medium ml-auto flex items-center gap-1 ${statusColors[status]}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
          {status.toUpperCase()}
        </span>
      </div>

      <p className="text-[13px] text-white mb-3 leading-snug">{title}</p>

      <div className="flex items-end justify-between">
        <div>
          <span className="font-bebas text-3xl text-[#10b981]">${reward}</span>
          <span className="text-xs text-[#10b981] ml-1 font-dm-mono">USDC</span>
          <div className="text-xs text-gray-500 mt-0.5 font-dm-mono">
            {solverCount} solver{solverCount !== 1 ? "s" : ""} · {timeAgo} · {postedBy}
          </div>
        </div>
        <button
          className={`text-xs px-3 py-2 rounded-lg font-medium transition-all font-dm-mono ${
            status === "solved"
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : walletConnected
              ? "bg-[#6366f1] text-white hover:bg-[#4f46e5]"
              : "border border-[#6366f1] text-[#6366f1] hover:bg-[#6366f1]/10"
          }`}
        >
          {status === "solved"
            ? "SOLVED ✓"
            : walletConnected
            ? "SUBMIT SOLUTION →"
            : "CONNECT WALLET TO SOLVE →"}
        </button>
      </div>
    </div>
  );
}
