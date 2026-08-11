import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import uploadGif from "../../assets/video/upload.gif";
import useImageUpload from "../../features/upload/hooks/useImageUpload";
import { uploadImage } from "../../api/project.api.js";

/**
 * Upload Card Component
 * Handles image upload with drag-and-drop and file browser
 * Creates project and navigates to editor
 */
export default function UploadCard() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { selectedImage, processFile } = useImageUpload();
  const navigate = useNavigate();

  /**
   * Handle drag events for drag-and-drop
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Handle file selection via browser
   */
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  /**
   * Change selected image
   */
  const changeImage = () => {
    fileInputRef.current?.click();
  };

  /**
   * Create project and navigate to editor
   * Uploads image to Cloudinary and passes projectId
   */
  const continueToEditor = async () => {
    try {
      setIsUploading(true);
      
      const formdata = new FormData();
      formdata.append("image", selectedImage.file);

      const response = await uploadImage(formdata);

      navigate("/editor", {
        state: {
          image: selectedImage,
          projectId: response.project._id,
        },
      });
    } catch (error) {
      console.error("Project creation failed:", error);
      alert("Failed to create project. Please try again.");
      setIsUploading(false);
    }
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
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={
          !selectedImage
            ? {
                y: -4,
                boxShadow: "0 20px 40px rgba(99, 102, 241, 0.08)",
              }
            : {}
        }
        className="w-full max-w-[600px] md:max-w-[700px] md:min-h-[300px] min-h-[350px] rounded-3xl bg-white border-2 border-dashed border-slate-200 hover:border-indigo-400 shadow-sm p-10 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300"
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        style={{
          borderColor: selectedImage ? "#10B981" : undefined,
          willChange: !selectedImage ? "transform" : "auto",
        }}
      >
        <input
                ref={fileInputRef}
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                />
        <AnimatePresence mode="wait">
          {!selectedImage ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
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
                    ease: "easeInOut",
                  },
                  scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
                }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50 border-2 border-slate-200 text-indigo-600 flex items-center justify-center mb-6 shadow-sm transition-colors"
                style={{
                  willChange: "transform",
                }}
              >
                <img
                  src={uploadGif}
                  className="w-fit rounded-2xl"
                  alt="Upload animation"
                />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xl font-bold text-slate-900 tracking-[-0.01em] leading-tight"
                style={{ textWrap: "balance" }}
              >
                Drag &amp; Drop your room image
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.15,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm text-slate-600 mt-2"
              >
                PNG, JPG up to 10MB
              </motion.p>

              <label className="relative cursor-pointer">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                    onClick={() => fileInputRef.current?.click()}
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
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center w-full"
            >
              <motion.h3
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-lg font-bold text-slate-900 tracking-tight mb-6"
              >
                Preview Image
              </motion.h3>

              {/* Image Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.15,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full max-w-[400px] aspect-video rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md mb-6"
              >
                <img
                  src={selectedImage.preview}
                  alt="Uploaded preview"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* File name */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-sm text-slate-600 mb-6 max-w-[280px] truncate"
              >
                {selectedImage.name}
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  onClick={changeImage}
                  disabled={isUploading}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 text-slate-900 text-sm font-semibold rounded-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <RefreshCw className="size-4" />
                  Change Image
                </motion.button>
                <motion.button
                  whileHover={!isUploading ? { y: -2 } : {}}
                  whileTap={!isUploading ? { scale: 0.97 } : {}}
                  type="button"
                  onClick={continueToEditor}
                  disabled={isUploading}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/25 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed relative"
                >
                  {isUploading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="size-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Creating Project...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </motion.button>
              </motion.div>
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
                  boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.15)",
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


