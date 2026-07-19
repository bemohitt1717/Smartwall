import { useState } from "react";
import { Copy, Check } from "lucide-react";
import MainLayout from "../../../layouts/MainLayout.jsx";

const colorThemes = [
  {
    id: 1,
    name: "Modern",
    tag: "Urban Clean",
    description: "Soft contrast, crisp lines, and fresh everyday elegance.",
    colors: ["#f5f5f0", "#e8e6df", "#d4d2c8", "#b8b6ad"],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Luxury",
    tag: "High-End Feel",
    description: "Deep, premium tones curated for dramatic statement spaces.",
    colors: ["#2c3e50", "#34495e", "#5d6d7e", "#85929e"],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Minimalist",
    tag: "Quiet Luxe",
    description: "Scandinavian simplicity with a refined designer finish.",
    colors: ["#ffffff", "#f8f9fa", "#e9ecef", "#dee2e6"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Warm",
    tag: "Cozy Glow",
    description: "Comfort-driven shades that soften your entire room mood.",
    colors: ["#f4e4d7", "#e8d5c4", "#dcc6b0", "#d0b89d"],
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Nature",
    tag: "Organic Calm",
    description: "Earthy palettes inspired by natural light and textures.",
    colors: ["#a8c686", "#8fb573", "#76a460", "#5d934d"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Dark",
    tag: "Moody Depth",
    description: "Bold, layered shades for a rich, elegant final look.",
    colors: ["#1a1a2e", "#16213e", "#0f3460", "#533483"],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Coastal",
    tag: "Breeze Blue",
    description: "Ocean-inspired tones bringing calm serenity indoors.",
    colors: ["#a8dadc", "#457b9d", "#1d3557", "#f1faee"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Sunset",
    tag: "Warm Horizon",
    description: "Golden hour hues that radiate warmth and energy.",
    colors: ["#ff6b6b", "#ee5a6f", "#c44569", "#4a69bd"],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Industrial",
    tag: "Raw Edge",
    description: "Urban concrete palette with metallic undertones.",
    colors: ["#95a5a6", "#7f8c8d", "#606f7b", "#4a5568"],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Pastel Dream",
    tag: "Soft Blush",
    description: "Gentle, airy tones perfect for serene living spaces.",
    colors: ["#ffd3e1", "#ffc4d6", "#ffb3c6", "#ff9eb7"],
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Forest",
    tag: "Deep Green",
    description: "Rich woodland shades bringing nature's tranquility home.",
    colors: ["#2d4a2b", "#3d5a3a", "#4d6a49", "#5d7a58"],
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Monochrome",
    tag: "Pure Contrast",
    description: "Timeless black and white with sophisticated grays.",
    colors: ["#000000", "#2c2c2c", "#5a5a5a", "#ffffff"],
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
  },
];

function ColorCard({ theme }) {
  const [copiedTheme, setCopiedTheme] = useState(false);

  const copyTheme = async () => {
    const colorString = theme.colors.join(", ");
    try {
      await navigator.clipboard.writeText(colorString);
    } catch {
      // fall back silently
    }
    setCopiedTheme(true);
    setTimeout(() => setCopiedTheme(false), 2000);
  };

  return (
    <div className="group relative overflow-hidden rounded-[16px] border border-slate-200/80 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(15,23,42,0.1)] md:rounded-[20px]">
      {/* Image Container */}
      <div className="relative h-[180px] md:h-[240px] overflow-hidden">
        <img
          src={theme.image}
          alt={theme.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Number Badge */}
        <div className="absolute top-3 left-3 md:top-4 md:left-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm md:h-10 md:w-10">
          <span className="text-[12px] font-black text-slate-800 md:text-[14px]">
            {theme.id}
          </span>
        </div>

        {/* Tag */}
        <div className="absolute top-3 right-3 md:top-4 md:right-4 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-700 md:text-[10px]">
            {theme.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <h3 className="mb-2 text-[18px] font-extrabold leading-[1.2] text-[color:var(--ink)] md:text-[22px] overflow-wrap-anywhere">
          {theme.name}
        </h3>
        <p className="mb-4 text-[12px] font-medium leading-[1.55] text-[color:var(--muted)] md:text-[14px] overflow-wrap-anywhere">
          {theme.description}
        </p>

        {/* Color Palette - Appears on hover as circles in a row */}
        <div className="mb-4 flex h-[48px] items-center md:h-[56px]">
          <div className="inline-flex items-center gap-0 opacity-70 translate-y-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 md:opacity-0 md:translate-y-2">
            {theme.colors.map((color, index) => (
              <div
                key={index}
                className="h-10 w-10 rounded-full border-[3px] border-white shadow-md transition-transform duration-200 hover:z-10 hover:scale-110 md:h-12 md:w-12"
                style={{
                  backgroundColor: color,
                  marginLeft: index > 0 ? "-8px" : "0",
                }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Copy Theme Button */}
        <button
          onClick={copyTheme}
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-[12px] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(84,100,209,0.12),rgba(255,255,255,0.95))] px-4 py-2.5 text-[12px] font-bold text-slate-700 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#5464d1]/30 hover:text-[#5464d1] hover:shadow-[0_8px_18px_rgba(84,100,209,0.12)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30 md:py-3 md:text-[14px]"
        >
          {copiedTheme ? (
            <>
              <Check size={16} strokeWidth={3} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Theme
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Colors() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] py-[60px] md:py-[80px]">
        <div className="container">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-[40px] md:mb-[60px] px-4">
            <span className="mb-2 inline-block text-[10px] font-extrabold uppercase tracking-[0.20em] text-[color:var(--primary)] md:mb-3 md:text-[12px] md:tracking-[0.24em]">
              Color Theme
            </span>
            <h1 className="mb-3 text-[28px] font-extrabold leading-[1.1] text-[color:var(--ink)] md:mb-4 md:text-[clamp(36px,4vw,52px)]">
              Curated Color Themes
            </h1>
            <p className="mx-auto max-w-[600px] text-[14px] font-medium leading-[1.6] text-[color:var(--muted)] md:text-[16px] md:leading-[1.7]">
              Browse our professionally curated color palettes designed by
              interior experts. Each theme is crafted to transform your space
              with harmonious, tested combinations.
            </p>
          </div>

          {/* Simple Grid Layout - 2 columns mobile, 3 columns desktop */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {colorThemes.map((theme) => (
              <ColorCard key={theme.id} theme={theme} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
