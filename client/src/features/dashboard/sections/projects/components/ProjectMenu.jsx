import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Edit3, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

/**
 * Project Dropdown Menu
 * Three-dot menu with Rename and Delete options
 */
export default function ProjectMenu({ onRename, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRename = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    onRename();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsOpen(false);
    onDelete();
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Three-dot button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200/50 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm transition-all duration-200"
        type="button"
        title="More options"
      >
        <MoreVertical className="size-4" strokeWidth={2} />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-10"
          >
            {/* Rename Option */}
            <button
              onClick={handleRename}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              type="button"
            >
              <Edit3 className="size-4 text-indigo-600" strokeWidth={2} />
              <span>Rename</span>
            </button>

            {/* Divider */}
            <div className="h-px bg-slate-100" />

            {/* Delete Option */}
            <button
              onClick={handleDelete}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              type="button"
            >
              <Trash2 className="size-4" strokeWidth={2} />
              <span>Delete</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
