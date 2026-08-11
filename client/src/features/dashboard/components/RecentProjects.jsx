import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Loader, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard.jsx";
import RenameDialog from "../sections/projects/components/RenameDialog.jsx";
import DeleteConfirmDialog from "../sections/projects/components/DeleteConfirmDialog.jsx";
import toast from "react-hot-toast";
import {
  getProjects,
  deleteProject,
  saveProject,
} from "../../../api/project.api.js";

const formatRelativeDate = (dateString) => {
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

export default function RecentProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects();
        setProjects(response.projects || []);
        setError(null);
      } catch (err) {
        console.error("Failed to load recent projects:", err);
        setError("Unable to load projects right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const recentProjects = projects.slice(0, 4);

  const [selectedProject, setSelectedProject] = useState(null);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [renameName, setRenameName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <section className="mt-16 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-slate-900"
          style={{ textWrap: "balance" }}
        >
          Recent Projects
        </h2>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/projects")}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:border-indigo-200 hover:bg-indigo-50/50 shadow-sm transition-colors duration-200"
          type="button"
        >
          View All
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </motion.button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Loader className="size-10 text-indigo-600 animate-spin" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-3 text-slate-600">
          <AlertCircle className="size-10 text-red-500" />
          <p>{error}</p>
        </div>
      ) : recentProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <p className="text-lg font-semibold text-slate-900">
            No recent projects yet
          </p>
          <p className="text-sm text-slate-600 max-w-sm">
            Projects created from the dashboard upload or editor will appear
            here once they are saved.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/editor")}
            className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            type="button"
          >
            Create First Project
          </motion.button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recentProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={{
                ...project,
                edited: formatRelativeDate(
                  project.updatedAt || project.createdAt,
                ),
              }}
              onEdit={(p) =>
                navigate("/editor", { state: { projectId: p._id } })
              }
              onRename={(p) => {
                setSelectedProject(p);
                setRenameName(p.name || "");
                setShowRenameDialog(true);
              }}
              onDelete={(p) => {
                setSelectedProject(p);
                setShowDeleteDialog(true);
              }}
            />
          ))}

          <RenameDialog
            show={showRenameDialog}
            currentName={renameName}
            isRenaming={isRenaming}
            onCancel={() => {
              setSelectedProject(null);
              setShowRenameDialog(false);
              setIsRenaming(false);
              setRenameName("");
            }}
            onConfirm={async (newName) => {
              if (!selectedProject) return;
              if (!newName || !newName.trim()) return;
              if (newName.trim() === selectedProject.name) {
                // no change
                setShowRenameDialog(false);
                setSelectedProject(null);
                setRenameName("");
                return;
              }

              try {
                setIsRenaming(true);
                const resp = await saveProject(selectedProject._id, {
                  name: newName.trim(),
                });
                setProjects((prev) =>
                  prev.map((x) =>
                    x._id === selectedProject._id ? resp.project : x,
                  ),
                );
                toast.success("Project renamed successfully");
                setShowRenameDialog(false);
                setSelectedProject(null);
                setRenameName("");
                setIsRenaming(false);
              } catch (err) {
                console.error("Rename failed", err);
                toast.error("Failed to rename project");
                setIsRenaming(false);
              }
            }}
          />

          <DeleteConfirmDialog
            show={showDeleteDialog}
            projectName={selectedProject?.name}
            isDeleting={isDeleting}
            onCancel={() => {
              setShowDeleteDialog(false);
              setSelectedProject(null);
              setIsDeleting(false);
            }}
            onConfirm={async () => {
              if (!selectedProject) return;
              try {
                setIsDeleting(true);
                await deleteProject(selectedProject._id);
                setProjects((prev) =>
                  prev.filter((x) => x._id !== selectedProject._id),
                );
                toast.success("Project deleted successfully");
                setShowDeleteDialog(false);
                setSelectedProject(null);
                setIsDeleting(false);
              } catch (err) {
                console.error("Delete failed", err);
                toast.error("Failed to delete project");
                setIsDeleting(false);
              }
            }}
          />
        </div>
      )}
    </section>
  );
}
