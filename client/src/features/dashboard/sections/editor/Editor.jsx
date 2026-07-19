import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import EditorToolbar from "./components/EditorToolbar.jsx";
import ToolSidebar from "./components/ToolSidebar.jsx";
import CanvasWorkspace from "./components/CanvasWorkspace.jsx";
import PropertiesPanel from "./components/PropertiesPanel.jsx";
import RecentColorsCapsule from "./components/RecentColorsCapsule.jsx";

export default function Editor() {
  const [showRecentColors, setShowRecentColors] = useState(false);
  const [showMobileProperties, setShowMobileProperties] = useState(false);

  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">
      {/* Dashboard Sidebar - Darker border */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden border-l-2 border-slate-300">
        {/* Dashboard Topbar - Darker border */}
        <Topbar />

        {/* Editor Workspace - NO SCROLL */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Toolbar - Darker border */}
          <EditorToolbar />

          {/* Main Editor Area - NO SCROLL */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left Tool Panel - Hidden on mobile, darker border */}
            <div className="hidden md:block border-r-2 border-slate-300">
              <ToolSidebar />
            </div>

            {/* Canvas Workspace - Centered, NO SCROLL */}
            <div className="flex-1 relative overflow-hidden">
              <CanvasWorkspace />
              
              {/* Bottom Recent Colors Capsule - Conditionally Rendered with Animation */}
              <AnimatePresence>
                {showRecentColors && <RecentColorsCapsule />}
              </AnimatePresence>

              {/* Mobile Properties Button - Fixed Bottom Right */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileProperties(true)}
                className="lg:hidden fixed bottom-6 right-6 p-4 rounded-full bg-indigo-600 text-white shadow-2xl z-40"
                type="button"
              >
                <Menu className="size-6" />
              </motion.button>
            </div>

            {/* Right Properties Panel - Desktop Only */}
            <div className="hidden lg:block">
              <PropertiesPanel onRecentColorsToggle={setShowRecentColors} />
            </div>

            {/* Mobile Properties Modal */}
            <AnimatePresence>
              {showMobileProperties && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowMobileProperties(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
                  />
                  
                  {/* Sliding Panel */}
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden"
                  >
                    {/* Mobile Header */}
                    <div className="flex items-center justify-between p-4 border-b-2 border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900">Properties</h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMobileProperties(false)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        type="button"
                      >
                        <X className="size-5" />
                      </motion.button>
                    </div>
                    
                    {/* Mobile Properties Content */}
                    <div className="h-[calc(100%-4rem)] overflow-hidden">
                      <PropertiesPanel onRecentColorsToggle={setShowRecentColors} />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
