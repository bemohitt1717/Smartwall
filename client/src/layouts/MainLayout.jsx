import Navbar from "../components/layout/Navbar.jsx";
import Footer from "../components/layout/Footer.jsx";

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
