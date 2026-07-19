import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, UploadCloud } from "lucide-react";
import MobileScrollSteps from "./MobileScrollSteps.jsx";
import logo from "../../../../assets/icons/smartwall-logo.svg";

const palette = [
  {
    name: "Terracotta",
    wall: "#e05a47",
    bg: "rgba(224,90,71,0.12)",
    border: "rgba(224,90,71,0.55)",
    accent: "#c23f2d",
    text: "#5c160e",
  },
  {
    name: "Ochre",
    wall: "#f4b41a",
    bg: "rgba(244,180,26,0.12)",
    border: "rgba(244,180,26,0.55)",
    accent: "#e09d0b",
    text: "#5e3f02",
  },
  {
    name: "Teal",
    wall: "#14b8a6",
    bg: "rgba(20,184,166,0.12)",
    border: "rgba(20,184,166,0.55)",
    accent: "#0d9488",
    text: "#115e59",
  },
  {
    name: "Cobalt",
    wall: "#3b82f6",
    bg: "rgba(59,130,246,0.12)",
    border: "rgba(59,130,246,0.55)",
    accent: "#1d4ed8",
    text: "#1e3a8a",
  },
  {
    name: "Amethyst",
    wall: "#a855f7",
    bg: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.55)",
    accent: "#7e22ce",
    text: "#4a044e",
  },
];

const scrollSteps = [
  {
    number: "01",
    badge: "STEP ONE",
    title: "Upload Your Room Image",
    text: "Simply take a picture of your living room, bedroom, or workspace and upload it to our visualizer. Our system automatically processes lighting, shadows, and baseboard boundaries in under a second.",
    preview: "upload",
  },
  {
    number: "02",
    badge: "STEP TWO",
    title: "Select & Paint Live",
    text: "Hover and click on the walls you want to customize. Choose from 1,000+ handpicked designer shades and watch the color lay down beautifully with natural texture, highlights, and shadow integrity.",
    preview: "paint",
  },
  {
    number: "03",
    badge: "STEP THREE",
    title: "Compare & Download",
    text: "Use the interactive slider to compare your before and after designs side-by-side. Save your favorite color combinations, export high-quality design mockups, and download matching color codes.",
    preview: "download",
  },
];

export default function ScrollFeaturesSection({ activeColor }) {
  const c = palette[activeColor];
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  const stepRefs = [useRef(null), useRef(null), useRef(null)];

  // Desktop scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll effect on desktop
      if (window.innerWidth >= 768) {
        let activeIdx = 0;
        let minDistance = Infinity;

        stepRefs.forEach((ref, idx) => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const distance = Math.abs(
              rect.top + rect.height / 2 - window.innerHeight / 2,
            );
            if (distance < minDistance) {
              minDistance = distance;
              activeIdx = idx;
            }
          }
        });

        setActiveStep(activeIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-slate-50/60 py-14 sm:py-[60px] md:py-[120px]"
      id="work"
    >
      <div className="container">
        {/* Section Header */}
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-[40px] md:mb-[60px]">
          <span className="mb-[12px] block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            How It Works
          </span>
          <h2 className="m-0 text-[clamp(24px,4vw,40px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#14203d]">
            3 Simple Steps To Your{" "}
            <strong className="text-[#5464d1]">Dream Space</strong>
          </h2>
        </div>

        {/* Mobile: Single screen layout with navigation */}
        <MobileScrollSteps
          scrollSteps={scrollSteps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          c={c}
          palette={palette}
          activeColor={activeColor}
        />

        {/* Desktop: 2-Column Scroll Layout */}
        <div className="hidden items-start gap-8 md:grid md:grid-cols-12 lg:gap-[60px]">
          {/* Left Column: Description Steps (Scrollable) */}
          <div className="md:col-span-7 flex flex-col">
            {scrollSteps.map((step, idx) => (
              <div
                key={idx}
                ref={stepRefs[idx]}
                className="flex min-h-[70vh] flex-col justify-center py-8 transition-opacity duration-500 ease-out md:min-h-[85vh] md:py-16"
                style={{
                  opacity: activeStep === idx ? 1 : 0.25,
                }}
              >
                <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {step.badge}
                </span>
                <span className="mb-3 block select-none text-[64px] font-semibold leading-none text-[#0d0e11]">
                  {step.number}
                </span>
                <h3 className="mb-4 text-[24px] font-semibold leading-[1.2] text-[#14203d] overflow-wrap-anywhere">
                  {step.title}
                </h3>
                <p className="max-w-[540px] text-[15px] font-medium leading-[1.75] text-slate-600 overflow-wrap-anywhere">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Sticky Mockup Window */}
          <div className="sticky top-[20%] flex h-[360px] w-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-gradient-to-b from-white to-slate-50 shadow-[0_10px_30px_rgba(15,23,42,0.08)] md:col-span-5 md:h-[420px]">
            {/* Window header / Tab bar */}
            <div className="flex h-[44px] items-center justify-between border-b border-slate-200 bg-slate-100/80 px-5">
              <div className="flex gap-[6px]">
                <span className="h-[9px] w-[9px] rounded-full bg-[#ef4444]/80" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#f59e0b]/80" />
                <span className="h-[9px] w-[9px] rounded-full bg-[#10b981]/80" />
              </div>

              {/* Center Tab Look */}
              <div className="z-10 -mb-[12px] flex h-[32px] items-center gap-2 rounded-t-lg border-x border-t border-slate-200 bg-white px-4 py-1.5 text-[11px] font-semibold text-slate-600">
                <span className="h-[6px] w-[6px] rounded-full bg-[#5464d1]" />
                Live Preview
              </div>

              {/* Logo icon on the right */}
              <img
                src={logo}
                alt="SmartWall"
                className="h-[18px] w-[18px] opacity-60"
              />
            </div>

            <div className="relative flex flex-1 items-center justify-center bg-white/70 p-5 md:p-8">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex flex-col items-center text-center justify-center h-full"
                  >
                    <div className="mb-6 flex h-[100px] w-[100px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-slate-50 transition-colors hover:bg-slate-100">
                      <UploadCloud className="h-10 w-10 text-[#5464d1]" />
                    </div>
                    <h4 className="mb-2 text-[17px] font-semibold text-slate-800">
                      Upload Room Photo
                    </h4>
                    <p className="max-w-[280px] text-[13px] font-medium leading-[1.6] text-slate-600 overflow-wrap-anywhere">
                      Drag &amp; drop or click to browse files to get started.
                    </p>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold uppercase tracking-[0.16em] text-[#5464d1]">
                        Wall Color Selected
                      </span>
                      <span className="rounded bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
                        {c.name}
                      </span>
                    </div>

                    {/* Paint preview simulation */}
                    <div
                      className="relative my-6 flex-1 overflow-hidden rounded-xl border border-slate-200/80 shadow-inner"
                      style={{
                        backgroundColor: c.wall,
                        transition: "background-color 500ms ease",
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="select-none rounded-full border border-white/70 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#14203d] shadow-sm backdrop-blur-sm">
                          Paint applied live
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/10" />
                    </div>

                    <div className="flex gap-[8px] justify-center">
                      {palette.map((p, idx) => (
                        <span
                          key={idx}
                          className={`h-[24px] w-[24px] rounded-full border-2 cursor-pointer transition-all duration-300 ${activeColor === idx ? "border-white scale-110 shadow-lg" : "border-transparent opacity-60"}`}
                          style={{ backgroundColor: p.wall }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-center items-center text-center"
                  >
                    <div className="relative mb-6 flex h-[130px] w-full max-w-[280px] flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Side-by-Side</span>
                        <span className="font-semibold text-[#5464d1]">
                          100% Match
                        </span>
                      </div>
                      {/* Comparison Slider Mock */}
                      <div className="relative flex h-12 items-center justify-center overflow-hidden rounded-lg bg-white">
                        <div
                          className="absolute bottom-0 left-0 top-0 flex w-[55%] items-center justify-end pr-2 text-[9px] font-semibold text-slate-800"
                          style={{ backgroundColor: c.wall }}
                        >
                          PAINTED
                        </div>
                        <div className="absolute bottom-0 right-0 top-0 flex w-[45%] items-center pl-2 text-[9px] font-medium text-slate-500">
                          PLAIN
                        </div>
                        <div className="absolute bottom-0 left-[55%] top-0 w-[2px] cursor-ew-resize bg-slate-400" />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full bg-[#5464d1] px-6 py-3 text-[13px] font-semibold text-white shadow-[0_8px_18px_rgba(84,100,209,0.16)] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30"
                    >
                      <Download size={15} />
                      Download High-Res
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
