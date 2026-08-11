import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

export default function BillingSettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Billing & Subscription
      </h2>

      <div className="space-y-6">
        <div className="p-6 rounded-xl border border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Current Plan
              </h3>
              <p className="text-sm text-slate-600">
                Free Plan - No active subscription
              </p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors" type="button">
              Upgrade
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Payment Methods
          </label>
          <div className="p-4 rounded-lg border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100">
                <CreditCard className="size-5 text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">
                  No payment method added
                </p>
              </div>
            </div>
            <button className="text-sm text-indigo-600 font-semibold hover:text-indigo-700" type="button">
              Add Card
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
