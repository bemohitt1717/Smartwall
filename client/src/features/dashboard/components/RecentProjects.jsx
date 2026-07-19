import ProjectCard from "./ProjectCard.jsx";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Scandinavian Living Room",
    paintColor: "Sherwin-Williams Alabaster",
    edited: "Edited 2h ago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=88",
  },
  {
    name: "Minimalist Master Bedroom",
    paintColor: "Benjamin Moore Indigo Breeze",
    edited: "Edited yesterday",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=88",
  },
  {
    name: "Modern Culinary Kitchen",
    paintColor: "Farrow & Ball Sage Green",
    edited: "Edited 3 days ago",
    status: "Draft",
    image: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?auto=format&fit=crop&w=900&q=88",
  },
  {
    name: "Architect's Home Office",
    paintColor: "Sherwin-Williams Iron Ore",
    edited: "Edited 1 week ago",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=88",
  },
];

export default function RecentProjects() {
  return (
    <section className="mt-16 pb-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-[-0.02em] text-slate-900" style={{ textWrap: 'balance' }}>
          Recent Projects
        </h2>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:border-indigo-200 hover:bg-indigo-50/50 shadow-sm transition-colors duration-200"
          type="button"
        >
          View All
          <ArrowUpRight className="size-4" strokeWidth={2.5} />
        </motion.button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
