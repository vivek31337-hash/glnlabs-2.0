"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-gray-400 typing-dot" />
    </div>
  );
}
