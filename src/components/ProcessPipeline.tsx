"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, FileSearch, Braces, ShieldAlert, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  { label: "Initializing", icon: Loader2 },
  { label: "Detecting Face", icon: ScanFace },
  { label: "Classifying Document", icon: FileSearch },
  { label: "Extracting Fields", icon: Braces },
  { label: "Fraud Analysis", icon: ShieldAlert },
];

export default function ProcessPipeline({ progress }: { progress: number }) {
  // Determine active step based on progress ranges
  const activeStep = Math.min(
    Math.floor(progress / (100 / steps.length)),
    steps.length - 1
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 w-full p-4 bg-white/95 border border-[#E0E0E0] rounded-2xl shadow-sm overflow-hidden relative"
    >
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/80 to-transparent animate-pulse" />

      <div className="relative flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 font-mono text-[#1A1A1A] text-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ y: 12, opacity: 0, filter: "blur(2px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -12, opacity: 0, filter: "blur(2px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-2"
            >
              {(() => {
                const CurrentIcon = steps[activeStep].icon;
                return <CurrentIcon className="w-4 h-4 text-emerald-600" />;
              })()}
              <span>{steps[activeStep].label}...</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Percentage */}
        <span className="text-xs font-mono text-[#9A9A9A] tabular-nums">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 w-full bg-[#F0F0F0] rounded-full overflow-hidden mb-5">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#E5E5E5] via-emerald-500 to-[#E5E5E5] rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ ease: "easeOut", duration: 0.5 }}
        />
        {/* Shimmer */}
        <motion.div
          className="absolute top-0 h-full w-10 bg-white/40 blur-sm"
          animate={{ x: ["-100%", "400%"] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const isCompleted = idx < activeStep || progress === 100;
          const isActive = idx === activeStep && progress !== 100;
          return (
            <div key={idx} className="flex flex-col items-center flex-1">
              <motion.div
                animate={{
                  scale: isActive ? 1.2 : 1,
                  backgroundColor: isCompleted ? "#E8F5E9" : isActive ? "#E5E5E5" : "#F5F5F5",
                  borderColor: isCompleted ? "#2E7D32" : isActive ? "#2D2D2D" : "#E0E0E0",
                }}
                className="w-6 h-6 rounded-full border flex items-center justify-center transition-colors"
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current text-[#9A9A9A]" />
                )}
              </motion.div>
              <span className="mt-1 text-[9px] uppercase tracking-wider text-[#9A9A9A] truncate max-w-[40px]">
                {step.label.split(" ")[0]}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}