"use client";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, Loader2, FileImage, ShieldCheck, FlaskConical, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
}

export default function UploadZone({ onFileSelected, isLoading }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Cleanup object URL
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleSampleTest = async () => {
    // Fetch sample image from /public/sample-nin.jpg
    try {
      const res = await fetch("/sample-nin.jpg");
      const blob = await res.blob();
      const file = new File([blob], "sample-nin.jpg", { type: "image/jpeg" });
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelected(file);
    } catch (error) {
      console.error("Failed to load sample", error);
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        onDragEnter={() => setIsDragActive(true)}
        onDragLeave={() => setIsDragActive(false)}
        className={`relative flex flex-col items-center justify-center w-full h-44 rounded-2xl cursor-pointer overflow-hidden transition-all duration-300 ease-out
          ${isDragActive
            ? "border-2 border-emerald-500 bg-emerald-50/50 scale-[1.01] shadow-lg shadow-emerald-500/10"
            : "border-2 border-dashed border-gray-300 bg-white/95 hover:border-gray-400 hover:bg-white hover:shadow-md"}`}
        style={{ backdropFilter: "blur(4px)" }}
      >
        <input {...getInputProps()} disabled={isLoading} />

        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #1A1A1A 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Preview overlay when file selected */}
        <AnimatePresence>
          {previewUrl && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${previewUrl})` }}
            />
          )}
          {previewUrl && isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${previewUrl})` }}
            >
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex flex-col items-center gap-2 text-white">
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="text-sm font-medium">Processing...</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-3 p-6 text-center">
          {isLoading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-emerald-500"
              />
              <p className="text-gray-800 font-medium text-sm">Processing document...</p>
              <p className="text-gray-400 text-xs">This may take a few seconds</p>
            </>
          ) : previewUrl ? (
            <>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
                <FileImage className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-medium text-gray-700 truncate max-w-[200px]">
                  {selectedFile?.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500">Click to replace file</p>
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 10 }}
                className="p-3.5 rounded-2xl bg-gray-100 shadow-sm"
              >
                <UploadCloud className="w-9 h-9 text-gray-700" />
              </motion.div>

              <div>
                <p className="text-gray-800 font-semibold text-base mb-0.5">
                  {isDragActive ? "Drop it here" : "Drag & drop NIN Slip image here"}
                </p>
                <p className="text-gray-400 text-xs">
                  or{" "}
                  <span className="text-emerald-600 font-medium underline underline-offset-2">
                    browse files
                  </span>{" "}
                  (PNG, JPG)
                </p>
              </div>

              <div className="flex items-center gap-2 mt-1 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] text-gray-500 font-medium">
                  Secure upload — encrypted & private
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Sample Test Button */}
      {!isLoading && (
        <button
          onClick={handleSampleTest}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-xl hover:bg-[#2D2D2D] transition-colors"
        >
          <FlaskConical className="w-4 h-4 text-emerald-400" />
          Try with a sample NIN Slip
        </button>
      )}
    </div>
  );
}