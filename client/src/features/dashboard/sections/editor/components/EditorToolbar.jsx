import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Eye,
  Save,
  Download,
  MoreHorizontal,
  ChevronDown,
  FileImage,
  Image as ImageIcon,
  Check,
} from "lucide-react";

export default function EditorToolbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  return (
    <div className="h-16 border-b-2 border-slate-300 bg-white flex items-center justify-between px-4 md:px-6">
      {/* Left: Project Name */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
        <input
          type="text"
          defaultValue="Untitled Project"
          className="text-base md:text-lg font-semibold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 md:px-3 py-1 -ml-2 md:-ml-3 truncate max-w-[120px] sm:max-w-none"
        />
      </div>

      {/* Center: Main Actions - Hidden on mobile */}
      <div className="hidden lg:flex items-center gap-2">
        <ToolbarButton icon={Undo2} label="Undo" disabled />
        <ToolbarButton icon={Redo2} label="Redo" disabled />
        
        <div className="h-6 w-px bg-slate-300 mx-2" />
        
        <ToolbarButton icon={ZoomOut} label="Zoom Out" />
        <span className="text-sm font-medium text-slate-700 min-w-[4rem] text-center">
          100%
        </span>
        <ToolbarButton icon={ZoomIn} label="Zoom In" />
        
        <div className="h-6 w-px bg-slate-300 mx-2" />
        
        <ToolbarButton icon={Eye} label="Compare Before/After" />
      </div>

      {/* Right: Save & Export */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile: More Menu */}
        <div className="lg:hidden relative">
          <ToolbarButton 
            icon={MoreHorizontal} 
            label="More" 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          />
          
          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {showMobileMenu && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileMenu(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <MobileMenuItem icon={Undo2} label="Undo" disabled />
                    <MobileMenuItem icon={Redo2} label="Redo" disabled />
                    <div className="h-px bg-slate-200 my-2" />
                    <MobileMenuItem icon={ZoomOut} label="Zoom Out" />
                    <div className="px-4 py-2">
                      <span className="text-sm font-medium text-slate-700">Zoom: 100%</span>
                    </div>
                    <MobileMenuItem icon={ZoomIn} label="Zoom In" />
                    <div className="h-px bg-slate-200 my-2" />
                    <MobileMenuItem icon={Eye} label="Compare Before/After" />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
        
        {/* Desktop: Full Buttons */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
          type="button"
        >
          <Save className="size-4" strokeWidth={2} />
          <span className="hidden md:inline">Save</span>
        </motion.button>
        
        {/* Export Button with Dropdown */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors text-sm"
            type="button"
          >
            <Download className="size-4" strokeWidth={2} />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown className={`size-4 hidden sm:block transition-transform ${showExportMenu ? 'rotate-180' : ''}`} strokeWidth={2} />
          </motion.button>

          {/* Export Dropdown Menu */}
          <AnimatePresence>
            {showExportMenu && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowExportMenu(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Export Format
                      </p>
                    </div>
                    <div className="py-2">
                      <ExportMenuItem 
                        icon={FileImage} 
                        label="PNG" 
                        description="Lossless quality, transparent background"
                        format="PNG"
                        recommended
                      />
                      <ExportMenuItem 
                        icon={ImageIcon} 
                        label="JPG" 
                        description="Smaller size, good for sharing"
                        format="JPG"
                      />
                      <ExportMenuItem 
                        icon={FileImage} 
                        label="WEBP" 
                        description="Optimized for web, modern browsers"
                        format="WEBP"
                      />
                    </div>
                    <div className="h-px bg-slate-200" />
                    <div className="px-4 py-3">
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            defaultChecked
                            className="peer sr-only"
                          />
                          <div className="w-9 h-5 bg-slate-200 rounded-full peer-checked:bg-indigo-600 transition-colors" />
                          <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4 shadow-sm" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">High Quality Export</span>
                      </label>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon: Icon, label, disabled = false, className = "", onClick }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2.5 rounded-xl transition-all ${
          disabled
            ? "text-slate-300 cursor-not-allowed bg-slate-50/50"
            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
        } ${className}`}
        type="button"
      >
        <Icon className="size-5" strokeWidth={2} />
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 pointer-events-none"
          >
            {label}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenuItem({ icon: Icon, label, disabled = false }) {
  return (
    <button
      disabled={disabled}
      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
        disabled
          ? "text-slate-400 cursor-not-allowed"
          : "text-slate-700 hover:bg-slate-50"
      }`}
      type="button"
    >
      <Icon className="size-4" strokeWidth={1.5} />
      {label}
    </button>
  );
}

function ExportMenuItem({ icon: Icon, label, description, format, recommended }) {
  return (
    <button
      className="flex items-start gap-3 w-full px-4 py-3 text-left transition-all hover:bg-indigo-50 group"
      type="button"
    >
      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-indigo-100 transition-colors">
        <Icon className="size-4 text-slate-600 group-hover:text-indigo-600 transition-colors" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {recommended && (
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
              Best
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <span className="text-xs font-mono font-semibold text-slate-400 mt-0.5">.{format.toLowerCase()}</span>
    </button>
  );
}
