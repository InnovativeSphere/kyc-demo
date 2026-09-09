"use client";
import { motion } from "framer-motion";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function DemoDisclaimer() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative w-full bg-[#FAFAFA] border border-[#E0E0E0] rounded-xl px-4 py-3 flex items-center justify-between gap-3 mb-6"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="p-1.5 bg-[#1A1A1A] rounded-full">
          <Info className="w-4 h-4 text-white" />
        </div>
        <p className="text-sm text-[#2D2D2D] font-medium">
          <span className="font-bold text-[#1A1A1A]">Demo Mode:</span> Currently supporting{" "}
          <span className="font-bold text-emerald-600">NIN Slip</span> documents only.
        </p>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="text-[#9A9A9A] hover:text-[#1A1A1A] transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}