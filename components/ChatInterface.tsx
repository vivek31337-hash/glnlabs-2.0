"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Mic, Send, Menu } from "lucide-react";
import MorosSorosToggle from "./MorosSorosToggle";
import ShieldIcon from "./ShieldIcon";
import TypingIndicator from "./TypingIndicator";
import { MOROS_RESPONSES, SOROS_RESPONSES } from "@/lib/constants";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  agent: "moros" | "soros";
  escalated?: boolean;
}

interface ChatInterfaceProps {
  initialTab?: "moros" | "soros";
}

const MOROS_CHIPS = ["🛡 Scan Agent", "⚖ Ethics Audit", "🔧 Auto-Fix"];
const SOROS_CHIPS = ["💰 Browse Bounties", "🤖 Register Agent", "📬 Post Task"];

const MOROS_SUGGESTIONS = [
  "Scan https://yourbot.ai for vulnerabilities",
  "Is this AI agent behaving ethically?",
  "Test my chatbot for prompt injection",
  "Audit this agent's behavior and bias",
];

const SOROS_SUGGESTIONS = [
  "Show me open bounties to solve",
  "How do I earn USDC with my AI agent?",
  "Post a task for the marketplace",
  "Find someone to fix my AI security issue",
];

function getAIResponse(input: string, agent: "moros" | "soros"): { text: string; escalate?: boolean } {
  const lower = input.toLowerCase();

  if (agent === "moros") {
    if (/scan|http|bot|agent|vuln/.test(lower)) {
      return { text: MOROS_RESPONSES.scan };
    }
    if (/ethic|bias|behav|manipulat/.test(lower)) {
      return { text: MOROS_RESPONSES.ethics };
    }
    if (/fix|patch|repair|harden/.test(lower)) {
      return { text: MOROS_RESPONSES.fix };
    }
    if (/memory|poison|confused|don't understand|dont understand/.test(lower)) {
      return { text: MOROS_RESPONSES.escalate, escalate: true };
    }
    return { text: MOROS_RESPONSES.default };
  } else {
    if (/open|bounty|task|show/.test(lower)) {
      return { text: SOROS_RESPONSES.bounties };
    }
    if (/earn|usdc|money|agent|register/.test(lower)) {
      return { text: SOROS_RESPONSES.earn };
    }
    if (/post|create|submit/.test(lower)) {
      return { text: SOROS_RESPONSES.post };
    }
    return { text: SOROS_RESPONSES.default };
  }
}

export default function ChatInterface({ initialTab = "moros" }: ChatInterfaceProps) {
  const [activeTab, setActiveTab] = useState<"moros" | "soros">(initialTab);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      agent: activeTab,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 900 + Math.random() * 700;
    await new Promise((r) => setTimeout(r, delay));

    const { text: responseText, escalate } = getAIResponse(messageText, activeTab);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: "ai",
      content: responseText,
      agent: activeTab,
      escalated: escalate,
    };

    setMessages((prev) => [...prev, aiMsg]);
    setIsTyping(false);

    if (escalate) {
      await new Promise((r) => setTimeout(r, 800));
      setActiveTab("soros");

      await new Promise((r) => setTimeout(r, 1200));
      const sorosMsg: Message = {
        id: (Date.now() + 2).toString(),
        role: "ai",
        content: SOROS_RESPONSES.default,
        agent: "soros",
      };
      setMessages((prev) => [...prev, sorosMsg]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isEmpty = messages.length === 0;
  const placeholder = activeTab === "moros" ? "Ask Moros anything..." : "Ask Soros anything...";
  const accentColor = activeTab === "moros" ? "#ef4444" : "#6366f1";
  const chips = activeTab === "moros" ? MOROS_CHIPS : SOROS_CHIPS;
  const suggestions = activeTab === "moros" ? MOROS_SUGGESTIONS : SOROS_SUGGESTIONS;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] max-w-[860px] mx-auto w-full">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1e1e2e]">
        <button className="w-10 h-10 rounded-full bg-[#1e1e2e] flex items-center justify-center hover:bg-[#2a2a3a] transition-colors">
          <Menu size={18} className="text-gray-300" />
        </button>
        <MorosSorosToggle active={activeTab} onChange={setActiveTab} />
        <button className="w-10 h-10 rounded-full bg-[#1e1e2e] flex items-center justify-center hover:bg-[#2a2a3a] transition-colors">
          <ShieldIcon size={22} />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
        <AnimatePresence>
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full gap-6 pb-8"
            >
              <ShieldIcon size={80} className="opacity-15" />
              <p className="text-gray-500 text-sm font-dm-mono text-center">
                {activeTab === "moros"
                  ? "Scan · Analyze · Fix AI agents"
                  : "Earn USDC solving AI safety issues"}
              </p>

              {/* Suggestion chips */}
              <div className="flex flex-wrap gap-2 justify-center max-w-sm">
                {chips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSend(chip)}
                    className="px-3 py-1.5 rounded-full text-xs border font-dm-mono transition-all hover:opacity-80"
                    style={{ borderColor: accentColor, color: accentColor }}
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Suggestion list */}
              <div className="flex flex-col gap-2 w-full max-w-sm">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-left px-4 py-3 rounded-xl bg-[#0d0d12] border border-[#1e1e2e] text-sm text-gray-300 hover:border-gray-500 transition-all font-dm-mono"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.role === "ai" && (
                    <div className="flex-shrink-0 mt-1">
                      <ShieldIcon size={28} />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
                    {msg.role === "ai" && (
                      <div className="mb-1 flex items-center gap-2">
                        {msg.escalated && (
                          <span className="text-xs text-[#6366f1] font-dm-mono">↗ Escalated to Soros</span>
                        )}
                        <span
                          className="text-xs font-medium font-bebas tracking-wider"
                          style={{ color: msg.agent === "moros" ? "#ef4444" : "#6366f1" }}
                        >
                          {msg.agent === "moros" ? "MOROS" : "SOROS"}
                        </span>
                      </div>
                    )}
                    <div
                      className={`px-4 py-3 text-sm whitespace-pre-wrap font-dm-mono leading-relaxed ${
                        msg.role === "user"
                          ? "bg-[#f4f4f5] text-[#18181b] rounded-[20px_20px_4px_20px]"
                          : `bg-[#0d0d12] text-[#e4e4e7] rounded-[20px_20px_20px_4px] border ${
                              msg.escalated ? "border-[#6366f1]" : "border-[#1e1e2e]"
                            }`
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2"
                >
                  <ShieldIcon size={28} />
                  <div className="bg-[#0d0d12] border border-[#1e1e2e] rounded-[20px_20px_20px_4px]">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Input area */}
      <div className="px-4 py-4 border-t border-[#1e1e2e]">
        {isEmpty && (
          <div className="flex flex-wrap gap-2 justify-center mb-3">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => handleSend(chip)}
                className="px-3 py-1.5 rounded-full text-xs border font-dm-mono transition-all hover:opacity-80"
                style={{ borderColor: accentColor, color: accentColor }}
              >
                {chip}
              </button>
            ))}
          </div>
        )}
        <div className="bg-[#f4f4f5] rounded-2xl px-4 pt-3 pb-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-[#18181b] placeholder-gray-400 resize-none outline-none text-sm font-dm-mono leading-relaxed"
            style={{ maxHeight: "120px" }}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Paperclip size={18} />
              </button>
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium font-dm-mono"
                style={{ background: `${accentColor}20`, color: accentColor }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ background: accentColor }}
                />
                {activeTab === "moros" ? "Moros 1.0" : "Soros 1.0"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Mic size={18} />
              </button>
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  input.trim() && !isTyping
                    ? "bg-[#18181b] text-white hover:bg-[#2a2a2a]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Send size={14} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
