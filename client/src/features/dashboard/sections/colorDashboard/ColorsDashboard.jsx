import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, Eye, Palette, Copy, Check } from "lucide-react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

const colorPalettes = [
  {
    id: 1,
    name: "Neutral Elegance",
    brand: "Sherwin-Williams",
    colors: ["#F5F1EA", "#E8DFD0", "#C9B8A0", "#A89378", "#8B7355"],
    favorites: 234,
    views: 1205,
  },
  {
    id: 2,
    name: "Ocean Breeze",
    brand: "Benjamin Moore",
    colors: ["#E8F4F8", "#B8D8E8", "#7FB8D8", "#4E98C8", "#2E78A8"],
    favorites: 189,
    views: 956,
  },
  {
    id: 3,
    name: "Forest Calm",
    brand: "Farrow & Ball",
    colors: ["#E8F0E8", "#C8D8C8", "#A8C0A8", "#88A888", "#689068"],
    favorites: 312,
    views: 1534,
  },
  {
    id: 4,
    name: "Sunset Warmth",
    brand: "Behr",
    colors: ["#FFF8F0", "#FFE8D0", "#FFD0A8", "#FFB878", "#FF9048"],
    favorites: 276,
    views: 1423,
  },
  {
    id: 5,
    name: "Modern Monochrome",
    brand: "Sherwin-Williams",
    colors: ["#F8F9FA", "#DEE2E6", "#ADB5BD", "#6C757D", "#343A40"],
    favorites: 445,
    views: 2134,
  },
  {
    id: 6,
    name: "Lavender Dreams",
    brand: "Benjamin Moore",
    colors: ["#F5F0FF", "#E8D8FF", "#D0B8FF", "#B898FF", "#9878E8"],
    favorites: 198,
    views: 1087,
  },
];

const recentColors = [
  { hex: "#6366F1", name: "Indigo Delight", brand: "Sherwin-Williams" },
  { hex: "#10B981", name: "Emerald Fresh", brand: "Benjamin Moore" },
  { hex: "#F59E0B", name: "Amber Glow", brand: "Behr" },
  { hex: "#EF4444", name: "Crimson Bold", brand: "Farrow & Ball" },
  { hex: "#8B5CF6", name: "Purple Haze", brand: "Sherwin-Williams" },
];

export default function ColorsDashboard() {
  const [copiedColor, setCopiedColor] = useState(null);

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 w-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Color Library
              </h1>
              <p className="text-slate-600">
                Explore and save your favorite paint colors
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by color name, brand, or hex code..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Recently Viewed */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-4">
                Recently Viewed
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {recentColors.map((color) => (
                  <motion.div
                    key={color.hex}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                  >
                    <div
                      className="h-24 rounded-xl mb-2 shadow-md ring-1 ring-slate-200 group-hover:ring-2 group-hover:ring-indigo-400 transition-all"
                      style={{ backgroundColor: color.hex }}
                    />
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {color.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {color.brand}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Color Palettes */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Popular Palettes
                </h2>
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colorPalettes.map((palette, index) => (
                  <motion.div
                    key={palette.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300"
                  >
                    {/* Color Swatches */}
                    <div className="flex h-32">
                      {palette.colors.map((color, idx) => (
                        <div
                          key={idx}
                          className="flex-1 cursor-pointer group/color relative"
                          style={{ backgroundColor: color }}
                          onClick={() => copyToClipboard(color)}
                        >
                          <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover/color:opacity-100 transition-opacity">
                              {copiedColor === color ? (
                                <Check
                                  className="size-5 text-white"
                                  strokeWidth={2.5}
                                />
                              ) : (
                                <Copy
                                  className="size-5 text-white"
                                  strokeWidth={2}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Palette Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-slate-900 mb-1">
                            {palette.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {palette.brand}
                          </p>
                        </div>
                        <button
                          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                          type="button"
                        >
                          <Heart className="size-5 text-slate-400 hover:text-red-500" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Heart className="size-3.5" />
                          {palette.favorites}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="size-3.5" />
                          {palette.views}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Color Picker Section */}
            <div className="mt-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-white shadow-md">
                  <Palette className="size-6 text-indigo-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Custom Color Picker
                  </h2>
                  <p className="text-slate-600">
                    Create your own perfect color palette
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                type="button"
              >
                Launch Color Picker
              </motion.button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
