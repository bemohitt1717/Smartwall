import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../../../api/project.api.js";

export default function CreateProjectModal({ isOpen, onClose }) {
  const [projectName, setProjectName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!projectName || !selectedImage) return;

    try {
      setIsCreating(true);

      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("name", projectName);

      const response = await uploadImage(formData);

      setIsCreating(false);
      setProjectName("");
      setSelectedImage(null);
      setImagePreview(null);
      onClose();

      navigate("/editor", {
        state: {
          projectId: response.project._id,
          image: {
            preview: response.project.originalImage.url,
            name: selectedImage.name,
            size: selectedImage.size,
          },
        },
      });
    } catch (error) {
      console.error("Failed to create project:", error);
      alert("Failed to create project. Please try again.");
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    onClose();
    setProjectName("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal Box */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                <h2 className="text-xl font-bold text-slate-900">
                  Create New Project
                </h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  type="button"
                >
                  <X className="size-5 text-slate-600" strokeWidth={2} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                {/* Project Name Input */}
                <div>
                  <label
                    htmlFor="projectName"
                    className="block text-sm font-semibold text-slate-700 mb-2"
                  >
                    Project Name
                  </label>
                  <input
                    id="projectName"
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter project name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Upload Room Image
                  </label>

                  {/* Upload Area */}
                  <label
                    htmlFor="imageUpload"
                    className={`
                      relative block w-full rounded-xl border-2 border-dashed cursor-pointer
                      transition-all overflow-hidden
                      ${
                        imagePreview
                          ? "border-indigo-500 bg-indigo-50/30"
                          : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"
                      }
                    `}
                  >
                    {imagePreview ? (
                      // Image Preview
                      <div className="relative h-40">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="text-white text-sm font-semibold">
                            Click to change image
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Upload Placeholder
                      <div className="flex flex-col items-center justify-center py-8 px-4">
                        <div className="w-14 h-14 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
                          <ImageIcon
                            className="size-7 text-indigo-600"
                            strokeWidth={1.5}
                          />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 mb-1">
                          Click to upload image
                        </p>
                        <p className="text-xs text-slate-500">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}

                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                  className="px-5 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
                  type="button"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: isCreating ? 1 : 1.02 }}
                  whileTap={{ scale: isCreating ? 1 : 0.98 }}
                  onClick={handleCreate}
                  disabled={!projectName || !selectedImage || isCreating}
                  aria-busy={isCreating}
                  className={`
                    px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-3
                    ${
                      projectName && selectedImage && !isCreating
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30"
                        : isCreating
                          ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg shadow-indigo-600/30 pointer-events-none"
                          : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }
                  `}
                  type="button"
                >
                  {isCreating ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      <span>Creating…</span>
                    </>
                  ) : (
                    "Create Project"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
