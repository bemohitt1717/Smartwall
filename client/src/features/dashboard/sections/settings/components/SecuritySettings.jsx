import { motion } from "framer-motion";

export default function SecuritySettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Security Settings
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-slate-600">
                Add an extra layer of security
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors" type="button">
              Enable
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
