import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  Droplet,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  X,
} from "lucide-react";

export default function BottomControlPanel() {
  const [expanded, setExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("color");
  const [selectedColor, setSelectedColor] = useState("#6366F1");
  const [selectedTexture, setSelectedTexture] = useState("matte");
  const [selectedFinish, setSelectedFinish] = useState("interior");

  const tabs = [
    { id: "color", label: "Color Picker", icon: Palette },
    { id: "texture", label: "Texture", icon: Droplet },
    { id: "finish", label: "Finish", icon: Sparkles },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : "64px",
        }}
        className="bg-white rounded-full shadow-2xl border-2 border-slate-300 overflow-hidden"
        style={{
          width: expanded ? "min(90vw, 800px)" : "auto",
        }}
      >
        {/* Collapsed State: Tab Pills */}
        {!expanded && (
          <div className="flex items-center gap-2 px-6 h-16">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setExpanded(true);
                  }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all font-semibold text-sm ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  type="button"
                >
                  <Icon className="size-4" strokeWidth={2.5} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </motion.button>
              );
            })}
            
            <div className="h-8 w-px bg-slate-300 mx-2" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpanded(true)}
              className="p-3 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              type="button"
            >
              <ChevronUp className="size-5" strokeWidth={2.5} />
            </motion.button>
          </div>
        )}

        {/* Expanded State: Full Panel */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6"
          >
            {/* Header with Tabs */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all font-semibold text-sm ${
                        activeTab === tab.id
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                      type="button"
                    >
                      <Icon className="size-4" strokeWidth={2.5} />
                      {tab.label}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setExpanded(false)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-600"
                type="button"
              >
                <ChevronDown className="size-5" strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              {activeTab === "color" && (
                <ColorPickerContent
                  key="color"
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
              )}
              {activeTab === "texture" && (
                <TextureContent
                  key="texture"
                  selectedTexture={selectedTexture}
                  setSelectedTexture={setSelectedTexture}
                />
              )}
              {activeTab === "finish" && (
                <FinishContent
                  key="finish"
                  selectedFinish={selectedFinish}
                  setSelectedFinish={setSelectedFinish}
                />
              )}
            </AnimatePresence>

            {/* Apply Button */}
            <div className="mt-6 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-8 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 transition-colors"
                type="button"
              >
                <Check className="size-5" strokeWidth={2.5} />
                Apply Changes
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function ColorPickerContent({ selectedColor, setSelectedColor }) {
  const recentColors = [
    "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6",
    "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {/* Color Preview */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
          Current Color
        </label>
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="size-16 rounded-2xl border-2 border-slate-300 cursor-pointer shadow-md"
            style={{ backgroundColor: selectedColor }}
          />
          <div>
            <p className="text-sm font-mono font-bold text-slate-900">{selectedColor}</p>
            <p className="text-xs text-slate-500">Click to pick</p>
          </div>
        </div>
      </div>

      {/* HEX Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
          HEX Code
        </label>
        <input
          type="text"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-sm font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      {/* RGB Inputs */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
          RGB Values
        </label>
        <div className="grid grid-cols-3 gap-2">
          {["R", "G", "B"].map((label) => (
            <input
              key={label}
              type="text"
              placeholder={label}
              className="w-full px-3 py-3 rounded-xl border-2 border-slate-300 bg-white text-sm font-semibold text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          ))}
        </div>
      </div>

      {/* Recent Colors - Full Width */}
      <div className="md:col-span-3">
        <label className="block text-xs font-bold text-slate-700 mb-3 uppercase tracking-wide">
          Recent Colors
        </label>
        <div className="flex flex-wrap gap-2">
          {recentColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedColor(color)}
              className="size-12 rounded-xl border-2 border-slate-300 hover:border-indigo-500 transition-all shadow-sm hover:shadow-md"
              style={{ backgroundColor: color }}
              type="button"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TextureContent({ selectedTexture, setSelectedTexture }) {
  const textures = [
    { id: "matte", label: "Matte", description: "Smooth, non-reflective finish" },
    { id: "satin", label: "Satin", description: "Subtle sheen, easy to clean" },
    { id: "gloss", label: "Gloss", description: "High shine, modern look" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {textures.map((texture) => (
        <motion.button
          key={texture.id}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedTexture(texture.id)}
          className={`p-6 rounded-2xl text-left transition-all border-2 ${
            selectedTexture === texture.id
              ? "bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-600/20"
              : "bg-white border-slate-300 hover:border-slate-400 shadow-sm"
          }`}
          type="button"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedTexture === texture.id
                  ? "border-indigo-600"
                  : "border-slate-300"
              }`}
            >
              {selectedTexture === texture.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5 rounded-full bg-indigo-600"
                />
              )}
            </div>
            <h4 className="text-base font-bold text-slate-900">{texture.label}</h4>
          </div>
          <p className="text-sm text-slate-600">{texture.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
}

function FinishContent({ selectedFinish, setSelectedFinish }) {
  const finishes = [
    { id: "interior", label: "Interior", description: "For indoor walls" },
    { id: "exterior", label: "Exterior", description: "Weather-resistant" },
    { id: "premium", label: "Premium", description: "Luxury quality" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {finishes.map((finish) => (
        <motion.button
          key={finish.id}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSelectedFinish(finish.id)}
          className={`p-6 rounded-2xl text-left transition-all border-2 ${
            selectedFinish === finish.id
              ? "bg-indigo-50 border-indigo-600 shadow-lg shadow-indigo-600/20"
              : "bg-white border-slate-300 hover:border-slate-400 shadow-sm"
          }`}
          type="button"
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedFinish === finish.id
                  ? "border-indigo-600"
                  : "border-slate-300"
              }`}
            >
              {selectedFinish === finish.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2.5 h-2.5 rounded-full bg-indigo-600"
                />
              )}
            </div>
            <h4 className="text-base font-bold text-slate-900">{finish.label}</h4>
          </div>
          <p className="text-sm text-slate-600">{finish.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
}
