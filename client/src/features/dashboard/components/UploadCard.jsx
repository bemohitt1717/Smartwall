import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileImage, CheckCircle, AlertCircle, Image } from "lucide-react";

import { useNavigate } from "react-router-dom";
import uploadGif from "../../../assets/video/upload.gif"

export default function UploadCard() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("idle"); // idle, uploading, success, error
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setUploadStatus("error");
      setFileName("Invalid file type. Please upload a PNG or JPG.");
      setTimeout(() => setUploadStatus("idle"), 4000);
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus("error");
      setFileName("File is too large. Max size is 10MB.");
      setTimeout(() => setUploadStatus("idle"), 4000);
      return;
    }

    setFileName(file.name);
    setUploadStatus("uploading");
    setUploadProgress(0);
  };

  // Smooth progress animation
  useEffect(() => {
    if (uploadStatus === "uploading") {
      const duration = 1800;
      const startTime = Date.now();
      
      const animateProgress = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        
        setUploadProgress(progress);
        
        if (progress < 100) {
          requestAnimationFrame(animateProgress);
        } else {
          setTimeout(() => setUploadStatus("success"), 200);
        }
      };
      
      requestAnimationFrame(animateProgress);
    }
  }, [uploadStatus]);

  const resetUpload = (e) => {
    e.stopPropagation();
    setUploadStatus("idle");
    setFileName("");
    setUploadProgress(0);
  };

  return (
    <div className="w-full flex justify-center mt-12 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
        }}
        transition={{ 
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1]
        }}
        whileHover={uploadStatus === "idle" ? { 
          y: -4,
          boxShadow: "0 20px 40px rgba(99, 102, 241, 0.08)" 
        } : {}}
        className="w-full max-w-[600px] md:max-w-[700px] md:min-h-[300px] min-h-[350px] rounded-3xl bg-white border-2 border-dashed border-slate-200 hover:border-indigo-400 shadow-sm p-10 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          borderColor: uploadStatus === "uploading" ? "#818cf8" : 
                       uploadStatus === "success" ? "#10B981" : 
                       uploadStatus === "error" ? "#EF4444" : undefined,
          willChange: uploadStatus === "idle" ? 'transform' : 'auto'
        }}
      >
        {/* Subtle background glow */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: uploadStatus === "uploading" ? 0.3 : uploadStatus === "success" ? 0.2 : 0
          }}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.06), transparent 60%)'
          }}
        />

        <AnimatePresence mode="wait">
          {uploadStatus === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ 
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Large premium icon container with floating animation */}
              <motion.div
                animate={
                  isDragActive 
                    ? { scale: 1.1, rotate: 5, y: -4 } 
                    : { 
                        scale: 1,
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  y: {
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 border-2 border-slate-200 text-indigo-600 flex items-center justify-center mb-6 shadow-sm transition-colors"
                style={{
                  willChange: 'transform'
                }}
              >
                <img src={uploadGif} className="w-fit rounded-2xl" alt="Upload animation"/>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl font-bold text-slate-900 tracking-[-0.01em] leading-tight"
                style={{ textWrap: 'balance' }}
              >
                Drag &amp; Drop your room image
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-slate-600 mt-2"
              >
                PNG, JPG up to 10MB
              </motion.p>

              <label className="relative cursor-pointer">
                <input
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[15px] font-semibold rounded-2xl shadow-lg shadow-indigo-600/25 transition-all duration-200"
                >
                  Browse Files
                </motion.div>
              </label>

              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="text-sm text-slate-600 mt-4"
              >
                or drag files here
              </motion.span>
            </motion.div>
          )}

          {uploadStatus === "uploading" && (
            <motion.div
              key="uploading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Animated icon that morphs */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 text-indigo-700 flex items-center justify-center mb-6 shadow-lg relative overflow-hidden"
              >
                {/* Spinning background effect */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                />
                <Image className="size-9 relative z-10" strokeWidth={1.5} />
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg font-bold text-slate-900 tracking-tight mb-2"
                style={{ textWrap: 'balance' }}
              >
                Processing your room...
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="text-sm text-slate-600 max-w-[280px] truncate mb-6"
              >
                {fileName}
              </motion.p>

              {/* Progress bar */}
              <div className="w-full max-w-[280px] h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ 
                    duration: 0.1,
                    ease: "linear"
                  }}
                  className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-500 rounded-full relative"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    animate={{ 
                      backgroundPosition: ["0% 0%", "200% 0%"]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </motion.div>
              </div>

              {/* Percentage text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-sm font-semibold text-indigo-700 mt-3"
              >
                {Math.round(uploadProgress)}%
              </motion.span>
            </motion.div>
          )}

          {uploadStatus === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Success icon with bounce */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.1, 0.95, 1],
                  opacity: 1
                }}
                transition={{
                  duration: 0.5,
                  times: [0, 0.5, 0.75, 1],
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 text-emerald-700 flex items-center justify-center mb-6 shadow-lg relative overflow-hidden"
              >
                {/* Success pulse - only 1 pulse */}
                <motion.div
                  initial={{ scale: 1, opacity: 0.4 }}
                  animate={{ 
                    scale: [1, 1.8],
                    opacity: [0.4, 0]
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                  className="absolute inset-0 bg-emerald-400 rounded-2xl"
                />
                <CheckCircle className="size-10 relative z-10" strokeWidth={2} />
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl font-bold text-slate-900 tracking-tight mb-2"
                style={{ textWrap: 'balance' }}
              >
                Visualizer Ready!
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-emerald-700 font-semibold mb-4 flex items-center gap-1.5 justify-center"
              >
                <FileImage className="size-4" />
                {fileName}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={() => navigate("/editor")}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/25"
                >
                  Open Editor
                </motion.button>
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={resetUpload}
                  className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 underline underline-offset-4 decoration-2 transition-colors px-4"
                >
                  Upload another image
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {uploadStatus === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center w-full"
            >
              {/* Error icon with shake */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  x: [0, -8, 8, -8, 8, 0]
                }}
                transition={{
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.2 },
                  x: { duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-50 to-rose-100 border-2 border-rose-300 text-rose-700 flex items-center justify-center mb-6 shadow-lg"
              >
                <AlertCircle className="size-10" strokeWidth={2} />
              </motion.div>

              <motion.h3 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl font-bold text-slate-900 tracking-tight mb-2"
                style={{ textWrap: 'balance' }}
              >
                Upload Failed
              </motion.h3>
              
              <motion.p 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm text-rose-700 font-semibold mb-6"
              >
                {fileName}
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={resetUpload}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 text-slate-900 text-sm font-semibold rounded-xl transition-all"
              >
                Try Again
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Drag Active Overlay with animated border */}
        <AnimatePresence>
          {isDragActive && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-indigo-600/5 backdrop-blur-sm pointer-events-none flex items-center justify-center"
            >
              <motion.div 
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="border-2 border-indigo-500 rounded-3xl m-4 inset-0 absolute"
                style={{
                  boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)"
                }}
              />
              {/* Floating indicator */}
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold text-sm shadow-xl"
              >
                Drop to upload
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
