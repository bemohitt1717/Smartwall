import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  Pentagon,
  Palette,
  Undo2,
  Redo2,
  Eye,
  RotateCcw,
  ChevronUp,
} from "lucide-react";

/**
 * Mobile Floating Toolbar
 * Bottom-centered capsule with essential editing tools
 * Expands to show color picker and opacity
 */
export default function MobileToolbar({ editor }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    mode,
    setMode,
    previewColor,
    setPreviewColor,
    previewOpacity,
    setPreviewOpacity,
    applyColor,
    isPolygonClosed,
    undo,
    redo,
    canUndo,
    canRedo,
    isCompareMode,
    setIsCompareMode,
    resetAll,
  } = editor;

  return (
    <>
      {/* Backdrop when expanded */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Toolbar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden"
      >
        <div className="relative">
          {/* Expanded Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[280px] bg-white rounded-2xl shadow-2xl border border-slate-200 p-4"
              >
                {/* Color Picker */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Palette className="size-4 text-slate-600" strokeWidth={2} />
                    <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                      Color
                    </h3>
                  </div>

                  {/* Color Preview + Picker */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-slate-200 shadow-sm"
                      style={{ backgroundColor: previewColor }}
                    />
                    <div className="flex-1">
                      <input
                        type="color"
                        value={previewColor}
                        onChange={(e) => setPreviewColor(e.target.value)}
                        className="w-full h-10 rounded-lg border border-slate-200 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* HEX Value */}
                  <input
                    type="text"
                    value={previewColor}
                    onChange={(e) => setPreviewColor(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="#6366F1"
                  />

                  {/* Opacity Slider */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-600">Opacity</span>
                      <span className="text-xs font-semibold text-slate-900">{previewOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={previewOpacity}
                      onChange={(e) => setPreviewOpacity(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Apply Button */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      applyColor();
                      setIsExpanded(false);
                    }}
                    disabled={!isPolygonClosed}
                    className="w-full py-2.5 rounded-lg font-semibold text-sm text-white disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                    style={{
                      backgroundColor: isPolygonClosed ? previewColor : undefined,
                    }}
                  >
                    Apply Color
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Capsule */}
          <div className="bg-white rounded-full shadow-2xl border border-slate-200 px-2 py-2 flex items-center gap-1">
            {/* Tool Mode Buttons */}
            <ToolButton
              icon={MousePointer2}
              active={mode === "SELECT"}
              onClick={() => setMode("SELECT")}
              label="Select"
            />
            <ToolButton
              icon={Pentagon}
              active={mode === "DRAW"}
              onClick={() => setMode("DRAW")}
              label="Draw"
            />

            <div className="w-px h-8 bg-slate-200" />

            {/* Undo/Redo */}
            <ToolButton
              icon={Undo2}
              onClick={undo}
              disabled={!canUndo}
              label="Undo"
            />
            <ToolButton
              icon={Redo2}
              onClick={redo}
              disabled={!canRedo}
              label="Redo"
            />

            <div className="w-px h-8 bg-slate-200" />

            {/* Color Picker Toggle */}
            <ToolButton
              icon={Palette}
              active={isExpanded}
              onClick={() => setIsExpanded(!isExpanded)}
              label="Color"
            />

            {/* Compare */}
            <ToolButton
              icon={Eye}
              active={isCompareMode}
              onMouseDown={() => setIsCompareMode(true)}
              onMouseUp={() => setIsCompareMode(false)}
              onMouseLeave={() => setIsCompareMode(false)}
              onTouchStart={() => setIsCompareMode(true)}
              onTouchEnd={() => setIsCompareMode(false)}
              label="Compare"
            />

            {/* Reset */}
            <ToolButton
              icon={RotateCcw}
              onClick={() => {
                if (window.confirm("Reset all changes?")) {
                  resetAll();
                }
              }}
              label="Reset"
              danger
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

/**
 * Individual Tool Button
 */
function ToolButton({ icon: Icon, active, disabled, onClick, onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd, label, danger }) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      disabled={disabled}
      className={`p-3 rounded-full transition-all ${
        active
          ? "bg-indigo-600 text-white shadow-md"
          : disabled
          ? "text-slate-300 cursor-not-allowed"
          : danger
          ? "text-red-600 hover:bg-red-50"
          : "text-slate-600 hover:bg-slate-100"
      }`}
      title={label}
      type="button"
    >
      <Icon className="size-5" strokeWidth={2} />
    </motion.button>
  );
}
