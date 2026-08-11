import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Eye,
  EyeOff,
  Save,
  Download,
  MoreHorizontal,
  ChevronDown,
  FileImage,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react";

/**
 * EditorToolbar
 * Top bar with undo/redo, zoom, compare, save and export — all wired to real props.
 */
export default function EditorToolbar({
  handleSaveProject,
  projectTitle = "Untitled Project",
  setProjectTitle,
  undo,
  redo,
  canUndo,
  canRedo,
  isCompareMode,
  setIsCompareMode,
  zoomLevel = 100,
  zoomIn,
  zoomOut,
  resetZoom,
  onExport,
  projectId,
}) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!handleSaveProject) return;
    setSaving(true);
    try {
      await handleSaveProject();
    } finally {
      setSaving(false);
    }
  };

  const handleExportFormat = async (format, quality = 1.0) => {
    setShowExportMenu(false);
    if (onExport) {
      await onExport(format, quality);
    }
  };

  return (
    <div className="h-14 border-b border-slate-200 bg-white flex items-center justify-between px-3 md:px-5 flex-shrink-0 z-10">
      {/* ── Left: Project Name ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle?.(e.target.value)}
          className="text-sm md:text-base font-semibold text-slate-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg px-2 py-1 -ml-2 truncate max-w-[120px] sm:max-w-[220px] md:max-w-none"
        />
      </div>

      {/* ── Centre: Controls — hidden on mobile ───────────────────────── */}
      <div className="hidden lg:flex items-center gap-1">
        {/* Undo / Redo */}
        <ToolbarButton
          icon={Undo2}
          label="Undo  (Ctrl+Z)"
          disabled={!canUndo}
          onClick={undo}
        />
        <ToolbarButton
          icon={Redo2}
          label="Redo  (Ctrl+Y)"
          disabled={!canRedo}
          onClick={redo}
        />

        <Divider />

        {/* Zoom */}
        <ToolbarButton icon={ZoomOut} label="Zoom Out" onClick={zoomOut} />
        <button
          onClick={resetZoom}
          className="min-w-[4.5rem] text-center text-sm font-semibold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg px-2 py-1.5 transition-colors"
          type="button"
          title="Reset zoom"
        >
          {zoomLevel}%
        </button>
        <ToolbarButton icon={ZoomIn} label="Zoom In" onClick={zoomIn} />
        <ToolbarButton
          icon={Maximize2}
          label="Reset Zoom"
          onClick={resetZoom}
        />

        <Divider />

        {/* Compare */}
        <ToolbarButton
          icon={isCompareMode ? EyeOff : Eye}
          label={isCompareMode ? "Hide original" : "Compare Before / After"}
          active={isCompareMode}
          onMouseDown={() => setIsCompareMode?.(true)}
          onMouseUp={() => setIsCompareMode?.(false)}
          onMouseLeave={() => setIsCompareMode?.(false)}
        />
      </div>

      {/* ── Right: Save & Export ──────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Mobile more menu */}
        <div className="lg:hidden relative">
          <ToolbarButton
            icon={MoreHorizontal}
            label="More options"
            onClick={() => setShowMobileMenu((v) => !v)}
          />

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
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <MobileMenuItem
                      icon={Undo2}
                      label="Undo"
                      disabled={!canUndo}
                      onClick={undo}
                    />
                    <MobileMenuItem
                      icon={Redo2}
                      label="Redo"
                      disabled={!canRedo}
                      onClick={redo}
                    />
                    <div className="h-px bg-slate-100 my-1" />
                    <MobileMenuItem
                      icon={ZoomOut}
                      label="Zoom Out"
                      onClick={zoomOut}
                    />
                    <div className="px-4 py-2 text-center">
                      <span className="text-sm font-semibold text-slate-700 block">
                        Zoom: {zoomLevel}%
                      </span>
                    </div>
                    <MobileMenuItem
                      icon={ZoomIn}
                      label="Zoom In"
                      onClick={zoomIn}
                    />
                    <div className="h-px bg-slate-100 my-1" />
                    <MobileMenuItem
                      icon={isCompareMode ? EyeOff : Eye}
                      label="Compare Before / After"
                      onClick={() => setIsCompareMode?.(!isCompareMode)}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Save */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving || !projectId}
          className="hidden sm:flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
          type="button"
          title={!projectId ? "Upload an image first" : "Save project"}
        >
          <Save className="size-4" strokeWidth={2} />
          <span className="hidden md:inline">
            {saving ? "Saving…" : "Save"}
          </span>
        </motion.button>

        {/* Export */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowExportMenu((v) => !v)}
            disabled={!projectId}
            className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 md:py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-sm"
            type="button"
            title={!projectId ? "Upload an image first" : "Export image"}
          >
            <Download className="size-4" strokeWidth={2} />
            <span className="hidden sm:inline">Export</span>
            <ChevronDown
              className={`size-4 hidden sm:block transition-transform duration-200 ${showExportMenu ? "rotate-180" : ""}`}
              strokeWidth={2}
            />
          </motion.button>

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
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute right-0 top-12 w-60 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Export Format
                    </p>
                  </div>
                  <div className="py-2">
                    <ExportMenuItem
                      icon={FileImage}
                      label="PNG"
                      description="Lossless, transparent background"
                      recommended
                      onClick={() => handleExportFormat("png")}
                    />
                    <ExportMenuItem
                      icon={ImageIcon}
                      label="JPG"
                      description="Smaller file, great for sharing"
                      onClick={() => handleExportFormat("jpg", 0.9)}
                    />
                    <ExportMenuItem
                      icon={FileImage}
                      label="WEBP"
                      description="Optimised for web"
                      onClick={() => handleExportFormat("webp", 0.9)}
                    />
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

// ─── Sub-components ────────────────────────────────────────────────────────────

function Divider() {
  return <div className="h-6 w-px bg-slate-200 mx-1" />;
}

function ToolbarButton({
  icon: Icon,
  label,
  disabled = false,
  active = false,
  onClick,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) {
  const [tip, setTip] = useState(false);

  return (
    <div className="relative">
      <motion.button
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        disabled={disabled}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={(...args) => {
          setTip(false);
          onMouseLeave?.(...args);
        }}
        onMouseEnter={() => setTip(true)}
        className={`p-2 rounded-xl transition-all ${
          active
            ? "bg-indigo-600 text-white shadow-sm"
            : disabled
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        }`}
        type="button"
      >
        <Icon className="size-4" strokeWidth={2} />
      </motion.button>

      <AnimatePresence>
        {tip && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 pointer-events-none"
          >
            {label}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenuItem({ icon: Icon, label, disabled = false, onClick }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
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

function ExportMenuItem({
  icon: Icon,
  label,
  description,
  recommended,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 w-full px-4 py-3 text-left hover:bg-indigo-50 group transition-colors"
      type="button"
    >
      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-indigo-100 transition-colors flex-shrink-0">
        <Icon
          className="size-4 text-slate-600 group-hover:text-indigo-600 transition-colors"
          strokeWidth={2}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="text-sm font-semibold text-slate-900">{label}</p>
          {recommended && (
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
              Best
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
    </button>
  );
}
