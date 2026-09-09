"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Shield, Fingerprint, FileText, User, Calendar, Activity } from "lucide-react";

interface ResultsPanelProps {
  result: any;
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  if (!result) return null;

  const fraudStatus = result.fraud_check?.fraud_status;
  const trustScore = result.fraud_check?.trust_score ?? 0;

  // Muted colors for minimalist trust
  const statusColor = fraudStatus === "CLEAN" ? "#2E7D32" : fraudStatus === "FLAGGED" ? "#F57F17" : "#C62828";
  const statusBg = fraudStatus === "CLEAN" ? "#E8F5E9" : fraudStatus === "FLAGGED" ? "#FFF8E1" : "#FFEBEE";
  const statusIcon = fraudStatus === "CLEAN" ? <CheckCircle2 className="w-6 h-6" /> : fraudStatus === "FLAGGED" ? <AlertTriangle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />;

  const dataRows = [
    { label: "Document Type", value: result.doc_type, icon: <FileText className="w-3.5 h-3.5" /> },
    { label: "ID Number", value: result.id_number, icon: <Fingerprint className="w-3.5 h-3.5" /> },
    { label: "Surname", value: result.surname, icon: <User className="w-3.5 h-3.5" /> },
    { label: "First Name", value: result.first_name, icon: <User className="w-3.5 h-3.5" /> },
    { label: "Date of Birth", value: result.date_of_birth || "N/A", icon: <Calendar className="w-3.5 h-3.5" /> },
    { label: "Sex", value: result.sex || "N/A", icon: <Activity className="w-3.5 h-3.5" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* ==================== STATUS BANNER ==================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-5 flex items-center justify-between px-5 py-4 rounded-2xl border"
        style={{
          backgroundColor: statusBg,
          borderColor: `${statusColor}20`,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${statusColor}15`, color: statusColor }}
          >
            {statusIcon}
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Verification Status</p>
            <p className="text-base font-bold" style={{ color: statusColor }}>
              {fraudStatus === "CLEAN" ? "Document Cleared" : fraudStatus === "FLAGGED" ? "Flagged for Review" : "Rejected"}
            </p>
          </div>
        </div>
        <span
          className="text-xs font-mono px-3 py-1.5 rounded-full font-semibold"
          style={{ backgroundColor: "white", color: statusColor, border: `1px solid ${statusColor}30` }}
        >
          {fraudStatus}
        </span>
      </motion.div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="bg-white/95 border border-[#E5E5E5] rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4 border-b border-[#F0F0F0]">
          <h3 className="text-lg font-bold text-[#1A1A1A] tracking-tight">Verification Results</h3>
          <p className="text-xs text-gray-400 mt-0.5">Document analysis complete</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-[#F0F0F0]">
          {/* ==================== EXTRACTED DATA ==================== */}
          <div className="p-6">
            <p className="text-[#9A9A9A] text-xs font-medium uppercase tracking-wider mb-4">
              Extracted Information
            </p>

            <div className="space-y-1">
              {dataRows.map((row, idx) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + idx * 0.05 }}
                  className="group flex items-center justify-between py-3 px-3 rounded-lg hover:bg-[#FAFAFA] transition-colors cursor-default"
                >
                  <span className="flex items-center gap-2.5 text-[#9A9A9A] text-sm">
                    <span className="text-gray-300 group-hover:text-gray-400 transition-colors">
                      {row.icon}
                    </span>
                    {row.label}
                  </span>
                  <span className="text-[#1A1A1A] font-mono text-sm font-medium">
                    {row.value || "—"}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ==================== TRUST SCORE ==================== */}
          <div className="p-6 flex flex-col items-center justify-center bg-[#FAFAFA]/50">
            <p className="text-[#9A9A9A] text-xs font-medium uppercase tracking-wider mb-5">
              Trust Score
            </p>

            {/* Animated Ring */}
            <div className="relative w-28 h-28 mb-4">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={trustScore > 70 ? "#2E7D32" : trustScore > 40 ? "#F57F17" : "#C62828"} />
                    <stop offset="100%" stopColor={trustScore > 70 ? "#4CAF50" : trustScore > 40 ? "#F57F17" : "#C62828"} />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="40" stroke="#E5E5E5" strokeWidth="8" fill="none" />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#scoreGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${trustScore * 2.51} 251`}
                  initial={{ strokeDasharray: `0 251` }}
                  animate={{ strokeDasharray: `${trustScore * 2.51} 251` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-3xl font-bold text-[#1A1A1A] leading-none">
                  {trustScore}
                </span>
                <span className="text-[10px] text-gray-400 mt-0.5 uppercase tracking-wide">/ 100</span>
              </div>
            </div>

            {/* Score Label */}
            <div
              className="px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
              style={{
                backgroundColor: `${statusColor}10`,
                color: statusColor,
                border: `1px solid ${statusColor}20`,
              }}
            >
              {trustScore > 70 ? "High Confidence" : trustScore > 40 ? "Moderate Confidence" : "Low Confidence"}
            </div>

            {/* ==================== ISSUES / CLEAN STATUS ==================== */}
            {result.fraud_check?.issues_detected?.length > 0 ? (
              <div className="w-full space-y-2">
                <p className="text-[#9A9A9A] text-xs font-medium uppercase tracking-wider text-center mb-2">
                  Issues Detected
                </p>
                {result.fraud_check.issues_detected.map((issue: string, idx: number) => (
                  <motion.p
                    key={issue}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="text-xs font-mono flex items-center gap-2 bg-[#FFEBEE] text-[#C62828] px-3 py-2 rounded-lg"
                  >
                    <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                    {issue.replace(/_/g, " ")}
                  </motion.p>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full flex items-center justify-center gap-2 bg-[#E8F5E9] text-[#2E7D32] px-4 py-3 rounded-lg"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-xs font-medium">All checks passed — no issues detected</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}