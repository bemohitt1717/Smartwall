import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Settings as SettingsIcon, LogOut, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=88";

const pageInfo = {
  "/dashboard": { title: "Dashboard", subtitle: "Welcome back, Mohit" },
  "/projects": { title: "Projects", subtitle: "Manage your visualizations" },
  "/colors-dashboard": { title: "Colors", subtitle: "Explore paint colors" },
  "/settings": { title: "Settings", subtitle: "Account preferences" },
  "/editor": { title: "Editor", subtitle: "Design your perfect space" },
};

export default function Topbar() {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = pageInfo[location.pathname] || pageInfo["/dashboard"];

  const notifications = [
    { id: 1, text: "Your visualization is ready", time: "2m ago", unread: true },
    { id: 2, text: "New color palette available", time: "1h ago", unread: true },
    { id: 3, text: "Project shared with you", time: "3h ago", unread: false },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-2 border-slate-200 bg-white px-4 sm:px-6 md:px-10 shadow-sm">
      {/* Page Title (visible on desktop) */}
      <div className="hidden md:block">
        <h1 className="text-xl font-bold text-slate-900">{currentPage.title}</h1>
        <p className="text-sm text-slate-600 mt-0.5">{currentPage.subtitle}</p>
      </div>

      {/* Mobile: Just show a simple title */}
      <div className="md:hidden flex-1 ml-14">
        <h1 className="text-lg font-semibold text-slate-900">{currentPage.title}</h1>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="size-5.5" strokeWidth={2} />
            {notifications.filter(n => n.unread).length > 0 && (
              <span className="absolute top-2 right-2 size-2 rounded-full bg-indigo-600 ring-2 ring-white" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setShowNotifications(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-xl border-2 border-slate-200 overflow-hidden z-50"
                >
                  <div className="px-4 py-3 border-b-2 border-slate-200 bg-slate-50">
                    <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3.5 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-100 last:border-0 ${
                          notification.unread ? "bg-indigo-50/50" : ""
                        }`}
                      >
                        <p className="text-sm text-slate-900 leading-relaxed">{notification.text}</p>
                        <span className="text-xs text-slate-600 mt-1.5 block">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t-2 border-slate-200 bg-slate-50">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 hover:bg-slate-100 rounded-xl px-2.5 py-2 transition-colors"
            type="button"
          >
            <img
              alt="Profile"
              className="size-9 rounded-full object-cover ring-2 ring-slate-200"
              src={avatarUrl}
            />
            <span className="text-sm font-semibold text-slate-900 hidden sm:block">Mohit</span>
            <ChevronDown
              className={`size-4 text-slate-700 hidden sm:block transition-transform ${
                showProfile ? "rotate-180" : ""
              }`}
              strokeWidth={2.5}
            />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfile && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setShowProfile(false)}
                  className="fixed inset-0 z-40"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border-2 border-slate-200 overflow-hidden z-50"
                >
      <div className="px-4 py-3 border-b-2 border-slate-200">
        <p className="font-semibold text-slate-900">Mohit Sharma</p>
        <p className="text-sm text-slate-600 mt-0.5">mohit@smartwall.com</p>
      </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/settings");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      type="button"
                    >
                      <User className="size-4.5" strokeWidth={1.8} />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/settings");
                      }}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      type="button"
                    >
                      <SettingsIcon className="size-4.5" strokeWidth={1.8} />
                      Settings
                    </button>
                  </div>
                  <div className="border-t-2 border-slate-200 py-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-700 hover:bg-red-50 transition-colors font-medium"
                      type="button"
                    >
                      <LogOut className="size-4.5" strokeWidth={1.8} />
                      Logout
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
