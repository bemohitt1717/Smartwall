import { motion } from "framer-motion";
import { Heart, Clock, Sparkles } from "lucide-react";

const recentColors = [
  "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981",
  "#3B82F6", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16",
];

const favoriteColors = [
  "#1E293B", "#475569", "#64748B", "#94A3B8", "#CBD5E1",
  "#F8FAFC", "#FEF3C7", "#FED7AA", "#FECACA", "#E0E7FF",
];

const suggestedColors = [
  "#312E81", "#4C1D95", "#86198F", "#9F1239", "#92400E",
  "#065F46", "#164E63", "#1E3A8A", "#7C2D12", "#713F12",
];

export default function BottomColorPalette() {
  return (
    <div className="h-48 bg-white border-t border-slate-200 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Tabs */}
        <div className="flex items-center gap-6 px-6 pt-4 pb-3 border-b border-slate-100">
          <ColorTab icon={Clock} label="Recent" active />
          <ColorTab icon={Heart} label="Favorites" />
          <ColorTab icon={Sparkles} label="Suggested" />
        </div>

        {/* Color Grid - Scrollable */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden">
          <div className="flex items-center gap-3 px-6 py-4 h-full">
            {recentColors.map((color, index) => (
              <ColorChip key={index} color={color} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorTab({ icon: Icon, label, active = false }) {
  return (
    <button
      className={`flex items-center gap-2 text-sm font-medium transition-colors relative pb-2 ${
        active
          ? "text-indigo-600"
          : "text-slate-500 hover:text-slate-900"
      }`}
      type="button"
    >
      <Icon className="size-4" strokeWidth={2} />
      {label}
      {active && (
        <motion.div
          layoutId="activeColorTab"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />
      )}
    </button>
  );
}

function ColorChip({ color }) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex-shrink-0"
      type="button"
    >
      <div
        className="size-16 rounded-4xl shadow-md ring-2 ring-slate-200 group-hover:ring-indigo-400 transition-all cursor-pointer"
        style={{ backgroundColor: color }}
      />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-slate-900 text-white text-xs font-mono px-2 py-1 rounded-md whitespace-nowrap">
          {color}
        </div>
      </div>
    </motion.button>
  );
}
