import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Square,
  Palette,
  Check,
  Droplet,
  Sparkles,
  MousePointer2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function PropertiesPanel({ onRecentColorsToggle }) {
  const [selectedWall, setSelectedWall] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#6366F1");
  const [selectedTexture, setSelectedTexture] = useState("matte");
  const [selectedFinish, setSelectedFinish] = useState("interior");
  
  // Dropdown states - all can be open at once
  const [colorOpen, setColorOpen] = useState(true);
  const [textureOpen, setTextureOpen] = useState(false);
  const [finishOpen, setFinishOpen] = useState(false);
  
  // Recent colors capsule toggle
  const [showRecentColors, setShowRecentColors] = useState(false);

  return (
    <div className="w-full lg:w-80 h-full bg-white lg:border-l-2 border-slate-300 flex flex-col">
      {/* Header - Hide on mobile (shown in modal header) */}
      <div className="hidden lg:block p-6 border-b-2 border-slate-200 flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-900">Properties</h2>
      </div>

      {/* Scrollable Content - Hidden Scrollbar */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide p-6 space-y-4">
        {/* Selected Wall - Always Visible */}
        <div className="bg-slate-50/50 rounded-2xl p-4 border-2 border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-indigo-50">
              <Square className="size-4 text-indigo-600" strokeWidth={2} />
            </div>
            <h3 className="text-sm font-semibold text-slate-900">Selected Wall</h3>
          </div>
          
          {!selectedWall ? (
            <div className="text-center py-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 mb-3">
                <MousePointer2 className="size-6 text-slate-400" strokeWidth={1.5} />
              </div>
              <p className="text-sm text-slate-500 mb-1">No wall selected yet</p>
              <p className="text-xs text-slate-400">
                Click a wall inside the canvas to begin editing
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {selectedWall.name}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                  <p className="text-xs text-slate-500">Area</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {selectedWall.area} sq ft
                  </p>
                </div>
                <div className="px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <p className="text-xs text-emerald-600">Status</p>
                  <p className="text-sm font-semibold text-emerald-700">
                    {selectedWall.status}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Color Picker Dropdown */}
        <CollapsibleSection
          icon={Palette}
          title="Color Picker"
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
          isOpen={colorOpen}
          onToggle={() => setColorOpen(!colorOpen)}
        >
          <div className="space-y-4 pt-2">
            {/* Color Preview */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="size-16 rounded-xl border-2 border-slate-300 cursor-pointer shadow-sm"
                style={{ backgroundColor: selectedColor }}
              />
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Current Color</p>
                <p className="text-sm font-mono font-semibold text-slate-900">
                  {selectedColor}
                </p>
              </div>
            </div>

            {/* HEX Input */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                HEX
              </label>
              <input
                type="text"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* RGB Inputs */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-2">
                RGB
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["R", "G", "B"].map((label) => (
                  <div key={label}>
                    <input
                      type="text"
                      placeholder={label}
                      className="w-full px-3 py-2 rounded-lg border-2 border-slate-300 bg-white text-sm text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Texture Dropdown */}
        <CollapsibleSection
          icon={Droplet}
          title="Texture"
          iconColor="text-cyan-600"
          iconBg="bg-cyan-50"
          isOpen={textureOpen}
          onToggle={() => setTextureOpen(!textureOpen)}
        >
          <div className="space-y-2 pt-2">
            {["matte", "satin", "gloss"].map((texture) => (
              <TextureOption
                key={texture}
                label={texture.charAt(0).toUpperCase() + texture.slice(1)}
                selected={selectedTexture === texture}
                onClick={() => setSelectedTexture(texture)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Finish Dropdown */}
        <CollapsibleSection
          icon={Sparkles}
          title="Finish"
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          isOpen={finishOpen}
          onToggle={() => setFinishOpen(!finishOpen)}
        >
          <div className="space-y-2 pt-2">
            {["interior", "exterior", "premium"].map((finish) => (
              <TextureOption
                key={finish}
                label={finish.charAt(0).toUpperCase() + finish.slice(1)}
                selected={selectedFinish === finish}
                onClick={() => setSelectedFinish(finish)}
              />
            ))}
          </div>
        </CollapsibleSection>

        {/* Recent Colors Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setShowRecentColors(!showRecentColors);
            if (onRecentColorsToggle) {
              onRecentColorsToggle(!showRecentColors);
            }
          }}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all border-2 ${
            showRecentColors
              ? "bg-indigo-50 border-indigo-600 text-indigo-700"
              : "bg-white border-slate-300 text-slate-700 hover:border-slate-400"
          }`}
          type="button"
        >
          <Palette className="size-5" strokeWidth={2.5} />
          {showRecentColors ? "Hide Recent Colors" : "Show Recent Colors"}
        </motion.button>

        {/* Apply Button */}
        <motion.button
          whileHover={selectedWall ? { scale: 1.02, y: -2 } : {}}
          whileTap={selectedWall ? { scale: 0.98 } : {}}
          disabled={!selectedWall}
          className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
            selectedWall
              ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
          type="button"
        >
          <Check className="size-5" strokeWidth={2.5} />
          Apply Color
        </motion.button>
      </div>

      {/* Bottom Actions */}
      <div className="p-6 border-t-2 border-slate-200 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
          type="button"
        >
          Reset Changes
        </motion.button>
      </div>
    </div>
  );
}

function CollapsibleSection({ icon: Icon, title, children, iconColor, iconBg, isOpen, onToggle }) {
  return (
    <div className="bg-slate-50/50 rounded-2xl border-2 border-slate-200 overflow-hidden">
      <motion.button
        whileHover={{ backgroundColor: "rgb(248 250 252)" }}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
        type="button"
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${iconBg}`}>
            <Icon className={`size-4 ${iconColor}`} strokeWidth={2} />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="size-5 text-slate-600" strokeWidth={2} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TextureOption({ label, selected, onClick }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
        selected
          ? "bg-indigo-50 border-2 border-indigo-500 text-indigo-700"
          : "bg-white border-2 border-slate-300 text-slate-700 hover:border-slate-400"
      }`}
      type="button"
    >
      <div
        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
          selected ? "border-indigo-500" : "border-slate-300"
        }`}
      >
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 rounded-full bg-indigo-500"
          />
        )}
      </div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
}

