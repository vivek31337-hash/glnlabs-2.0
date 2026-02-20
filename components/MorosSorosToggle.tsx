"use client";

import { motion } from "framer-motion";

interface MorosSorosToggleProps {
  active: "moros" | "soros";
  onChange: (tab: "moros" | "soros") => void;
}

export default function MorosSorosToggle({ active, onChange }: MorosSorosToggleProps) {
  return (
    <div className="flex items-center bg-[#f4f4f5] rounded-full p-1 relative">
      <motion.div
        className="absolute top-1 bottom-1 rounded-full bg-white shadow-sm"
        style={{ width: "calc(50% - 4px)" }}
        animate={{ x: active === "moros" ? 4 : "calc(100% + 4px)" }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      <button
        onClick={() => onChange("moros")}
        className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
          active === "moros" ? "text-[#18181b]" : "text-gray-500"
        }`}
      >
        Moros
      </button>
      <button
        onClick={() => onChange("soros")}
        className={`relative z-10 px-5 py-1.5 rounded-full text-sm font-medium transition-colors ${
          active === "soros" ? "text-[#18181b]" : "text-gray-500"
        }`}
      >
        Soros
      </button>
    </div>
  );
}
