"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlaskConical, X, AlertTriangle } from "lucide-react";

interface DemoModeControlProps {
  isDemo: boolean;
  onToggle: (value: boolean) => void;
}

export default function DemoModeControl({ isDemo, onToggle }: DemoModeControlProps) {
  return (
    <>
      {/* Toggle Switch (Header) */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 hidden sm:inline">Demo</span>
        <button
          onClick={() => onToggle(!isDemo)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
            isDemo ? "bg-emerald-500" : "bg-gray-300"
          }`}
          aria-label="Toggle demo mode"
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${
              isDemo ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Demo Banner (Top of Page) */}
      <AnimatePresence>
        {isDemo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-amber-50 border-b border-amber-200 py-2 px-6 flex items-center justify-center gap-3"
          >
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <p className="text-sm text-amber-800">
              Demo Mode – Results are simulated. Limited functionality.{" "}
              <button
                onClick={() => onToggle(false)}
                className="underline font-medium hover:text-amber-900"
              >
                Exit Demo
              </button>
            </p>
            <X
              className="w-4 h-4 text-amber-600 cursor-pointer"
              onClick={() => onToggle(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}