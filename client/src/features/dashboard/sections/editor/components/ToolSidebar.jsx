import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Square,
  Paintbrush,
  Pipette,
  Eye,
  RotateCcw,
} from "lucide-react";

const tools = [
  { id: "upload", icon: Upload, label: "Upload Image" },
  { id: "select", icon: Square, label: "Select Wall" },
  { id: "brush", icon: Paintbrush, label: "Brush Tool" },
  { id: "picker", icon: Pipette, label: "Color Picker" },
  { id: "compare", icon: Eye, label: "Compare" },
  { id: "reset", icon: RotateCcw, label: "Reset" },
];

export default function ToolSidebar() {
  const [activeTool, setActiveTool] = useState("upload");
  const [hoveredTool, setHoveredTool] = useState(null);

  return (
    <div className="w-16 bg-white border-r-2 border-slate-300 flex flex-col items-center py-6 gap-3">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isActive = activeTool === tool.id;

        return (
          <div
            key={tool.id}
            className="relative"
            onMouseEnter={() => setHoveredTool(tool.id)}
            onMouseLeave={() => setHoveredTool(null)}
          >
            <motion.button
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTool(tool.id)}
              className={`
                relative size-12 rounded-xl flex items-center justify-center transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:shadow-sm"
                }
              `}
              type="button"
            >
              <Icon className="size-5" strokeWidth={2} />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredTool === tool.id && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 pointer-events-none"
                >
                  <div className="bg-slate-900 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap">
                    {tool.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 -mr-px">
                      <div className="w-0 h-0 border-4 border-transparent border-r-slate-900" />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {/* Divider */}
      <div className="w-8 h-px bg-slate-300 my-2" />

      {/* Reset at bottom */}
    </div>
  );
}
