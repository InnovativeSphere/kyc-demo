"use client";
import { motion } from "framer-motion";
import { UploadCloud, Cpu, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Upload",
    desc: "Drag & drop your NIN Slip image.",
  },
  {
    icon: Cpu,
    title: "AI Process",
    desc: "Our engine extracts & validates data.",
  },
  {
    icon: CheckCircle2,
    title: "Get Results",
    desc: "Receive trust score & fraud alerts.",
  },
];

export default function HowItWorks() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-10">
      <div className="flex items-center justify-between gap-4">
        {steps.map((step, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.2, type: "spring", stiffness: 200 }}
              className="relative w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-3"
            >
              <step.icon className="w-6 h-6 text-[#1A1A1A]" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1A1A1A] rounded-full text-white text-[10px] font-bold flex items-center justify-center">
                {idx + 1}
              </span>
              {/* Pulsing glow */}
              <div className="absolute inset-0 rounded-2xl bg-emerald-500/10 blur-md animate-pulse pointer-events-none" />
            </motion.div>
            <h3 className="text-sm font-semibold text-[#1A1A1A] mb-1">{step.title}</h3>
            <p className="text-xs text-gray-500 text-center">{step.desc}</p>
          </div>
        ))}
      </div>
      
      {/* Thinner connecting line with traveling dot */}
      <div className="relative mt-6 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
        {/* Progress fill line (slides in once) */}
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#1A1A1A] via-emerald-500 to-[#1A1A1A]"
        />
        {/* Traveling dot - uses left animation to cross the full width */}
        <motion.div
          initial={{ left: "0%" }}
          animate={{ left: "100%" }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/50"
          style={{ marginLeft: "-4px" }} // offset to center dot at edges
        />
      </div>
    </div>
  );
}