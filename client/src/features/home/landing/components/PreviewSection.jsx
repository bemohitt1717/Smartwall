import { useState } from "react";
import {
  CheckCircle2,
  Download,
  Eye,
  Palette,
  Pipette,
  UploadCloud,
  Zap,
} from "lucide-react";

const swatches = [
  { color: "#6366f1", label: "Indigo" },
  { color: "#3b82f6", label: "Blue" },
  { color: "#8b5cf6", label: "Violet" },
  { color: "#0ea5e9", label: "Sky" },
  { color: "#14203d", label: "Navy" },
];

/* ── Icon wrapper ── */
function IconBox({ icon: Icon, size = 28, className = "" }) {
  return (
    <div className={`flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-[14px] border border-[rgba(99,102,241,0.22)] bg-[linear-gradient(135deg,rgba(99,102,241,0.13),rgba(59,130,246,0.08))] transition-all duration-300 group-hover:border-[rgba(99,102,241,0.45)] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.18)] ${className}`}>
      <Icon size={size} strokeWidth={1.8} className="text-[#5f67ff] transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
}

/* ── Pastel colour palette for the wall picker card ── */
const palette = [
  { name: "Terracotta", wall: "#e05a47", bg: "rgba(224,90,71,0.12)", border: "rgba(224,90,71,0.55)", accent: "#c23f2d", text: "#5c160e" },
  { name: "Ochre",      wall: "#f4b41a", bg: "rgba(244,180,26,0.12)", border: "rgba(244,180,26,0.55)", accent: "#e09d0b", text: "#5e3f02" },
  { name: "Teal",       wall: "#14b8a6", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.55)", accent: "#0d9488", text: "#115e59" },
  { name: "Cobalt",     wall: "#3b82f6", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.55)", accent: "#1d4ed8", text: "#1e3a8a" },
  { name: "Amethyst",   wall: "#a855f7", bg: "rgba(168,85,247,0.12)", border: "rgba(168,85,247,0.55)", accent: "#7e22ce", text: "#4a044e" },
];

/* ── Minimal wall-picker card ── */
function RoomCard({ active, setActive }) {
  const c = palette[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-[18px] min-h-[340px] flex flex-col p-[20px] sm:p-[28px] gap-[16px] sm:gap-[20px]"
      style={{
        background: `linear-gradient(145deg, ${c.bg.replace("0.12","0.18")}, rgba(255,255,255,0.96))`,
        border: `1.5px solid ${c.border}`,
        boxShadow: `0 4px 24px ${c.bg.replace("0.12","0.14")}, 0 12px 40px rgba(14,20,50,0.08)`,
        transition: "background 500ms ease, border-color 500ms ease, box-shadow 500ms ease",
      }}
    >
      {/* Label */}
      <div>
        <span
          className="block text-[11px] font-extrabold uppercase tracking-[0.22em] mb-[4px] transition-colors duration-500"
          style={{ color: c.accent }}
        >
          Choose Your Colour
        </span>
        <h3
          className="text-[18px] font-extrabold leading-[1.25] transition-colors duration-500 m-0"
          style={{ color: c.text }}
        >
          See it on your wall,{" "}
          <span style={{ color: c.accent }}>before you paint.</span>
        </h3>
      </div>

      {/* Mini room wall preview */}
      <div
        className="flex-1 rounded-[12px] relative overflow-hidden"
        style={{
          background: c.wall,
          minHeight: 120,
          transition: "background 500ms ease",
          boxShadow: `inset 0 2px 12px rgba(0,0,0,0.06)`,
        }}
      >
        {/* Simple room silhouette — skirting board at bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[10px] rounded-b-[12px]"
          style={{ background: "rgba(0,0,0,0.08)" }}
        />
        {/* Baseboard line */}
        <div
          className="absolute bottom-[10px] left-0 right-0 h-[2px]"
          style={{ background: "rgba(0,0,0,0.12)" }}
        />
        {/* Active color name badge — centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="rounded-full px-[14px] py-[5px] text-[12px] font-extrabold backdrop-blur-sm transition-all duration-500"
            style={{
              background: "rgba(255,255,255,0.55)",
              color: c.text,
              border: `1px solid rgba(255,255,255,0.8)`,
            }}
          >
            {c.name}
          </span>
        </div>
      </div>

      {/* Pastel strip swatches — horizontal pills, click to select */}
      <div className="flex gap-[8px]">
        {palette.map((p, i) => (
          <button
            key={p.name}
            title={p.name}
            onClick={() => setActive(i)}
            className="flex-1 h-[32px] rounded-[8px] transition-all duration-300 relative"
            style={{
              background: p.wall,
              outline: active === i ? `2.5px solid ${p.accent}` : "2.5px solid transparent",
              outlineOffset: active === i ? "2px" : "0px",
              transform: active === i ? "scaleY(1.12)" : "scaleY(1)",
              boxShadow: active === i ? `0 4px 12px ${p.wall}99` : "none",
            }}
          >
            {/* Checkmark on active */}
            {active === i && (
              <span
                className="absolute inset-0 flex items-center justify-center text-[10px] font-black"
                style={{ color: p.text }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <p
        className="text-[12px] font-medium leading-[1.5] m-0 transition-colors duration-500"
        style={{ color: `${c.accent}cc` }}
      >
        Tap a shade to preview it instantly on your wall.
      </p>
    </div>
  );
}

export default function PreviewSection() {
  const [active, setActive] = useState(0);

  return (
    <RoomCard active={active} setActive={setActive} />
  );
}
