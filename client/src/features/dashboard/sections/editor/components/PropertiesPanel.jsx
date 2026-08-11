import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Check,
  MousePointer2,
  RotateCcw,
  Pipette,
  Layers,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  Square,
  Check as CheckIcon,
  X,
} from "lucide-react";

// ─── Utility helpers ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const clean = (hex || "#000000").replace("#", "");
  if (clean.length !== 6) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  const clamp = (v) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    "#" +
    [clamp(r), clamp(g), clamp(b)]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PropertiesPanel({ editor }) {
  const {
    walls = [],
    draftWall = null,
    selectedWallId = null,
    previewColor = "#6366F1",
    setPreviewColor,
    previewOpacity = 25,
    setPreviewOpacity,
    applyColor,
    resetAll,
    selectWall,
    deleteWall,
    renameWall,
  } = editor || {};

  // All walls including draft
  const allWalls = draftWall ? [draftWall, ...walls] : walls;

  // Derive currently selected wall
  const selectedWall =
    walls.find((w) => w.id === selectedWallId) ||
    (draftWall?.id === selectedWallId ? draftWall : null);

  const canApply = !!selectedWallId;

  // ─── Hex input state ─────────────────────────────────────────────────────
  const [hexInput, setHexInput] = useState(previewColor);
  const [hexFocused, setHexFocused] = useState(false);
  const displayHex = hexFocused ? hexInput : previewColor;
  const rgb = hexToRgb(previewColor);

  // ─── Walls section expand state ──────────────────────────────────────────
  const [wallsOpen, setWallsOpen] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pendingDeleteWallName, setPendingDeleteWallName] = useState("");

  // ─── Inline rename state ─────────────────────────────────────────────────
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  // ─── Handlers ────────────────────────────────────────────────────────────

  const handleNativePicker = useCallback(
    (e) => {
      setHexInput(e.target.value);
      setPreviewColor?.(e.target.value);
    },
    [setPreviewColor],
  );

  const handleHexChange = useCallback(
    (raw) => {
      const val = "#" + raw.replace("#", "");
      setHexInput(val);
      if (/^#[0-9a-fA-F]{6}$/.test(val)) setPreviewColor?.(val);
    },
    [setPreviewColor],
  );

  const handleHexBlur = useCallback(() => {
    setHexFocused(false);
    if (!/^#[0-9a-fA-F]{6}$/.test(hexInput)) setHexInput(previewColor);
  }, [hexInput, previewColor]);

  const handleRgbChange = useCallback(
    (channel, rawVal) => {
      const num = parseInt(rawVal, 10);
      if (isNaN(num)) return;
      const clamped = Math.max(0, Math.min(255, num));
      const next = {
        r: channel === "r" ? clamped : rgb.r,
        g: channel === "g" ? clamped : rgb.g,
        b: channel === "b" ? clamped : rgb.b,
      };
      const hex = rgbToHex(next.r, next.g, next.b);
      setHexInput(hex);
      setPreviewColor?.(hex);
    },
    [rgb, setPreviewColor],
  );

  const handleApply = useCallback(() => applyColor?.(), [applyColor]);

  const handleReset = useCallback(() => {
    setShowResetConfirm(true);
  }, []);

  const confirmReset = useCallback(() => {
    resetAll?.();
    setShowResetConfirm(false);
  }, [resetAll]);

  const cancelReset = useCallback(() => {
    setShowResetConfirm(false);
  }, []);

  const handleSelectWall = useCallback(
    (wallId) => {
      if (renamingId) return; // don't switch while renaming
      selectWall?.(wallId);
    },
    [selectWall, renamingId],
  );

  const startRename = useCallback((wall, e) => {
    e.stopPropagation();
    setRenamingId(wall.id);
    setRenameValue(wall.name);
  }, []);

  const commitRename = useCallback(
    (wallId) => {
      const trimmed = renameValue.trim();
      if (trimmed) renameWall?.(wallId, trimmed);
      setRenamingId(null);
    },
    [renameValue, renameWall],
  );

  const handleDelete = useCallback((e, wallName) => {
    e.stopPropagation();
    setPendingDeleteWallName(wallName || "this wall");
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    deleteWall?.();
    setShowDeleteConfirm(false);
  }, [deleteWall]);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  return (
    /* Width bump: w-96 on lg screens (384px) instead of w-80 */
    <div className="w-full lg:w-96 h-full bg-white lg:border-l-2 border-slate-200 flex flex-col">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="hidden lg:flex items-center gap-3 px-6 py-4 border-b border-slate-100 flex-shrink-0">
        <div className="p-2 rounded-xl bg-indigo-50">
          <Layers className="size-4 text-indigo-600" strokeWidth={2} />
        </div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Properties
        </h2>
      </div>

      {/* ── Scrollable body ──────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide p-4 space-y-3">
        {/* ══ Walls List Section ════════════════════════════════════════════ */}
        <div className="rounded-2xl border-2 border-slate-200 overflow-hidden">
          {/* Section Header */}
          <button
            onClick={() => setWallsOpen((o) => !o)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
            type="button"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-indigo-50">
                <Square className="size-3.5 text-indigo-600" strokeWidth={2} />
              </div>
              <span className="text-sm font-semibold text-slate-800">
                Walls
                {allWalls.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                    {allWalls.length}
                  </span>
                )}
              </span>
            </div>
            <motion.div
              animate={{ rotate: wallsOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="size-4 text-slate-400" strokeWidth={2} />
            </motion.div>
          </button>

          {/* Wall Items */}
          <AnimatePresence initial={false}>
            {wallsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                {allWalls.length === 0 ? (
                  /* Empty state */
                  <div className="px-4 py-6 text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 mb-2">
                      <MousePointer2
                        className="size-5 text-slate-400"
                        strokeWidth={1.5}
                      />
                    </div>
                    <p className="text-sm text-slate-500 mb-0.5">
                      No walls yet
                    </p>
                    <p className="text-xs text-slate-400">
                      Draw a polygon on the canvas to create a wall
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {allWalls.map((wall) => {
                      const isSelected = wall.id === selectedWallId;
                      const isRenaming = renamingId === wall.id;

                      return (
                        <motion.div
                          key={wall.id}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          onClick={() => handleSelectWall(wall.id)}
                          className={`group flex items-center gap-3 px-4 py-3 cursor-pointer transition-all ${
                            isSelected
                              ? "bg-indigo-50 border-l-4 border-indigo-500"
                              : "hover:bg-slate-50 border-l-4 border-transparent"
                          }`}
                        >
                          {/* Color dot */}
                          <div
                            className="w-5 h-5 rounded-full border-2 border-white shadow-md flex-shrink-0"
                            style={{ backgroundColor: wall.color || "#6366F1" }}
                          />

                          {/* Name / Rename input */}
                          <div className="flex-1 min-w-0">
                            {isRenaming ? (
                              <input
                                autoFocus
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") commitRename(wall.id);
                                  if (e.key === "Escape") setRenamingId(null);
                                }}
                                onBlur={() => commitRename(wall.id)}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full px-2 py-1 text-sm font-medium border-2 border-indigo-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white"
                              />
                            ) : (
                              <div>
                                <p
                                  className={`text-sm font-semibold truncate ${
                                    isSelected
                                      ? "text-indigo-800"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {wall.name}
                                </p>
                                {wall.isDraft && (
                                  <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wide">
                                    draft
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Action buttons — visible on selected or row hover */}
                          <div
                            className={`flex items-center gap-1 flex-shrink-0 transition-opacity duration-150 ${
                              isSelected
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                            }`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {isRenaming ? (
                              <>
                                <button
                                  onClick={() => commitRename(wall.id)}
                                  className="p-1.5 rounded-lg bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition-colors"
                                  type="button"
                                  title="Save name"
                                >
                                  <CheckIcon
                                    className="size-3"
                                    strokeWidth={3}
                                  />
                                </button>
                                <button
                                  onClick={() => setRenamingId(null)}
                                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
                                  type="button"
                                  title="Cancel"
                                >
                                  <X className="size-3" strokeWidth={3} />
                                </button>
                              </>
                            ) : (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => startRename(wall, e)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
                                  type="button"
                                  title="Rename wall"
                                >
                                  <Pencil
                                    className="size-3.5"
                                    strokeWidth={2}
                                  />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => {
                                    // Select this wall first then delete
                                    selectWall?.(wall.id);
                                    handleDelete(e, wall.name);
                                  }}
                                  className="p-1.5 rounded-lg text-slate-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                                  type="button"
                                  title="Delete wall"
                                >
                                  <Trash2
                                    className="size-3.5"
                                    strokeWidth={2}
                                  />
                                </motion.button>
                              </>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ══ Color Picker (always open, not collapsible) ═══════════════════ */}
        <div className="rounded-2xl border-2 border-slate-200 overflow-hidden">
          {/* Section header — label only, no toggle */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-slate-50 border-b border-slate-100">
            <div className="p-1.5 rounded-lg bg-purple-50">
              <Palette className="size-3.5 text-purple-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">
              Color Picker
            </h3>
          </div>

          <div className="px-4 pb-4 pt-3 space-y-4">
            {/* Native picker swatch + info */}
            <div className="flex items-center gap-3">
              {/* Swatch wrapping native input */}
              <div className="relative flex-shrink-0">
                <div
                  className="size-16 rounded-2xl border-2 border-slate-300 shadow-md cursor-pointer overflow-hidden transition-transform hover:scale-105"
                  style={{ backgroundColor: previewColor }}
                >
                  <input
                    type="color"
                    value={previewColor}
                    onChange={handleNativePicker}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    title="Pick a colour"
                  />
                </div>
                {/* Pipette badge */}
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-slate-200 shadow-sm pointer-events-none">
                  <Pipette className="size-2.5 text-slate-500" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-slate-400 mb-0.5 font-medium uppercase tracking-wide">
                  Current Colour
                </p>
                <p className="text-base font-mono font-bold text-slate-900 truncate">
                  {previewColor.toUpperCase()}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Click swatch to open picker
                </p>
              </div>
            </div>

            {/* HEX Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                HEX
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-mono select-none">
                  #
                </span>
                <input
                  type="text"
                  value={displayHex.replace("#", "")}
                  onChange={(e) => handleHexChange(e.target.value)}
                  onFocus={() => {
                    setHexFocused(true);
                    setHexInput(previewColor);
                  }}
                  onBlur={handleHexBlur}
                  maxLength={6}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all uppercase"
                  placeholder="6366F1"
                />
              </div>
            </div>

            {/* RGB Inputs */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                RGB
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    key: "r",
                    label: "R",
                    value: rgb.r,
                    ring: "focus:ring-red-400 focus:border-red-400",
                  },
                  {
                    key: "g",
                    label: "G",
                    value: rgb.g,
                    ring: "focus:ring-green-400 focus:border-green-400",
                  },
                  {
                    key: "b",
                    label: "B",
                    value: rgb.b,
                    ring: "focus:ring-blue-400 focus:border-blue-400",
                  },
                ].map(({ key, label, value, ring }) => (
                  <div key={key} className="relative">
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-400 uppercase">
                      {label}
                    </span>
                    <input
                      type="number"
                      min="0"
                      max="255"
                      value={value}
                      onChange={(e) => handleRgbChange(key, e.target.value)}
                      className={`w-full px-2 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-mono text-center focus:outline-none focus:ring-2 ${ring} transition-all`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Opacity
                </label>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                  {previewOpacity}%
                </span>
              </div>
              <div className="relative h-4 flex items-center">
                <div
                  className="absolute inset-0 rounded-full border border-slate-200"
                  style={{
                    background: `linear-gradient(to right, transparent, ${previewColor})`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={previewOpacity}
                  onChange={(e) => setPreviewOpacity?.(Number(e.target.value))}
                  className="relative w-full h-4 appearance-none bg-transparent cursor-pointer opacity-slider"
                />
              </div>
            </div>

            {/* Preset palette */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                Quick Colours
              </label>
              <div className="grid grid-cols-8 gap-1.5">
                {PRESET_COLORS.map((c) => (
                  <motion.button
                    key={c}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setPreviewColor?.(c);
                      setHexInput(c);
                    }}
                    className={`size-8 rounded-lg border-2 transition-all shadow-sm ${
                      previewColor.toLowerCase() === c.toLowerCase()
                        ? "border-indigo-500 ring-2 ring-indigo-300 ring-offset-1"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                    style={{ backgroundColor: c }}
                    type="button"
                    title={c}
                  />
                ))}
              </div>
            </div>

            {/* Apply Color */}
            <motion.button
              whileHover={canApply ? { scale: 1.02, y: -1 } : {}}
              whileTap={canApply ? { scale: 0.98 } : {}}
              disabled={!canApply}
              onClick={handleApply}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${
                canApply
                  ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              type="button"
            >
              <Check className="size-4" strokeWidth={2.5} />
              {canApply ? "Apply Color" : "Select a wall first"}
            </motion.button>

            {/* Reset */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border-2 border-red-200 bg-red-50 text-red-600 font-semibold hover:bg-red-100 hover:border-red-300 transition-all text-sm"
              type="button"
            >
              <RotateCcw className="size-4" strokeWidth={2.5} />
              Reset All Changes
            </motion.button>
          </div>
        </div>
      </div>

      {/* Reset confirmation dialog */}
      <AnimatePresence>
        {showResetConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={cancelReset}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="pointer-events-auto w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                      <RotateCcw
                        className="size-5 text-red-600"
                        strokeWidth={2.5}
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Reset Wall Changes
                      </h3>
                      <p className="text-sm text-slate-500">
                        This will clear any wall edits in the current room. You
                        can’t undo this action.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-700">
                    Are you sure you want to reset all wall changes?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={cancelReset}
                      type="button"
                      className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmReset}
                      type="button"
                      className="flex-1 rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
                    >
                      Reset Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Delete confirmation dialog */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={cancelDelete}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: "spring", stiffness: 360, damping: 24 }}
                className="pointer-events-auto w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden"
              >
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                      <Trash2 className="size-5 text-red-600" strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900">
                        Delete Wall
                      </h3>
                      <p className="text-sm text-slate-500">
                        This will permanently delete the selected wall from the
                        canvas.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <p className="text-sm text-slate-700">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                      {pendingDeleteWallName}
                    </span>
                    ?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={cancelDelete}
                      type="button"
                      className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      type="button"
                      className="flex-1 rounded-2xl bg-red-600 px-4 py-3 font-semibold text-white hover:bg-red-700 transition-colors"
                    >
                      Delete Wall
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Preset palette ───────────────────────────────────────────────────────────

const PRESET_COLORS = [
  "#6366F1",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#1E293B",
  "#64748B",
  "#CBD5E1",
  "#FEF3C7",
  "#FED7AA",
  "#FECACA",
  "#E0E7FF",
];
