"use client";
import { motion } from "framer-motion";
import { Lock, Sparkles, X, ShieldCheck } from "lucide-react";

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
      {/* Decorative ambient glow in background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
      />

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative w-full max-w-md overflow-hidden bg-white border border-[#E0E0E0] rounded-3xl text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================== TOP GRADIENT ACCENT ==================== */}
        <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500/80 via-teal-500/80 to-blue-500/80" />

        {/* ==================== CLOSE BUTTON ==================== */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-[#9A9A9A] hover:text-[#1A1A1A] hover:bg-[#F5F5F5] transition-all duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ==================== MAIN CONTENT ==================== */}
        <div className="p-8 pt-6">
          {/* Animated Icon with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 12 }}
            className="relative inline-flex items-center justify-center mb-6"
          >
            <div className="absolute inset-0 bg-emerald-500/15 rounded-full blur-xl" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] flex items-center justify-center shadow-lg">
              <Lock className="w-9 h-9 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-[#1A1A1A] tracking-tight mb-2">
            Identro Verification
          </h3>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium text-[#9A9A9A] uppercase tracking-wider">
              Premium Feature
            </span>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>

          {/* Description */}
          <p className="text-[#9A9A9A] leading-relaxed mb-6 text-sm">
            Cross-check extracted data against live national records for
            unmatched fraud detection.
          </p>

          {/* ==================== BENEFIT LIST ==================== */}
          <div className="space-y-2.5 mb-6">
            {[
              { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: "Real-time national database lookup" },
              { icon: <Lock className="w-3.5 h-3.5" />, text: "Military-grade encryption & privacy" },
              { icon: <Sparkles className="w-3.5 h-3.5" />, text: "Instant cross-verification insights" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + idx * 0.1 }}
                className="flex items-center gap-3 text-left px-4 py-2.5 bg-[#FAFAFA] rounded-xl border border-[#F0F0F0]"
              >
                <span className="text-emerald-600 flex-shrink-0">{item.icon}</span>
                <span className="text-xs font-medium text-[#4A4A4A]">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* ==================== CTA BADGE ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#1A1A1A] to-[#2D2D2D] text-white text-sm font-medium shadow-lg"
          >
            <Lock className="w-4 h-4 text-emerald-400" />
            Available on Request
          </motion.div>

          <p className="text-[10px] text-gray-400 mt-4 font-mono">
            Contact your administrator to enable this module
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}