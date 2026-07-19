import { motion, AnimatePresence } from "framer-motion";

export default function RecentColorsCapsule() {
  const recentColors = [
    "#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981", "#3B82F6",
    "#EF4444", "#A855F7", "#06B6D4", "#84CC16"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="absolute bottom-7 md:bottom-1 left-[130px] md:left-1/2 -translate-x-1/2 z-50 max-w-[60vw] md:max-w-[95vw]"
    >
      <div className="bg-white rounded-full shadow-2xl border-2 border-slate-300 px-4 md:px-6 py-3 md:py-4 flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide">
        <span className="hidden sm:block text-xs font-bold text-slate-700 uppercase tracking-wider flex-shrink-0">
          Recent Colors
        </span>
        <div className="hidden sm:block h-6 w-px bg-slate-300 flex-shrink-0" />
        <div className="flex gap-1.5 md:gap-2">
          {recentColors.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="size-5 md:size-10 rounded-lg md:rounded-xl border-2 border-slate-300 hover:border-indigo-500 transition-all shadow-sm hover:shadow-md flex-shrink-0"
              style={{ backgroundColor: color }}
              type="button"
              title={color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
