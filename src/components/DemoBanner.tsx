"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X } from "lucide-react";

const DEMO_TEXT =
  "Demo Project: This is a showcase of the KYC Verification service. Some features are limited or simulated.";

export default function DemoBanner() {
  const [typedText, setTypedText] = useState("");
  const [showBanner, setShowBanner] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      index += 1;
      setTypedText(DEMO_TEXT.slice(0, index));
      if (index >= DEMO_TEXT.length) {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 35); // speed: 35ms per character

    return () => clearInterval(typingInterval);
  }, []);

  // After typing completes, wait 10 seconds then fade out
  useEffect(() => {
    if (!isTypingComplete) return;
    const timer = setTimeout(() => {
      setShowBanner(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [isTypingComplete]);

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="relative w-full bg-gray-900 text-white py-2.5 px-4 flex items-center justify-center gap-3 shadow-md"
        >
          <div className="flex items-center gap-2 flex-1 justify-center">
            <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium text-center min-h-[1.25rem]">
              {typedText}
              {!isTypingComplete && (
                <span className="animate-pulse text-emerald-400">|</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            aria-label="Dismiss demo banner"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}