import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "../features/home/landing/Landing.jsx";
import Dashboard from "../features/dashboard/Dashboard.jsx";
import Projects from "../features/dashboard/sections/projects/Projects.jsx";
import ColorsDashboard from "../features/dashboard/sections/colorDashboard/ColorsDashboard.jsx";
import Settings from "../features/dashboard/sections/settings/Settings.jsx";
import Editor from "../features/dashboard/sections/editor/Editor.jsx";
import Login from "../features/auth/Login.jsx";
import Colors from "../features/home/colors/Colors.jsx";
import ProtectedRoute from "./protectedRoutes.jsx";
import { AuthProvider } from "../context/authContext.jsx";
import NotFound from "../components/common/NotFound.jsx";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/colors-dashboard" element={<ColorsDashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Editor - Allow both guest and authenticated users */}
          <Route path="/editor" element={<Editor />} />
          {/* Catch-all 404 route (must be last) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
