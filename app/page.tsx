"use client";

import FeatureTeaser from "@/src/components/FeatureTeaser";
import DemoPlayer from "@/src/components/DemoPlayer";
import FraudDisclaimer from "@/src/components/FraudDisclaimer";
import DemoBanner from "@/src/components/DemoBanner";
import HowItWorks from "@/src/components/HowItWorks";
import { ToastProvider } from "@/src/components/ToastProvider";
import { useState } from "react";
import { ShieldCheck, Lock, FileCheck2, CheckCircle2 } from "lucide-react";

function HomeContent() {
  const [showTeaser, setShowTeaser] = useState(false);

  // Reveal the teaser after the user has a moment to watch
  const handleWatchComplete = () => {
    setTimeout(() => setShowTeaser(true), 1500);
  };

  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

      {/* ==================== HEADER ==================== */}
      <header className="relative z-10 w-full border-b border-[#E5E7EB]/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center shadow-lg shadow-gray-500/20">
              <FileCheck2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#1A1A1A] leading-tight tracking-tight">
                KYC Mission Control
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5 font-medium">
                Document Verification Portal
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            System Operational
          </div>
        </div>
      </header>

      {/* ==================== DEMO BANNER ==================== */}
      <DemoBanner />

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Hero Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full mb-4 border border-gray-200/60">
              <Lock size={14} />
              Secure &amp; Encrypted
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-3 tracking-tight">
              Verify Documents{" "}
              <span className="text-gray-500 animate-pulse-glow">Effortlessly</span>
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
              Watch how our intelligent system processes, extracts, and verifies
              a NIN Slip — in real-time.
            </p>
          </div>

          {/* How It Works */}
          <HowItWorks />

          {/* Demo Video Player */}
          <DemoPlayer />

          {/* Fraud Disclaimer */}
          <FraudDisclaimer />

          {/* Trigger Teaser Button (optional manual reveal) */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleWatchComplete}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-[#2D2D2D] transition-all duration-300"
            >
              Unlock Premium Features
            </button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {[
              { icon: <ShieldCheck size={16} />, label: "Bank-grade Security" },
              { icon: <Lock size={16} />, label: "End-to-End Encryption" },
              { icon: <CheckCircle2 size={16} />, label: "Compliance Ready" },
              { icon: <FileCheck2 size={16} />, label: "Fast Verification" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-white/70 border border-gray-200/70 rounded-xl text-xs font-medium text-gray-600 backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 cursor-default"
              >
                <span className="text-gray-500">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 w-full border-t border-gray-200/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 KYC Mission Control. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Lock size={12} />
            Secure Connection · SSL Protected
          </span>
        </div>
      </footer>

      {/* Feature Teaser Modal */}
      {showTeaser && <FeatureTeaser onClose={() => setShowTeaser(false)} />}
    </main>
  );
}

export default function Home() {
  return (
    <ToastProvider>
      <HomeContent />
    </ToastProvider>
  );
}