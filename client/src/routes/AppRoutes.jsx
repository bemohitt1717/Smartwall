import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../features/home/landing/Landing.jsx";
import Dashboard from "../features/dashboard/Dashboard.jsx";
import Projects from "../features/dashboard/sections/projects/Projects.jsx";
import ColorsDashboard from "../features/dashboard/sections/colorDashboard/ColorsDashboard.jsx";
import Settings from "../features/dashboard/sections/settings/Settings.jsx";
import Editor from "../features/dashboard/sections/editor/Editor.jsx";
import Login from "../features/auth/Login.jsx";
import Colors from "../features/home/colors/Colors.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/colors" element={<Colors />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/colors-dashboard" element={<ColorsDashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
