"use client";
import { motion } from "framer-motion";
import { Lock, Sparkles, X, ShieldCheck, Database, Zap, FileText, Plug } from "lucide-react";

interface FeatureTeaserProps {
  onClose: () => void;
}

export default function FeatureTeaser({ onClose }: FeatureTeaserProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      onClick={onClose}
    >
      {/* Ambient glow behind modal - subtle emerald */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border border-[#E0E0E0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-all duration-200 z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 pt-6">
          {/* Icon + Badge Row */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", damping: 12 }}
                className="relative inline-flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-emerald-500/15 rounded-2xl blur-lg" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] flex items-center justify-center shadow-lg">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] font-bold text-[#9A9A9A] uppercase tracking-widest">
                    Premium Feature
                  </span>
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-[#1A1A1A] tracking-tight">
                  Identro Verification
                </h3>
              </div>
            </div>
          </div>

          {/* Main Message - Benefit-focused pitch */}
          <p className="text-[#4A4A4A] leading-relaxed mb-6 text-sm">
            Automate your customer verification with a system that reads Nigerian
            ID documents, extracts critical fields, checks for fraud, and stores
            everything cleanly — <span className="font-semibold text-[#1A1A1A]">saving you hours of manual work</span>.
          </p>

          {/* Key Benefits - Client-focused */}
          <div className="space-y-2.5 mb-6">
            {[
              { icon: <Database className="w-3.5 h-3.5" />, text: "Automates manual verification effort" },
              { icon: <Zap className="w-3.5 h-3.5" />, text: "Improves fraud detection accuracy" },
              { icon: <FileText className="w-3.5 h-3.5" />, text: "Supports NIN, Driver's License & Passport" },
              { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Stores clean data in a centralized database" },
              { icon: <Plug className="w-3.5 h-3.5" />, text: "Seamless integration with Identro" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <span className="w-6 h-6 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5] flex items-center justify-center text-emerald-600 flex-shrink-0 transition-colors duration-200 group-hover:bg-emerald-50 group-hover:border-emerald-200">
                  {item.icon}
                </span>
                <span className="text-xs text-[#4A4A4A] group-hover:text-[#1A1A1A] transition-colors duration-200">
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA - Action Oriented for Business */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1A1A1A] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:bg-[#2D2D2D] transition-all duration-300 group">
              <Lock className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              Integrate with Identro
            </div>
            <p className="text-[10px] text-[#9A9A9A] font-mono">
              Contact your administrator to enable this module
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}