import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Grid3x3,
  List,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader as LoaderIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import ProjectMenu from "./components/ProjectMenu.jsx";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog.jsx";
import RenameDialog from "./components/RenameDialog.jsx";
import {
  getProjects,
  deleteProject,
  saveProject,
} from "../../../../api/project.api.js";
import toast from "react-hot-toast";

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
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameName, setRenameName] = useState("");
  const navigate = useNavigate();

  /**
   * Fetch projects from backend
   */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.projects || []);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setError("Failed to load projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openDeleteDialog = (project) => {
    setSelectedProject(project);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setSelectedProject(null);
    setShowDeleteDialog(false);
    setIsDeleting(false);
  };

  const confirmDeleteProject = async () => {
    if (!selectedProject) return;

    try {
      setIsDeleting(true);
      await deleteProject(selectedProject._id);
      setProjects((prev) => prev.filter((p) => p._id !== selectedProject._id));
      toast.success("Project deleted successfully");
      closeDeleteDialog();
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project");
      setIsDeleting(false);
    }
  };

  const openRenameDialog = (project) => {
    setSelectedProject(project);
    setRenameName(project.name || "");
    setShowRenameDialog(true);
  };

  const closeRenameDialog = () => {
    setSelectedProject(null);
    setRenameName("");
    setShowRenameDialog(false);
    setIsRenaming(false);
  };

  const confirmRenameProject = async (newName) => {
    if (!selectedProject || !newName.trim()) return;

    try {
      setIsRenaming(true);
      const response = await saveProject(selectedProject._id, {
        name: newName.trim(),
      });
      setProjects((prev) =>
        prev.map((project) =>
          project._id === selectedProject._id ? response.project : project,
        ),
      );
      toast.success("Project renamed successfully");
      closeRenameDialog();
    } catch (error) {
      console.error("Failed to rename project:", error);
      toast.error("Failed to rename project");
      setIsRenaming(false);
    }
  };

  /**
   * Open project in editor
   */
  const handleOpenProject = (projectId) => {
    navigate("/editor", {
      state: { projectId },
    });
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;

    return date.toLocaleDateString();
  };

  /**
   * Get project image URL (prefer edited, fallback to original)
   */
  const getProjectImage = (project) => {
    return (
      project.editedImage?.url ||
      project.originalImage?.url ||
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=88"
    );
  };

  /**
   * Filter projects by status and search query
   */
  const filteredProjects = projects.filter((project) => {
    const matchesStatus =
      filterStatus === "all" || project.status === filterStatus;
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <LoaderIcon className="size-12 text-indigo-600 animate-spin mx-auto mb-4" />
                  <p className="text-slate-600">Loading projects...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <AlertCircle className="size-12 text-red-600 mx-auto mb-4" />
                  <p className="text-slate-900 font-semibold mb-2">
                    Failed to load projects
                  </p>
                  <p className="text-slate-600">{error}</p>
                </div>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
                    <Plus className="size-10 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    No projects yet
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {searchQuery || filterStatus !== "all"
                      ? "No projects match your filters"
                      : "Create your first project to get started"}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/editor")}
                    className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                    type="button"
                  >
                    Create Project
                  </motion.button>
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOpenProject(project._id)}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={getProjectImage(project)}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <ProjectMenu
                          onRename={(e) => {
                            e?.stopPropagation?.();
                            openRenameDialog(project);
                          }}
                          onDelete={(e) => {
                            e?.stopPropagation?.();
                            openDeleteDialog(project);
                          }}
                        />
                      </div>
                      <div className="absolute top-3 left-3">
                        {(() => {
                          const StatusIcon =
                            statusConfig[project.status]?.icon || AlertCircle;
                          const statusStyle =
                            statusConfig[project.status]?.color ||
                            "text-slate-600 bg-slate-100";
                          const statusLabel =
                            statusConfig[project.status]?.label ||
                            project.status;
                          return (
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                            >
                              <StatusIcon className="size-3.5" />
                              {statusLabel}
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
                        {project.editorState?.walls?.length || 0} wall
                        {project.editorState?.walls?.length !== 1 ? "s" : ""}{" "}
                        painted
                      </p>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>ID: {project._id.slice(-6)}</span>
                        <span>{formatDate(project.updatedAt)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleOpenProject(project._id)}
                    className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer"
                  >
                    <img
                      src={getProjectImage(project)}
                      alt={project.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-slate-600 truncate">
                        {project.editorState?.walls?.length || 0} wall
                        {project.editorState?.walls?.length !== 1 ? "s" : ""}{" "}
                        painted
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {(() => {
                        const StatusIcon =
                          statusConfig[project.status]?.icon || AlertCircle;
                        const statusStyle =
                          statusConfig[project.status]?.color ||
                          "text-slate-600 bg-slate-100";
                        const statusLabel =
                          statusConfig[project.status]?.label || project.status;
                        return (
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusStyle}`}
                          >
                            <StatusIcon className="size-3.5" />
                            {statusLabel}
                          </span>
                        );
                      })()}
                      <span className="text-sm text-slate-500 hidden md:block">
                        {formatDate(project.updatedAt)}
                      </span>
                      <ProjectMenu
                        onRename={(e) => {
                          e?.stopPropagation?.();
                          openRenameDialog(project);
                        }}
                        onDelete={(e) => {
                          e?.stopPropagation?.();
                          openDeleteDialog(project);
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <DeleteConfirmDialog
        show={showDeleteDialog}
        projectName={selectedProject?.name}
        onConfirm={confirmDeleteProject}
        onCancel={closeDeleteDialog}
        isDeleting={isDeleting}
      />

      <RenameDialog
        show={showRenameDialog}
        currentName={renameName}
        onConfirm={confirmRenameProject}
        onCancel={closeRenameDialog}
        isRenaming={isRenaming}
      />
    </div>
  );
}
