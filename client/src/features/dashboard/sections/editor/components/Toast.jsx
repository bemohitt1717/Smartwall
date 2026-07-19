import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Upload, Palette, Download, AlertCircle } from "lucide-react";

export default function Toast({ message, type = "success", show, onClose }) {
  const icons = {
    success: Check,
    upload: Upload,
    color: Palette,
    export: Download,
    error: AlertCircle,
  };

  const colors = {
    success: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      icon: "bg-emerald-100 text-emerald-600",
      text: "text-emerald-900",
    },
    upload: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-100 text-blue-600",
      text: "text-blue-900",
    },
    color: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      icon: "bg-purple-100 text-purple-600",
      text: "text-purple-900",
    },
    export: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      icon: "bg-indigo-100 text-indigo-600",
      text: "text-indigo-900",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "bg-red-100 text-red-600",
      text: "text-red-900",
    },
  };

  const Icon = icons[type];
  const color = colors[type];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="fixed top-6 right-6 z-[100] max-w-sm"
        >
          <div
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-lg backdrop-blur-sm ${color.bg} ${color.border}`}
          >
            <div className={`p-2 rounded-lg ${color.icon}`}>
              <Icon className="size-5" strokeWidth={2.5} />
            </div>
            <p className={`text-sm font-semibold ${color.text} flex-1`}>{message}</p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className={`p-1 rounded-lg hover:bg-white/50 transition-colors ${color.text}`}
              type="button"
            >
              <X className="size-4" strokeWidth={2} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Toast Container for multiple toasts
export function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            message={toast.message}
            type={toast.type}
            show={true}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
