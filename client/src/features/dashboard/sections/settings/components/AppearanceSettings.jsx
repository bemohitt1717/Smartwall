import { motion } from "framer-motion";

export default function AppearanceSettings() {
  const themes = ["Light", "Dark", "System"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Appearance
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Theme
          </label>
          <div className="grid grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme}
                className={`p-4 rounded-lg border-2 transition-all ${
                  theme === "Light"
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
                type="button"
              >
                <div className="text-sm font-semibold text-slate-900">
                  {theme}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
