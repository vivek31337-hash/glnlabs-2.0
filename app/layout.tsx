import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "AgentMoros — Make AI Safe. Ethical. Rewarded.",
  description:
    "MOROS scans AI agents for security flaws, ethical failures & dangerous behavior. SOROS connects findings to humans & AI agents who fix them — and pays in crypto.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#050508] text-white min-h-screen">
        <NavBar />
        <main>{children}</main>
        <footer className="border-t border-[#1e1e2e] py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="font-bebas text-xl text-white">AGENTMOROS</p>
                <p className="text-xs text-gray-500 font-dm-mono mt-1">
                  © 2026 GlinLabs LLC — Building a safer AI ecosystem.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 font-dm-mono justify-center">
                <a href="/terms" className="hover:text-white transition-colors">Terms</a>
                <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
                <a href="/disclosure" className="hover:text-white transition-colors">Disclosure</a>
                <a href="/bug-bounty" className="hover:text-white transition-colors">Bug Bounty</a>
              </div>
              <div className="flex flex-col gap-1 text-xs text-gray-500 font-dm-mono text-center md:text-right">
                <a href="mailto:security@agentmoros.ai" className="hover:text-white transition-colors">security@agentmoros.ai</a>
                <a href="mailto:legal@agentmoros.ai" className="hover:text-white transition-colors">legal@agentmoros.ai</a>
                <a href="mailto:hello@agentmoros.ai" className="hover:text-white transition-colors">hello@agentmoros.ai</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
