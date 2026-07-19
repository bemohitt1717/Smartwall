import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Image as ImageIcon, Check, Layers } from "lucide-react";

export default function CanvasWorkspace() {
  const [uploadState, setUploadState] = useState("empty"); // empty, uploading, uploaded

  return (
    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {uploadState === "empty" && (
            <UploadPlaceholder key="upload" onUpload={() => setUploadState("uploading")} />
          )}
          {uploadState === "uploading" && (
            <UploadingState key="uploading" onComplete={() => setUploadState("uploaded")} />
          )}
          {uploadState === "uploaded" && (
            <CanvasPlaceholder key="canvas" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function UploadPlaceholder({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    // onUpload(); // Uncomment to test upload flow
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onDragEnter={handleDragEnter}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-full max-w-2xl transition-all duration-300 ${
        isDragging ? "scale-105" : ""
      }`}
    >
      <div
        className={`relative bg-white rounded-3xl p-12 md:p-16 flex flex-col items-center justify-center transition-all duration-300 ${
          isDragging
            ? "border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20"
            : "border-2 border-dashed border-slate-200 shadow-sm"
        }`}
      >
        {/* Animated Border Glow on Drag */}
        {isDragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10"
          />
        )}

        {/* Upload Icon */}
        <motion.div
          animate={isDragging ? { scale: 1.1, y: -8 } : { y: [0, -8, 0] }}
          transition={
            isDragging
              ? { duration: 0.2 }
              : {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
          className="relative mb-6"
        >
          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-100/50 to-purple-100/50 blur-xl" />
            <ImageIcon
              className="size-12 text-indigo-600 relative z-10"
              strokeWidth={1.5}
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 text-center">
          {isDragging ? "Drop to Upload" : "Upload Room Image"}
        </h3>
        <p className="text-slate-600 text-sm md:text-base text-center max-w-md mb-6">
          {isDragging
            ? "Release to start visualizing paint colors"
            : "Drag and drop your room photo here to begin"}
        </p>

        {/* Supported Formats */}
        <div className="flex items-center gap-3 mb-6">
          <FormatBadge format="PNG" />
          <FormatBadge format="JPG" />
          <FormatBadge format="WEBP" />
        </div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onUpload}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
          type="button"
        >
          <Upload className="size-5" strokeWidth={2} />
          Browse Files
        </motion.button>

        {/* File Size Limit */}
        <p className="text-xs text-slate-500 mt-4">Maximum size: 10MB</p>
      </div>
    </motion.div>
  );
}

function UploadingState({ onComplete }) {
  useState(() => {
    const timer = setTimeout(() => onComplete(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col items-center"
    >
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-4 relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
        />
        <Layers className="size-10 text-indigo-600 relative z-10" strokeWidth={1.5} />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">Preparing Canvas...</h3>
      <p className="text-sm text-slate-600">Setting up your workspace</p>
    </motion.div>
  );
}

function CanvasPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl h-full max-h-[600px] bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-conic-gradient(#f8fafc 0% 25%, transparent 0% 50%) 50% / 20px 20px",
      }}
    >
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-slate-100 mb-4">
          <ImageIcon className="size-8 text-slate-400" strokeWidth={1.5} />
        </div>
        <p className="text-slate-500 text-sm font-medium">Canvas Ready</p>
        <p className="text-slate-400 text-xs mt-1">Select a wall to begin editing</p>
      </div>
    </motion.div>
  );
}

function FormatBadge({ format }) {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
      <span className="text-xs font-semibold text-slate-700">{format}</span>
    </div>
  );
}

