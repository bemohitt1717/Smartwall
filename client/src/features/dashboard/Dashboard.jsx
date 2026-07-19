import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import Greeting from "./components/Greeting.jsx";
import StatsCards from "./components/StatsCards.jsx";
import UploadCard from "./components/UploadCard.jsx";
import RecentProjects from "./components/RecentProjects.jsx";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - handles its own positioning */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Navigation Bar */}
        <Topbar />

        {/* Workspace Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-12 py-10 w-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            <Greeting />
            <UploadCard />
            <RecentProjects />
          </div>
        </main>
      </div>
    </div>
  );
}
