import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, PenTool } from "lucide-react";
import ProjectMenu from "../sections/projects/components/ProjectMenu.jsx";

const getStatusIconAndStyle = (status) => {
  const normalized = String(status || "draft").toLowerCase();

  switch (normalized) {
    case "completed":
      return {
        icon: CheckCircle2,
        style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        label: "Completed",
      };
    case "processing":
      return {
        icon: RefreshCw,
        style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        label: "Processing",
      };
    case "draft":
    default:
      return {
        icon: PenTool,
        style: "bg-slate-100 text-slate-700 border-slate-200",
        label: "Draft",
      };
  }
};

const formatDateLabel = (dateString) => {
  if (!dateString) return "Just created";
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

export default function ProjectCard({ project, onRename, onDelete, onEdit }) {
  const statusConfig = getStatusIconAndStyle(project.status);
  const StatusIcon = statusConfig.icon;
  const imageUrl =
    project.editedImage?.url ||
    project.originalImage?.url ||
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=88";
  const subtitle = project.paintColor || "Room visualization project";
  const editedLabel =
    project.edited || formatDateLabel(project.updatedAt || project.createdAt);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        y: -4,
        boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
      }}
      className="overflow-hidden rounded-3xl border-2 border-slate-200 bg-white shadow-sm transition-colors w-full"
      style={{ willChange: "transform" }}
    >
      <div className="relative aspect-[1.5] overflow-hidden group">
        <img
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={imageUrl}
        />
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />

        <div className="absolute right-4 top-4">
          <ProjectMenu
            onRename={() => onRename && onRename(project)}
            onDelete={() => onDelete && onDelete(project)}
          />
        </div>

        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-xs font-bold tracking-wide ${statusConfig.style}`}
          >
            <StatusIcon className="size-3.5" strokeWidth={2.5} />
            {statusConfig.label}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3
            className="text-base font-bold tracking-tight text-slate-900 mb-2 leading-snug"
            style={{ textWrap: "balance" }}
          >
            {project.name}
          </h3>
          <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
            <span className="size-2 rounded-full bg-indigo-600" />
            {subtitle}
          </p>
        </div>

        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">{editedLabel}</span>
          <button
            onClick={() => (onEdit ? onEdit(project) : null)}
            className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
            type="button"
          >
            Edit Paint
          </button>
        </div>
      </div>
    </motion.article>
  );
}
