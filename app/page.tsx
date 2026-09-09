"use client";

import FeatureTeaser from "@/src/components/FeatureTeaser";
import ProcessPipeline from "@/src/components/ProcessPipeline";
import ResultsPanel from "@/src/components/ResultsPanel";
import UploadZone from "@/src/components/UploadZone";
import DemoDisclaimer from "@/src/components/DemoDisclaimer";
import HowItWorks from "@/src/components/HowItWorks";
import { ToastProvider, useToast } from "@/src/components/ToastProvider";
import { processDocument } from "@/src/lib/api";
import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Lock, FileCheck2, CheckCircle2 } from "lucide-react";

function HomeContent() {
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [showTeaser, setShowTeaser] = useState(false);
  const [progress, setProgress] = useState(0);
  const { showToast } = useToast();
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startFakeProgress = () => {
    setProgress(0);
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev; // cap at 90 until actual completion
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const stopFakeProgress = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  const handleFile = async (file: File) => {
    setIsLoading(true);
    setIsComplete(false);
    setResult(null);
    setShowTeaser(false);
    startFakeProgress();

    try {
      const data = await processDocument(file);
      setResult(data);
      setProgress(100); // force to 100 on success
      showToast("success", "Document verified successfully");
    } catch (error) {
      console.error(error);
      setProgress(0);
      showToast("error", "Processing failed. Please try again.");
    } finally {
      stopFakeProgress();
      setIsLoading(false);
      setIsComplete(true);
      setTimeout(() => setShowTeaser(true), 1500);
    }
  };

  useEffect(() => {
    return () => stopFakeProgress();
  }, []);

  return (
    <main
      className="min-h-screen flex flex-col bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>

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

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Demo Disclaimer */}
          <DemoDisclaimer />

          {/* How It Works */}
          <HowItWorks />

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
              Upload your NIN Slip, let our intelligent system process and verify it in real-time.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {["Upload", "Process", "Results"].map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-500 ${
                    isLoading && idx === 1
                      ? "bg-[#1A1A1A] text-white shadow-lg shadow-gray-500/30"
                      : isComplete && idx === 2
                      ? "bg-[#2D2D2D] text-white shadow-lg shadow-gray-500/30"
                      : "bg-white text-gray-400 border border-gray-200"
                  }`}
                >
                  {isComplete && idx === 2 ? (
                    <CheckCircle2 size={14} />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  )}
                  {step}
                </div>
                {idx < 2 && <div className="w-6 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          {/* Card Container */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8">
            <div className="space-y-4">
              <UploadZone onFileSelected={handleFile} isLoading={isLoading} />

              {isLoading && (
                <div className="mt-4">
                  <ProcessPipeline progress={Math.round(progress)} />
                </div>
              )}

              {isComplete && result && (
                <div className="mt-4">
                  <ResultsPanel result={result} />
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
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
                <span className="text-gray-500 transition-colors duration-300 group-hover:text-gray-700">
                  {item.icon}
                </span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="relative z-10 w-full border-t border-gray-200/60 bg-white/60 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 KYC Mission Control. All rights reserved.</span>
          <span className="flex items-center gap-1.5">
            <Lock size={12} />
            Secure Connection · SSL Protected
          </span>
        </div>
      </footer>

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