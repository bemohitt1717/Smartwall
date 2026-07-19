import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, heading, value, description }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)" }}
      className="flex flex-col justify-between rounded-3xl border-2 border-slate-200 bg-white p-7 shadow-sm transition-all"
      style={{
        willChange: 'transform'
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-semibold text-slate-600 tracking-tight">{heading}</span>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-indigo-600">
          <Icon className="size-5" strokeWidth={2} />
        </div>
      </div>
      <div>
        <h3 className="text-3xl font-bold tracking-tight text-slate-900 leading-none mb-2">
          {value}
        </h3>
        <p className="text-sm font-medium text-slate-600">
          {description}
        </p>
      </div>
    </motion.article>
  );
}
