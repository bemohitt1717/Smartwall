import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export default function CreateProjectModal({ isOpen, onClose }) {
  const [projectName, setProjectName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleCreate = () => {
    // Logic will be handled by user
    console.log("Project Name:", projectName);
    console.log("Selected Image:", selectedImage);
    
    // Close modal after creation
    onClose();
    
    // Reset form
    setProjectName("");
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleClose = () => {
    onClose();
    // Reset form
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
                      ${imagePreview 
                        ? 'border-indigo-500 bg-indigo-50/30' 
                        : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'
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
                          <ImageIcon className="size-7 text-indigo-600" strokeWidth={1.5} />
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCreate}
                  disabled={!projectName || !selectedImage}
                  className={`
                    px-5 py-2.5 rounded-xl font-semibold transition-all
                    ${projectName && selectedImage
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }
                  `}
                  type="button"
                >
                  Create Project
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
