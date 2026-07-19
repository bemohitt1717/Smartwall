import { motion } from "framer-motion";
import { MoreVertical, CheckCircle2, RefreshCw, PenTool } from "lucide-react";

export default function ProjectCard({ project }) {
  const getStatusIconAndStyle = (status) => {
    switch (status) {
      case "Completed":
        return {
          icon: CheckCircle2,
          style: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };
      case "In Progress":
        return {
          icon: RefreshCw,
          style: "bg-indigo-50 text-indigo-700 border-indigo-200",
        };
      default:
        return {
          icon: PenTool,
          style: "bg-slate-100 text-slate-700 border-slate-200",
        };
    }
  };

  const statusConfig = getStatusIconAndStyle(project.status);
  const StatusIcon = statusConfig.icon;

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
      style={{
        willChange: 'transform'
      }}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[1.5] overflow-hidden group">
        <img
          alt={project.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={project.image}
        />
        {/* Shadow Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* More Options Button */}
        <button
          aria-label={`More options for ${project.name}`}
          className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/95 backdrop-blur-sm text-slate-700 hover:text-slate-900 hover:bg-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
          type="button"
        >
          <MoreVertical className="size-4" strokeWidth={2.5} />
        </button>

        {/* Status Badge */}
        <div className="absolute left-4 top-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-xs font-bold tracking-wide ${statusConfig.style}`}
          >
            <StatusIcon className="size-3.5" strokeWidth={2.5} />
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-base font-bold tracking-tight text-slate-900 mb-2 leading-snug" style={{ textWrap: 'balance' }}>
            {project.name}
          </h3>
          <p className="text-sm text-slate-600 font-medium flex items-center gap-2">
            <span className="size-2 rounded-full bg-indigo-600" />
            {project.paintColor}
          </p>
        </div>

        <div className="pt-4 border-t-2 border-slate-100 flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">{project.edited}</span>
          <button className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
            Edit Paint
          </button>
        </div>
      </div>
    </motion.article>
  );
}
