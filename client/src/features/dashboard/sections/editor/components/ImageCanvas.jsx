import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Layers } from "lucide-react";
import { uploadImage } from "../../../../../api/project.api.js";

/**
 * Main Image Canvas Container
 * Shows upload placeholder or canvas based on image availability
 */
export default function ImageCanvas({editor, selectedImage, processFile, onProjectCreated}) {
  
  return (
    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center p-4 md:p-8">
      <div className="w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          {selectedImage ? (
            <CanvasPlaceholder image={selectedImage} editor={editor}  />
          ) : (
            <UploadPlaceholder onImageSelect={processFile} onProjectCreated={onProjectCreated} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/**
 * Upload Placeholder Component
 * Handles image upload via drag-drop or file browser
 * Creates project on Cloudinary automatically
 */
function UploadPlaceholder({ onImageSelect, onProjectCreated }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Drag and drop handlers
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

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];

    if(!file) return;
    
    // Create project on Cloudinary and get projectId
    await handleImageUpload(file);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    
    // Create project on Cloudinary and get projectId
    await handleImageUpload(file);
    
    e.target.value = "";
  };

  /**
   * Upload image and create project
   * @param {File} file - Image file to upload
   */
  const handleImageUpload = async (file) => {
    try {
      setIsUploading(true);
      
      // First process file locally for preview
      onImageSelect(file);
      
      // Then upload to Cloudinary and create project
      const formdata = new FormData();
      formdata.append("image", file);
      
      const response = await uploadImage(formdata);
      
      // Notify Editor.jsx with the new projectId
      if (onProjectCreated) {
        onProjectCreated(response.project._id, response.project.name);
      }
      
      setIsUploading(false);
    } catch (error) {
      console.error("Project creation from Editor failed:", error);
      alert("Failed to create project. Please try again.");
      setIsUploading(false);
    }
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
          {isUploading ? "Uploading..." : isDragging ? "Drop to Upload" : "Upload Room Image"}
        </h3>
        <p className="text-slate-600 text-sm md:text-base text-center max-w-md mb-6">
          {isUploading
            ? "Creating your project on Cloudinary..."
            : isDragging
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
          onClick={() => fileInputRef.current.click()}
          disabled={isUploading}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
        >
          <input
            type="file"
            ref={fileInputRef}
            hidden
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          {isUploading ? "Uploading..." : "Browse Files"}
        </motion.button>

        {/* File Size Limit */}
        <p className="text-xs text-slate-500 mt-4">Maximum size: 10MB</p>
      </div>
    </motion.div>
  );
}

/**
 * Uploading State Component (Unused - kept for future)
 * Shows loading animation while preparing canvas
 */
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
        <Layers
          className="size-10 text-indigo-600 relative z-10"
          strokeWidth={1.5}
        />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Preparing Canvas...
      </h3>
      <p className="text-sm text-slate-600">Setting up your workspace</p>
    </motion.div>
  );
}

/**
 * Canvas Placeholder Component
 * Main editing canvas with zoom, pan, and tool support
 */
function CanvasPlaceholder({ image, editor }) {
  const {canvasRef, handleCanvasClick, handleMouseDown, handleMouseMove, handleMouseUp, zoomLevel, panOffset, mode, setSelectedWallId} = editor;
  const containerRef = useRef(null);

  /**
   * Get cursor style based on current editor mode
   */
  const getCursor = () => {
    if (mode === 'DRAW') return 'crosshair';
    return 'default';
  };

  /**
   * Handle clicks outside canvas
   * Deselects all walls when clicking on container background
   */
  const handleContainerClick = (e) => {
    // Check if click was on container, not on canvas
    if (e.target === containerRef.current) {
      // Deselect all walls (dots disappear)
      setSelectedWallId(null);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      onClick={handleContainerClick}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-5xl h-full max-h-[600px] bg-white rounded-2xl shadow-lg border border-slate-200 p-8 flex flex-col items-center justify-start relative overflow-hidden"
      style={{
        backgroundImage:
          "repeating-conic-gradient(#f8fafc 0% 25%, transparent 0% 50%) 50% / 20px 20px",
      }}
    >
      {/* Instructional Text */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="mb-6 text-center"
      >
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Your Room Canvas
        </h3>
        <p className="text-sm text-slate-600">
          {mode === 'DRAW' 
            ? 'Click to add points, close the shape to create a wall'
            : 'Select walls to edit colors and properties'}
        </p>
      </motion.div>

      {/* Image with Zoom & Pan */}
      <div className="flex-1 flex items-center justify-center w-full overflow-auto">
        <div 
          style={{
            transform: `scale(${zoomLevel / 100}) translate(${panOffset.x}px, ${panOffset.y}px)`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="max-w-full max-h-full object-contain rounded-xl"
            style={{ cursor: getCursor() }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Format Badge Component
 * Shows supported file format
 */
function FormatBadge({ format }) {
  return (
    <div className="px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200">
      <span className="text-xs font-semibold text-slate-700">{format}</span>
    </div>
  );
}
