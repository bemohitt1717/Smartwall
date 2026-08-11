import { motion } from "framer-motion";

export default function LanguageSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Language & Region
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Language
          </label>
          <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>English (US)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Timezone
          </label>
          <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>UTC (GMT+0:00)</option>
            <option>EST (GMT-5:00)</option>
            <option>PST (GMT-8:00)</option>
            <option>IST (GMT+5:30)</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
}
