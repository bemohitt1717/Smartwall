import { Folder, Database, Download } from "lucide-react";
import StatCard from "./StatCard.jsx";

const stats = [
  {
    heading: "Projects",
    value: "12",
    description: "Room Designs",
    icon: Folder,
  },
  {
    heading: "Storage",
    value: "2.4 GB",
    description: "Used",
    icon: Database,
  },
  {
    heading: "Downloads",
    value: "86",
    description: "This Month",
    icon: Download,
  },
];

export default function StatsCards() {
  return (
    <section aria-label="Workspace statistics" className="mt-12 grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <StatCard
          key={stat.heading}
          heading={stat.heading}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
        />
      ))}
    </section>
  );
}
