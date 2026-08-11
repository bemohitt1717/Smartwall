import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import uploadGif from "../../../assets/video/upload.gif";
import useImageUpload from "../../upload/hooks/useImageUpload.js";
import { uploadImage } from "../../../api/project.api.js";

export default function UploadCard() {
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const { selectedImage, processFile } = useImageUpload();
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

  const continueToEditor = async () => {
    if (!selectedImage?.file) return;

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
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className="w-full max-w-[720px] rounded-[32px] bg-white border border-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.08)] p-8 md:p-10 relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          className="sr-only"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
        />

        <div className="w-full rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-8 flex flex-col items-center justify-center gap-8">
          <AnimatePresence mode="wait">
            {!selectedImage ? (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center gap-4 w-full"
              >
                <div className="w-24 h-24 rounded-[28px] bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <img
                    src={uploadGif}
                    alt="Upload illustration"
                    className="w-12 h-12"
                  />
                </div>

                <div className="space-y-3 max-w-[420px]">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Upload Your Room Photo
                  </h2>
                  <p className="text-sm text-slate-600">
                    Choose a clear photo of your room to start visualizing paint
                    colors instantly.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition-colors duration-200 hover:bg-indigo-700"
                >
                  Browse Files
                </button>

                <p className="text-xs text-slate-500">PNG, JPG up to 10MB</p>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-6 w-full"
              >
                <div className="w-full max-w-[560px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
                  <img
                    src={selectedImage.preview}
                    alt="Selected room preview"
                    className="w-full h-[340px] object-cover"
                  />
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-semibold text-slate-900">
                    Preview Image
                  </h3>
                  <p className="text-sm text-slate-600 truncate max-w-[420px]">
                    {selectedImage.name}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center w-full">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:bg-slate-100 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <RefreshCw className="size-4" />
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={continueToEditor}
                    disabled={isUploading}
                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/15 transition-all duration-200 hover:bg-indigo-700 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isUploading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Creating Project...
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2">
                        Continue
                        <ArrowRight className="size-4" />
                      </span>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isDragActive && (
          <div className="absolute inset-0 rounded-[32px] border-2 border-indigo-500/40 bg-indigo-500/10 pointer-events-none backdrop-blur-sm" />
        )}
      </motion.div>
    </div>
  );
}
