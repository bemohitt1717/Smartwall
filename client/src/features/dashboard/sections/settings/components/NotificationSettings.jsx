import { motion } from "framer-motion";

export default function NotificationSettings() {
  const notificationItems = [
    {
      title: "Project Updates",
      description: "Get notified when your projects are ready",
    },
    {
      title: "New Colors",
      description: "Alerts for new color releases",
    },
    {
      title: "Marketing",
      description: "Promotional offers and tips",
    },
    {
      title: "Account Activity",
      description: "Security alerts and account changes",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Notification Preferences
      </h2>

      <div className="space-y-6">
        {notificationItems.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600">
                {item.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={index < 2}
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
