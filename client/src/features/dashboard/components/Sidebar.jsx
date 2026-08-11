import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  Palette,
  Settings,
  LogOut,
  Menu,
  X,
  SquarePen,
} from "lucide-react";
import { useAuth } from "../../../context/authContext.jsx";
import logo from "../../../assets/icons/smartwall-logo.svg";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  { id: "editor", label: "editor", icon: SquarePen, path: "/editor" },
  { id: "projects", label: "Projects", icon: FolderKanban, path: "/projects" },
  { id: "colors", label: "Colors", icon: Palette, path: "/colors-dashboard" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const getActiveItem = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/colors-dashboard") return "colors";
    if (path === "/projects") return "projects";
    if (path === "/settings") return "settings";
    if (path === "/editor") return "editor";
    const found = menuItems.find((item) => item.path === path);
    return found ? found.id : "dashboard";
  };

  const activeItem = getActiveItem();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
    navigate("/login");
    setShowLogoutModal(false);
    setMobileOpen(false);
  };

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 left-4 z-50 flex md:hidden items-center justify-center size-12 rounded-xl bg-white border-2 border-slate-200 text-slate-800 shadow-md hover:shadow-lg transition-shadow"
        type="button"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop & Mobile */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 md:w-72 bg-white border-r-2 border-slate-200 flex flex-col shadow-md
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b-2 border-slate-200">
          <Link
            to="/dashboard"
            onClick={handleNavClick}
            className="flex items-center gap-3 select-none group"
          >
            <div className="relative flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-2 shadow-md transition-transform duration-200 group-hover:scale-105">
              <img
                alt="SmartWall"
                className="w-full h-full object-contain"
                src={logo}
              />
            </div>
            <span className="text-xl font-bold text-slate-900">SmartWall</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-5 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavClick}
                className="relative group"
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative
                    ${
                      isActive
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }
                  `}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    className="size-5 flex-shrink-0"
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span
                    className={`text-sm font-medium ${isActive ? "font-semibold" : ""}`}
                  >
                    {item.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="px-5 py-5 border-t-2 border-slate-200">
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
            type="button"
          >
            <LogOut className="size-5" strokeWidth={1.5} />
            <span className="text-sm font-medium">Logout</span>
          </motion.button>
        </div>
      </aside>

      {/* Spacer for desktop layout */}
      <div className="hidden md:block w-72" />

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowLogoutModal(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                    <LogOut className="size-6 text-red-600" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      Confirm Logout
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Are you sure you want to logout? Any unsaved changes will
                      be lost.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-800 font-medium hover:bg-slate-50 transition-colors"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmLogout}
                    className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
