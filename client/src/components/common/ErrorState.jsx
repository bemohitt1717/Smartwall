import { motion } from "framer-motion";
import { AlertTriangle, CornerDownLeft } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred.",
  onRetry,
  onBack,
  backLabel = "Go back",
  retryLabel = "Retry",
}) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200 shadow-md p-8 text-center">
        <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
          <AlertTriangle className="size-6 text-red-600" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 mb-6">{message}</p>

        <div className="flex items-center justify-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              <CornerDownLeft className="size-4" />
              {backLabel}
            </button>
          )}

          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            >
              {retryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
