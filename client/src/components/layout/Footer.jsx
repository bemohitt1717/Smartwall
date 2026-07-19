import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/icons/smartwall-logo.svg";

const navItems = [
  { label: "how it's work", href: "#work" },
  { label: "Visualizer", href: "#visualizer" },
  { label: "Find Your Color", href: "#colors" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the Colors page
  const isColorsPage = location.pathname === "/colors";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking a link
  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 pt-[12px] md:pt-[18px]">
      <div className="container">
        <div className="mx-auto flex w-max max-w-[calc(100vw-32px)] items-center justify-center gap-[8px] md:gap-[10px]">
          {/* MOBILE NAVBAR (md:hidden) */}
          <div className="relative h-[48px] min-w-[calc(100vw-180px)] md:hidden">
            {/* Mobile Expandable Capsule */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-0 top-0 origin-top rounded-[24px] border border-slate-200/80 bg-white/[0.96] shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                isColorsPage ? "h-[100px]" : "h-[236px]"
              } ${
                isMobileMenuOpen
                  ? "scale-y-100"
                  : isColorsPage
                    ? "scale-y-[0.48]"
                    : "scale-y-[0.2034]"
              }`}
            />

              {/* Top Row: Logo + SmartWall + Chevron (Always visible) */}
              <button
                onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                className="relative z-10 flex h-[48px] w-full flex-shrink-0 items-center gap-3 px-[6px] transition-colors duration-200 hover:bg-slate-50 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30"
                aria-label="Toggle menu"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
              >
                {/* Logo inside capsule */}
                <div className="flex h-[40px] w-[40px] flex-shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-[linear-gradient(135deg,rgba(84,100,209,0.14),rgba(255,255,255,0.95))] shadow-[0_6px_14px_rgba(15,23,42,0.06)]">
                  <Link to="/">
                    <img
                      src={logo}
                      alt="SmartWall"
                      className="h-[18px] w-[18px]"
                    />
                  </Link>
                </div>

                {/* SmartWall Text - Premium brand logo style */}
                <span className="absolute left-[52%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-0.5">
                  <span
                    className="text-[16px] font-black tracking-tight"
                    style={{
                      fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                      background: 'linear-gradient(135deg, #5464d1 0%, #8b5cf6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 1px 2px rgba(84, 100, 209, 0.15))',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Smart
                  </span>
                  <span
                    className="text-[16px] font-black tracking-tight"
                    style={{
                      fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                      background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 1px 2px rgba(99, 102, 241, 0.15))',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Wall
                  </span>
                </span>
              </button>

              {/* Expanded Content: Nav Links + Login (Shows when open) */}
              <nav
                id="mobile-navigation"
                aria-hidden={!isMobileMenuOpen}
                className={`absolute left-0 top-[48px] z-10 w-full px-2 pb-3 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  isMobileMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0"
                }`}
              >
                {/* Nav Links - Hidden on Colors page */}
                {!isColorsPage && (
                  <div className="mb-2 flex flex-col gap-1">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={handleLinkClick}
                        tabIndex={isMobileMenuOpen ? 0 : -1}
                        className="group relative flex items-center rounded-[14px] px-4 py-3 text-[13px] font-bold !text-slate-700 transition-all duration-200 hover:!text-[#5464d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30 active:scale-[0.985]"
                      >
                        <span className="absolute inset-0 rounded-[14px] bg-[linear-gradient(135deg,rgba(59,130,246,0.15),rgba(37,99,235,0.08))] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Login Button */}
                <Link
                  to="/login"
                  onClick={handleLinkClick}
                  tabIndex={isMobileMenuOpen ? 0 : -1}
                  className="group relative flex items-center justify-center overflow-hidden rounded-[14px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(84,100,209,0.12),rgba(255,255,255,0.95))] px-4 py-3 text-[13px] font-extrabold !text-slate-700 shadow-[0_8px_18px_rgba(84,100,209,0.08)] transition-all duration-200 hover:border-[#5464d1]/30 hover:!text-[#5464d1] hover:shadow-[0_8px_20px_rgba(84,100,209,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30 active:scale-[0.985]"
                >
                  <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.15)_50%,transparent_85%)] translate-x-[-140%] transition-transform duration-700 group-hover:translate-x-[140%]" />
                  <span className="relative z-10">Login</span>
                </Link>
              </nav>
          </div>

          {/* DESKTOP/TABLET NAVBAR (hidden md:flex) */}
          <div className="hidden md:flex items-center gap-[10px]">
            {/* Logo Island (Camera cutout style) */}
            <Link
              className="group flex h-[56px] w-[56px] flex-shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-[#5464d1]/25 hover:shadow-[0_12px_28px_rgba(84,100,209,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30"
              to="/"
              aria-label="SmartWall home"
            >
              <img
                src={logo}
                alt=""
                className="h-[22px] w-[22px] transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            {/* Main Navbar Capsule - Expands when scrolled, Shrinks on Colors page */}
            <div
              className={`relative flex h-[56px] items-center overflow-hidden rounded-full border border-slate-200/80 bg-white/80 px-[6px] py-[4px] shadow-[0_10px_24px_rgba(15,23,42,0.06)] backdrop-blur-xl transition-all duration-700 ease-out ${
                isColorsPage ? "w-auto" : ""
              }`}
            >
              <nav
                className="flex items-center justify-between w-full gap-[4px] transition-all duration-700"
                aria-label="Main navigation"
              >
                {/* Colors Page: SmartWall Text - Premium brand style */}
                {isColorsPage ? (
                  <div className="flex items-center px-[14px] py-[10px]">
                    <span className="flex items-center gap-0.5">
                      <span
                        className="text-[15px] font-black tracking-tight"
                        style={{
                          fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                          background: 'linear-gradient(135deg, #5464d1 0%, #8b5cf6 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 1px 2px rgba(84, 100, 209, 0.15))',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        Smart
                      </span>
                      <span
                        className="text-[15px] font-black tracking-tight"
                        style={{
                          fontFamily: '"SF Pro Display", "Inter", system-ui, sans-serif',
                          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 1px 2px rgba(99, 102, 241, 0.15))',
                          letterSpacing: '-0.02em'
                        }}
                      >
                        Wall
                      </span>
                    </span>
                  </div>
                ) : (
                  /* Regular Page: Nav Links - Move left when scrolled */
                  <div
                    className="flex items-center gap-[4px] transition-transform duration-700 ease-out"
                    style={{
                      transform: isScrolled
                        ? "translateX(-4px)"
                        : "translateX(0px)",
                    }}
                  >
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        className="group relative inline-flex flex-shrink-0 items-center whitespace-nowrap rounded-full px-[14px] py-[10px] text-[12px] font-bold !text-slate-600 transition-all duration-500 hover:!text-[#5464d1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30 active:scale-[0.98] active:translate-y-[1px]"
                        href={item.href}
                      >
                        <span className="absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(59,130,246,0.15),rgba(37,99,235,0.08))] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_12px_24px_rgba(59,130,246,0.15)]" />
                        <span className="relative z-10">{item.label}</span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Login Button - Slides in from right when scrolled */}
                <div
                  className="relative flex-shrink-0 transition-all duration-700 ease-out"
                  style={{
                    width: isScrolled ? "80px" : "0px",
                    opacity: isScrolled ? 1 : 0,
                    transform: isScrolled
                      ? "translateX(0px) scale(1)"
                      : "translateX(20px) scale(0.9)",
                    marginLeft: isScrolled ? "4px" : "0px",
                    pointerEvents: isScrolled ? "auto" : "none",
                  }}
                >
                  <Link
                    className="group inline-flex h-[38px] items-center justify-center overflow-hidden whitespace-nowrap rounded-full border border-slate-200/80 bg-[linear-gradient(135deg,rgba(84,100,209,0.12),rgba(255,255,255,0.95))] px-[18px] text-[12px] font-extrabold !text-slate-700 shadow-[0_8px_18px_rgba(84,100,209,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-[1px] hover:border-[#5464d1]/30 hover:!text-[#5464d1] hover:shadow-[0_8px_20px_rgba(84,100,209,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30 active:scale-[0.97] active:translate-y-[1px] before:absolute before:inset-0 before:translate-x-[-140%] before:bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.15)_50%,transparent_85%)] before:transition-transform before:duration-700 group-hover:before:translate-x-[140%] after:absolute after:inset-[1px] after:rounded-full after:border after:border-white/70 after:opacity-80"
                    to="/login"
                  >
                    <span className="relative z-10 transition-transform duration-200 group-hover:translate-x-[1px] group-active:translate-x-[0px]">
                      Login
                    </span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
