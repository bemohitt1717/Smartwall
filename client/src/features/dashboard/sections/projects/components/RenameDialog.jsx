import { motion, AnimatePresence } from "framer-motion";
import { Edit3, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

/**
 * Rename Project Dialog
 * Clean, minimal design with autofocus input
 */
export default function RenameDialog({ show, currentName, onConfirm, onCancel, isRenaming }) {
  const [newName, setNewName] = useState(currentName);
  const inputRef = useRef(null);

  // Update local state when dialog opens with new project
  useEffect(() => {
    setNewName(currentName);
  }, [currentName, show]);

  // Autofocus input when dialog opens
  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 100);
    }
  }, [show]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = newName.trim();
    if (trimmed && trimmed !== currentName) {
      onConfirm(trimmed);
    } else {
      onCancel();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onCancel}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                mass: 0.8
              }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden"
            >
              <form onSubmit={handleSubmit}>
                {/* Header */}
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                      <Edit3 className="size-6 text-indigo-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-slate-900 mb-1">
                        Rename Project
                      </h3>
                      <p className="text-sm text-slate-600">
                        Enter a new name for your project
                      </p>
                    </div>
                    <button
                      onClick={onCancel}
                      disabled={isRenaming}
                      type="button"
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <X className="size-5" />
                    </button>
                  </div>
                </div>

                {/* Input Content */}
                <div className="p-6">
                  <label htmlFor="projectName" className="block text-sm font-semibold text-slate-700 mb-2">
                    Project Name
                  </label>
                  <input
                    ref={inputRef}
                    id="projectName"
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isRenaming}
                    className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="Enter project name..."
                    maxLength={100}
                  />
                  <p className="text-xs text-slate-500 mt-2">
                    {newName.length}/100 characters
                  </p>
                </div>

                {/* Actions */}
                <div className="p-6 pt-0 flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCancel}
                    disabled={isRenaming}
                    type="button"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isRenaming || !newName.trim() || newName.trim() === currentName}
                    type="submit"
                    className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isRenaming ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Renaming...
                      </>
                    ) : (
                      "Rename"
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
