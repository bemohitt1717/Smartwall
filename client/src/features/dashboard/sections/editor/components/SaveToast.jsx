import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

/**
 * Save Toast Notification
 * Minimal, centered, matches UI design system
 * Responsive for mobile and desktop
 */
export default function SaveToast({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30,
            mass: 0.5
          }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
        >
          <div className="bg-slate-900 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 border border-slate-700">
            {/* Check Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.1, 
                type: "spring", 
                stiffness: 600,
                damping: 20
              }}
              className="flex-shrink-0"
            >
              <Check className="size-4" strokeWidth={2.5} />
            </motion.div>
            
            {/* Text */}
            <p className="text-sm font-medium">Saved</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
