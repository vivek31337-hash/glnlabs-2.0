"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ShieldIcon from "./ShieldIcon";
import WalletButton from "./WalletButton";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "SCAN", href: "/scan" },
  { label: "MARKETPLACE", href: "/marketplace" },
  { label: "LEADERBOARD", href: "/leaderboard" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [walletConnected, setWalletConnected] = useState(false);

  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:flex items-center justify-between px-6 py-3 border-b border-[#1e1e2e] bg-[#050508]/95 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <ShieldIcon size={28} animated />
          <span className="font-bebas text-xl tracking-widest text-white">AGENTMOROS</span>
        </Link>

        <div className="flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-xs font-dm-mono font-medium tracking-widest transition-colors ${
                pathname === item.href
                  ? "text-white"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <WalletButton
          connected={walletConnected}
          address={walletConnected ? "0x4f2a...3c1d" : undefined}
          onClick={() => setWalletConnected(!walletConnected)}
        />
      </nav>

      {/* Mobile top bar */}
      <nav className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[#1e1e2e] bg-[#050508]/95 backdrop-blur-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-2">
          <ShieldIcon size={24} animated />
          <span className="font-bebas text-lg tracking-widest text-white">AGENTMOROS</span>
        </Link>
        <WalletButton
          connected={walletConnected}
          address={walletConnected ? "0x4f2a...3c1d" : undefined}
          onClick={() => setWalletConnected(!walletConnected)}
        />
      </nav>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050508]/95 backdrop-blur-sm border-t border-[#1e1e2e]">
        <div className="flex justify-around py-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-3 text-[10px] font-dm-mono tracking-widest transition-colors ${
                pathname === item.href ? "text-white" : "text-gray-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
