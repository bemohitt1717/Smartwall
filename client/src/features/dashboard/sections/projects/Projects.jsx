import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Grid3x3,
  List,
  Plus,
  MoreVertical,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";

const projects = [
  {
    id: 1,
    name: "Scandinavian Living Room",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=88",
    color: "Sherwin-Williams Alabaster",
    rooms: 3,
    lastEdited: "2 hours ago",
  },
  {
    id: 2,
    name: "Minimalist Master Bedroom",
    status: "in-progress",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=88",
    color: "Benjamin Moore Indigo Breeze",
    rooms: 1,
    lastEdited: "Yesterday",
  },
  {
    id: 3,
    name: "Modern Kitchen Design",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=88",
    color: "Farrow & Ball Sage Green",
    rooms: 2,
    lastEdited: "3 days ago",
  },
  {
    id: 4,
    name: "Architect's Home Office",
    status: "completed",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=88",
    color: "Sherwin-Williams Iron Ore",
    rooms: 1,
    lastEdited: "1 week ago",
  },
  {
    id: 5,
    name: "Cozy Family Room",
    status: "in-progress",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=88",
    color: "Benjamin Moore Simply White",
    rooms: 2,
    lastEdited: "2 days ago",
  },
  {
    id: 6,
    name: "Luxury Master Suite",
    status: "draft",
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=900&q=88",
    color: "Behr Cotton Grey",
    rooms: 3,
    lastEdited: "5 days ago",
  },
];

const statusConfig = {
  completed: {
    label: "Completed",
    color: "text-emerald-600 bg-emerald-50",
    icon: CheckCircle,
  },
  "in-progress": {
    label: "In Progress",
    color: "text-blue-600 bg-blue-50",
    icon: Clock,
  },
  draft: {
    label: "Draft",
    color: "text-slate-600 bg-slate-100",
    icon: AlertCircle,
  },
};

export default function Projects() {
  const [viewMode, setViewMode] = useState("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  const filteredProjects =
    filterStatus === "all"
      ? projects
      : projects.filter((p) => p.status === filterStatus);

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
                Projects
              </h1>
              <p className="text-slate-600">
                Manage all your room visualization projects in one place
              </p>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="in-progress">In Progress</option>
                  <option value="draft">Draft</option>
                </select>

                {/* View Toggle */}
                <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    type="button"
                  >
                    <Grid3x3 className="size-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    type="button"
                  >
                    <List className="size-5" />
                  </button>
                </div>

                {/* New Project Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/editor")}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                  type="button"
                >
                  <Plus className="size-5" />
                  <span className="hidden sm:inline">New Project</span>
                </motion.button>
              </div>
            </div>

            {/* Projects Grid/List */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <button
                          className="p-2 rounded-lg bg-white/90 backdrop-blur-sm hover:bg-white transition-colors"
                          type="button"
                        >
                          <MoreVertical className="size-4 text-slate-600" />
                        </button>
                      </div>
                      <div className="absolute top-3 left-3">
                        {(() => {
                          const StatusIcon = statusConfig[project.status].icon;
                          return (
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[project.status].color}`}
                            >
                              <StatusIcon className="size-3.5" />
                              {statusConfig[project.status].label}
                            </span>
                          );
                        })()}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 mb-1 line-clamp-1">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-1">
                        {project.color}
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {project.rooms}{" "}
                          {project.rooms === 1 ? "room" : "rooms"}
                        </span>
                        <span>{project.lastEdited}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {project.color}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {(() => {
                        const StatusIcon = statusConfig[project.status].icon;
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[project.status].color}`}
                          >
                            <StatusIcon className="size-3.5" />
                            {statusConfig[project.status].label}
                          </span>
                        );
                      })()}
                      <span className="text-sm text-slate-500 hidden md:block">
                        {project.lastEdited}
                      </span>
                      <button
                        className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        type="button"
                      >
                        <MoreVertical className="size-4 text-slate-600" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
