import { useState, useRef, useEffect } from "react";

const palette = [
  {
    name: "Terracotta",
    wall: "#ce725d",
    bg: "rgba(206,114,93,0.1)",
    border: "rgba(206,114,93,0.35)",
    accent: "#b75d41",
    text: "#6f3e2f",
  },
  {
    name: "Ochre",
    wall: "#d9a94b",
    bg: "rgba(217,169,75,0.1)",
    border: "rgba(217,169,75,0.35)",
    accent: "#ba8440",
    text: "#6f4b1d",
  },
  {
    name: "Teal",
    wall: "#4e9d95",
    bg: "rgba(78,157,149,0.1)",
    border: "rgba(78,157,149,0.35)",
    accent: "#3b7f77",
    text: "#2f5552",
  },
  {
    name: "Cobalt",
    wall: "#5f7fcf",
    bg: "rgba(95,127,207,0.1)",
    border: "rgba(95,127,207,0.35)",
    accent: "#4f6fb7",
    text: "#31446b",
  },
  {
    name: "Amethyst",
    wall: "#8d67c7",
    bg: "rgba(141,103,199,0.1)",
    border: "rgba(141,103,199,0.35)",
    accent: "#7c58b4",
    text: "#4a335f",
  },
];

function RenderRoomVector({ wallColor, accentColor, detailColor, isBefore }) {
  return (
    <svg
      viewBox="0 0 600 337"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="240"
        width="600"
        height="97"
        fill={isBefore ? "#e2e8f0" : "#f1f5f9"}
      />
      <line
        x1="0"
        y1="240"
        x2="600"
        y2="240"
        stroke={isBefore ? "#cbd5e1" : "rgba(255,255,255,0.3)"}
        strokeWidth="2"
      />
      <rect
        x="0"
        y="0"
        width="400"
        height="240"
        fill={wallColor}
        style={{ transition: "fill 500ms ease" }}
      />
      <path
        d="M400 0 L600 40 L600 200 L400 240 Z"
        fill={isBefore ? "#cbd5e1" : accentColor}
        style={{ transition: "fill 500ms ease" }}
        opacity="0.85"
      />

      <line
        x1="400"
        y1="0"
        x2="400"
        y2="240"
        stroke="rgba(0,0,0,0.06)"
        strokeWidth="2"
      />
      <rect
        x="0"
        y="230"
        width="400"
        height="10"
        fill={isBefore ? "#94a3b8" : detailColor}
        style={{ transition: "fill 500ms ease" }}
      />
      <path
        d="M400 230 L600 192 L600 200 L400 240 Z"
        fill={isBefore ? "#64748b" : detailColor}
        style={{ transition: "fill 500ms ease" }}
        opacity="0.9"
      />
      <rect
        x="80"
        y="40"
        width="90"
        height="110"
        fill="#ffffff"
        stroke={isBefore ? "#94a3b8" : detailColor}
        strokeWidth="4"
        rx="4"
        style={{ transition: "stroke 500ms ease" }}
      />
      <rect
        x="90"
        y="50"
        width="70"
        height="90"
        fill={isBefore ? "#cbd5e1" : accentColor}
        rx="2"
        opacity="0.6"
        style={{ transition: "fill 500ms ease" }}
      />
      <circle cx="125" cy="95" r="16" fill="#ffffff" opacity="0.8" />
      <g transform="translate(240, 130)">
        <ellipse cx="60" cy="90" rx="45" ry="8" fill="rgba(0,0,0,0.06)" />
        <rect
          x="20"
          y="45"
          width="80"
          height="35"
          rx="10"
          fill={isBefore ? "#94a3b8" : accentColor}
          style={{ transition: "fill 500ms ease" }}
        />
        <rect
          x="10"
          y="30"
          width="18"
          height="50"
          rx="8"
          fill={isBefore ? "#cbd5e1" : wallColor}
          style={{ transition: "fill 500ms ease" }}
        />
        <rect
          x="92"
          y="30"
          width="18"
          height="50"
          rx="8"
          fill={isBefore ? "#cbd5e1" : wallColor}
          style={{ transition: "fill 500ms ease" }}
        />
        <rect
          x="25"
          y="10"
          width="70"
          height="45"
          rx="12"
          fill={isBefore ? "#64748b" : detailColor}
          style={{ transition: "fill 500ms ease" }}
        />
        <rect
          x="40"
          y="35"
          width="22"
          height="22"
          rx="4"
          fill={isBefore ? "#cbd5e1" : wallColor}
          style={{ transition: "fill 500ms ease" }}
          transform="rotate(15, 51, 46)"
        />
      </g>
      <g transform="translate(40, 60)">
        <line
          x1="20"
          y1="20"
          x2="20"
          y2="180"
          stroke={isBefore ? "#475569" : detailColor}
          strokeWidth="3"
          style={{ transition: "stroke 500ms ease" }}
        />
        <path
          d="M10 20 L30 20 L35 0 L5 0 Z"
          fill={isBefore ? "#f1f5f9" : accentColor}
          style={{ transition: "fill 500ms ease" }}
        />
        <ellipse
          cx="20"
          cy="180"
          rx="16"
          ry="4"
          fill={isBefore ? "#475569" : detailColor}
          style={{ transition: "fill 500ms ease" }}
        />
      </g>
    </svg>
  );
}

export default function RealResultsSection({ activeColor, setActiveColor }) {
  const c = palette[activeColor];
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleMove = (clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  useEffect(() => {
    if (!isDragging) return;

    const stopDragging = () => setIsDragging(false);
    const handleGlobalMove = (event) => {
      const x = event.touches?.[0]?.clientX ?? event.clientX;
      if (typeof x === "number") {
        handleMove(x);
      }
    };

    window.addEventListener("mousemove", handleGlobalMove);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchmove", handleGlobalMove, { passive: true });
    window.addEventListener("touchend", stopDragging);
    window.addEventListener("touchcancel", stopDragging);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMove);
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchmove", handleGlobalMove);
      window.removeEventListener("touchend", stopDragging);
      window.removeEventListener("touchcancel", stopDragging);
    };
  }, [isDragging]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setIsDragging(true);
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((value) => Math.max(0, value - 2));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((value) => Math.min(100, value + 2));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-14 sm:py-15"
      id="visualizer"
    >
      <div className="pointer-events-none absolute -right-32.5 top-37.5 h-75 w-75 rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.08)_0%,rgba(99,102,241,0.02)_55%,transparent_72%)] opacity-70" />
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-8">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6c75a3]">
            See It In Action
          </span>
          <h2 className="m-0 text-[clamp(27px,2.8vw,36px)] font-semibold leading-[1.2] tracking-[-0.02em] text-[#14203d]">
            Real Results, Real Inspiration
          </h2>
        </div>

        {/* Main Content Container */}
        <div className="relative flex flex-col items-center gap-8">
          {/* Color Palette Selector - Above Laptop */}
          <div className="z-10 flex flex-col items-center gap-4 px-2 sm:px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Choose Color
              </span>
              <div
                className="rounded-full px-3 py-1.5 text-[10px] font-semibold transition-all duration-500"
                style={{
                  background: c.bg.replace("0.12", "0.18"),
                  color: c.accent,
                  border: `1px solid ${c.border}`,
                }}
              >
                {c.name}
              </div>
            </div>

            {/* Palette Swatches - Horizontal Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {palette.map((p, i) => (
                <button
                  key={p.name}
                  title={p.name}
                  type="button"
                  aria-pressed={activeColor === i}
                  aria-label={`Preview ${p.name} palette`}
                  onClick={() => setActiveColor(i)}
                  className="group relative h-11 w-11 cursor-pointer rounded-full transition-[transform,box-shadow,opacity] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]/30 motion-reduce:transition-none sm:h-9.5 sm:w-9.5"
                  style={{
                    background: p.wall,
                    outline:
                      activeColor === i
                        ? `3px solid ${p.accent}`
                        : "3px solid transparent",
                    outlineOffset: activeColor === i ? "3px" : "0px",
                    transform: activeColor === i ? "scale(1.03)" : "scale(1)",
                    boxShadow: activeColor === i ? "none" : "none",
                  }}
                >
                  {/* Checkmark on active */}
                  {activeColor === i && (
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[14px] font-black"
                      style={{ color: p.text }}
                    >
                      ✓
                    </span>
                  )}

                  {/* Hover tooltip */}
                  <span
                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-800 px-2 py-1 text-[10px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
                    style={{ zIndex: 10 }}
                  >
                    {p.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Hint Text */}
            <p
              className="m-0 max-w-100 text-center text-[11px] font-medium leading-[1.6] text-slate-500 transition-colors duration-500"
              style={{ color: `${c.accent}cc` }}
            >
              Click a color to preview it instantly on the demo wall
            </p>
          </div>

          {/* CSS-Only Laptop Mockup - Bigger Size */}
          <div className="relative mx-auto flex w-full max-w-[850px] flex-wrap items-center justify-center gap-4 sm:gap-6">
            {/* Before Label - Left Side */}
            <div className="relative hidden w-[140px] rounded-[14px] border border-slate-200/80 bg-slate-50/90 p-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 md:block">
              <span className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Original Room
              </span>
              <strong className="mb-1 block text-[12px] font-semibold text-[#17213d]">
                Before Paint
              </strong>
              <p className="m-0 text-[11px] font-medium leading-[1.4] text-[#6a7488]">
                Plain walls with neutral items.
              </p>
              <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-slate-300" />
            </div>

            {/* CSS Laptop with Full Screen Demo - Larger */}
            <div className="relative w-full max-w-[720px] flex-1 md:max-w-[650px]">
              {/* Laptop Screen */}
              <div className="relative rounded-t-2xl bg-linear-to-br from-slate-800 to-slate-900 p-1.5 shadow-[0_16px_36px_rgba(0,0,0,0.18)]">
                {/* Screen Bezel */}
                <div className="relative overflow-hidden rounded-lg bg-black p-1">
                  {/* Camera Notch */}
                  <div className="absolute left-1/2 top-1 z-20 flex h-1 w-15 -translate-x-1/2 items-center justify-center rounded-full bg-slate-900">
                    <div className="h-0.75 w-0.75 rounded-full bg-slate-700" />
                  </div>

                  {/* Interactive Wall Demo - Full Screen */}
                  <div
                    ref={sliderRef}
                    role="slider"
                    tabIndex={0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={sliderPos}
                    aria-label="Compare before and after paint colors"
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onTouchCancel={handleTouchEnd}
                    onKeyDown={handleKeyDown}
                    className="relative aspect-4/3 w-full cursor-ew-resize select-none overflow-hidden rounded-sm bg-[#f8fafc] sm:aspect-16/10"
                  >
                    {/* Layer 1: Before Room */}
                    <div className="absolute inset-0 w-full h-full">
                      <RenderRoomVector
                        wallColor="#f1f5f9"
                        accentColor="#e2e8f0"
                        detailColor="#94a3b8"
                        isBefore={true}
                      />
                    </div>

                    {/* Layer 2: After Room (Clipped) */}
                    <div
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{
                        clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                        transition: "clip-path 120ms ease-out",
                      }}
                    >
                      <RenderRoomVector
                        wallColor={c.wall}
                        accentColor={c.accent}
                        detailColor={c.text}
                        isBefore={false}
                      />
                    </div>

                    <div className="absolute left-3 top-3 z-10 rounded-full border border-slate-200/80 bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600 shadow-[0_4px_10px_rgba(0,0,0,0.06)] backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[10px]">
                      Drag to compare
                    </div>

                    {/* Slider bar */}
                    <div
                      className="pointer-events-none absolute bottom-0 top-0 z-10 w-0.5 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.12)] motion-reduce:transition-none"
                      style={{
                        left: `${sliderPos}%`,
                        transition: "left 120ms ease-out",
                      }}
                    />

                    {/* Slider handle */}
                    <div
                      className="pointer-events-none absolute top-1/2 z-10 flex h-10.5 w-10.5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/80 bg-white text-[14px] font-semibold text-slate-500 shadow-[0_4px_10px_rgba(0,0,0,0.08)] select-none motion-reduce:transition-none"
                      style={{
                        left: `${sliderPos}%`,
                        transition: "left 120ms ease-out",
                      }}
                    >
                      ‹›
                    </div>
                  </div>
                </div>
              </div>

              {/* Laptop Base - Slim */}
              <div className="relative h-2.5 rounded-b-[18px] bg-linear-to-b from-slate-300 to-slate-400 shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                <div className="absolute left-1/2 top-0.75 h-0.75 w-15 -translate-x-1/2 rounded-sm bg-slate-500 opacity-60" />
              </div>

              {/* Shadow */}
              <div className="absolute -bottom-3 left-1/2 h-6 w-[85%] -translate-x-1/2 bg-linear-to-b from-slate-900/8 to-transparent blur-lg" />
            </div>

            {/* After Label - Right Side */}
            <div className="relative hidden w-[140px] rounded-[14px] border border-slate-200/80 bg-slate-50/90 p-[16px] shadow-[0_4px_12px_rgba(0,0,0,0.03)] transition-all duration-300 md:block">
              <span
                className="mb-1 block text-[9px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: c.accent }}
              >
                Custom Color
              </span>
              <strong className="mb-1 block text-[12px] font-semibold text-[#17213d]">
                After Paint
              </strong>
              <p className="m-0 text-[11px] font-medium leading-[1.4] text-[#6a7488]">
                Cohesive theme applied.
              </p>
              <span
                className="absolute right-4 top-4 h-2 w-2 rounded-full transition-colors duration-500"
                style={{ backgroundColor: c.accent }}
              />
            </div>
          </div>

          {/* Mobile Labels - Below Laptop */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 px-2 md:hidden">
            <div className="flex-1 max-w-[160px] rounded-[12px] border border-slate-200/80 bg-slate-50/90 p-[14px] shadow-[0_3px_10px_rgba(0,0,0,0.03)]">
              <span className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Original
              </span>
              <strong className="block text-[11px] font-semibold text-[#17213d]">
                Before Paint
              </strong>
            </div>
            <div className="flex-1 max-w-[160px] rounded-[12px] border border-slate-200/80 bg-slate-50/90 p-[14px] shadow-[0_3px_10px_rgba(0,0,0,0.03)]">
              <span
                className="mb-1 block text-[8px] font-semibold uppercase tracking-[0.16em]"
                style={{ color: c.accent }}
              >
                Custom
              </span>
              <strong className="block text-[11px] font-semibold text-[#17213d]">
                After Paint
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
