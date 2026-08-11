import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MousePointer2,
  Pentagon,
  Paintbrush,
  Eraser,
} from "lucide-react";

/**
 * Tool Sidebar Component
 * Vertical toolbar for selecting editor modes
 */
export default function ToolSidebar({ mode, setMode }) {
  const [hoveredTool, setHoveredTool] = useState(null);

  const tools = [
    { id: "SELECT", icon: MousePointer2, label: "Select Tool (V)", shortcut: "V" },
    { id: "DRAW", icon: Pentagon, label: "Draw Polygon (P)", shortcut: "P" },
    { id: "divider", label: "divider" },
    { id: "BRUSH", icon: Paintbrush, label: "Brush Tool (B) - Coming Soon", disabled: true },
    { id: "ERASER", icon: Eraser, label: "Eraser Tool (E) - Coming Soon", disabled: true },
  ];

  return (
    <div className="w-[72px] bg-white flex flex-col items-center py-4 gap-1">
      {tools.map((tool) => {
        if (tool.id === "divider") {
          return (
            <div key={tool.id} className="w-10 h-px bg-slate-200 my-2" />
          );
        }

        const Icon = tool.icon;
        const isActive = mode === tool.id;
        const isDisabled = tool.disabled;

        return (
          <div
            key={tool.id}
            className="relative"
            onMouseEnter={() => !isDisabled && setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <motion.button
              whileHover={!isDisabled ? { scale: 1.05 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              onClick={() => !isDisabled && setMode(tool.id)}
              disabled={isDisabled}
              className={`
                relative size-14 rounded-xl flex items-center justify-center transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md"
                    : isDisabled
                    ? "text-slate-300 cursor-not-allowed"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }
              `}
              type="button"
            >
              <Icon className="size-5" strokeWidth={2} />
              
              {isActive && (
                <motion.div
                  layoutId="activeToolIndicator"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>

            <AnimatePresence>
              {hoveredTool === tool.id && (
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -4 }}
                  transition={{ duration: 0.12 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 pointer-events-none"
                >
                  <div className="bg-slate-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                    {tool.label}
                    {tool.shortcut && !isDisabled && (
                      <span className="ml-2 text-slate-400">({tool.shortcut})</span>
                    )}
                    <div className="absolute right-full top-1/2 -translate-y-1/2">
                      <div className="w-0 h-0 border-[5px] border-transparent border-r-slate-900" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
