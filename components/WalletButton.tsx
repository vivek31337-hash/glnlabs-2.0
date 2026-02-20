"use client";

interface WalletButtonProps {
  connected?: boolean;
  address?: string;
  onClick?: () => void;
}

export default function WalletButton({ connected = false, address, onClick }: WalletButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all font-dm-mono ${
        connected
          ? "border border-[#10b981] text-[#10b981] bg-transparent hover:bg-[#10b981]/10"
          : "bg-[#ef4444] text-white hover:bg-[#dc2626]"
      }`}
    >
      {connected && address ? `✓ ${address}` : "CONNECT WALLET"}
    </button>
  );
}
