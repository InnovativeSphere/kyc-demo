"use client";
import { motion } from "framer-motion";
import { AlertTriangle, Info } from "lucide-react";

export default function FraudDisclaimer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-6 w-full p-5 bg-[#FAFAFA] border border-[#E5E5E5] rounded-2xl"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-[#1A1A1A] mb-1.5">
            A Note on Flagged Results
          </h4>
          <p className="text-xs text-[#6B6B6B] leading-relaxed">
            This system evaluates <span className="font-semibold text-[#1A1A1A]">only what it is given</span>.
            A "Flagged" status simply means the system detected visual inconsistencies
            within the document — it does <span className="font-semibold text-[#1A1A1A]">not</span> mean
            we are accusing any individual of fraud.
          </p>
          <p className="text-xs text-[#6B6B6B] leading-relaxed mt-2">
            In this demo, a publicly available sample NIN Slip was used, which
            triggered a font inconsistency alert. This is the system doing its
            job — flagging what doesn't match, and letting a human make the final call.
          </p>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E5E5E5]">
            <Info className="w-3.5 h-3.5 text-[#9A9A9A]" />
            <span className="text-[10px] text-[#9A9A9A] font-mono uppercase tracking-wider">
              Human-in-the-loop by design
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}