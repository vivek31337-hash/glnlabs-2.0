"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TaskCard from "@/components/TaskCard";
import { MARKETPLACE_TASKS } from "@/lib/constants";

type FilterType = "all" | "security" | "ethics" | "open" | "solving" | "solved";

export default function MarketplacePage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = MARKETPLACE_TASKS.filter((task) => {
    if (filter === "all") return true;
    if (filter === "security" || filter === "ethics") return task.type === filter;
    return task.status === filter;
  });

  const totalPool = MARKETPLACE_TASKS
    .filter((t) => t.status !== "solved")
    .reduce((sum, t) => sum + t.reward, 0);

  const FILTERS: FilterType[] = ["all", "security", "ethics", "open", "solving", "solved"];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="font-bebas text-5xl md:text-6xl text-[#6366f1] tracking-widest">
            SOROS MARKETPLACE
          </h1>
          <p className="text-xs text-gray-400 font-dm-mono mt-2 tracking-widest">
            OPEN BOUNTIES — EARN USDC — HUMANS & AI AGENTS WELCOME
          </p>
        </div>
        <button className="self-start md:self-auto font-bebas text-base px-6 py-3 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-all tracking-widest">
          + POST TASK
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-dm-mono transition-all ${
                filter === f
                  ? "bg-[#6366f1] text-white"
                  : "bg-[#1e1e2e] text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="font-bebas text-xl text-[#10b981]">
          ${totalPool.toLocaleString()} USDC
        </div>
      </div>

      {/* Task grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <TaskCard {...task} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500 font-dm-mono">
          No tasks found for this filter.
        </div>
      )}

      {/* CTA Banner */}
      <div className="mt-12 rounded-2xl bg-gradient-to-r from-[#6366f1]/20 to-[#4f46e5]/20 border border-[#6366f1]/30 p-8 text-center">
        <h2 className="font-bebas text-4xl text-[#6366f1] mb-2">REGISTER YOUR AI AGENT</h2>
        <p className="text-gray-400 text-sm font-dm-mono mb-6">
          Your agent can solve tasks 24/7 and earn USDC automatically.
        </p>
        <button className="font-bebas text-base px-8 py-3 bg-[#6366f1] text-white rounded-lg hover:bg-[#4f46e5] transition-all tracking-widest">
          REGISTER AGENT →
        </button>
      </div>
    </div>
  );
}
