import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Copy } from "lucide-react";

const collections = [
  {
    name: "Modern",
    note: "Urban Clean",
    description: "Soft contrast, crisp lines, and fresh everyday elegance.",
    colors: ["#A4B4FF", "#E9E4DB", "#2F3A58", "#D2D8EA"],
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Minimal",
    note: "Quiet Luxe",
    description: "Scandinavian simplicity with a refined designer finish.",
    colors: ["#D9D5CE", "#B9C7D8", "#6C747E", "#F4EFEA"],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Warm",
    note: "Cozy Glow",
    description: "Comfort-driven shades that soften your entire room mood.",
    colors: ["#E2B88D", "#F6E7D2", "#9C6B45", "#C98D61"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Luxury",
    note: "High-End Feel",
    description: "Deep, premium tones curated for dramatic statement spaces.",
    colors: ["#8E6A50", "#D7C2A6", "#2E2321", "#6A4C3B"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Nature",
    note: "Organic Calm",
    description: "Earthy palettes inspired by natural light and textures.",
    colors: ["#B9C8A3", "#E7E0D0", "#66724F", "#A7865B"],
    image:
      "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=640&q=85",
  },
  {
    name: "Dark",
    note: "Moody Depth",
    description: "Bold, layered shades for a rich, elegant final look.",
    colors: ["#1C2334", "#515B77", "#8C99B3", "#D5D9E2"],
    image:
      "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=640&q=85",
  },
];

// Grid layout removed - now using equal sized cards

export default function ColorCollections() {
  const [copiedTheme, setCopiedTheme] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const handleCopyTheme = async (collection) => {
    const content = `${collection.name} theme: ${collection.colors.join(", ")}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(content);
      }
      setCopiedTheme(collection.name);
      window.setTimeout(() => setCopiedTheme(null), 1600);
    } catch (error) {
      setCopiedTheme(collection.name);
      window.setTimeout(() => setCopiedTheme(null), 1600);
    }
  };

  const toggleCard = (cardName) => {
    setActiveCard(activeCard === cardName ? null : cardName);
  };

  const handleCardKeyDown = (event, cardName) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleCard(cardName);
    }
  };

  return (
    <section className="py-6 pb-16 sm:py-8 sm:pb-20" id="colors">
      <div className="container">
        <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Color Themes
          </span>
          <h2 className="m-0 text-[clamp(27px,3vw,38px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[color:var(--ink)]">
            Curated spaces for every mood
          </h2>
          <p className="mx-auto mt-3 max-w-[560px] text-[14px] leading-[1.7] text-slate-600">
            Browse refined palette directions that feel grounded, elevated, and
            ready to bring into your own room.
          </p>
        </div>

        {/* Responsive card grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-5">
          {collections.map((collection, index) => (
            <article
              key={collection.name}
              role="button"
              tabIndex={0}
              onClick={() => toggleCard(collection.name)}
              onKeyDown={(event) => handleCardKeyDown(event, collection.name)}
              className="group relative min-h-[300px] w-full min-w-0 cursor-pointer overflow-hidden rounded-[18px] border border-slate-200/80 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_14px_32px_rgba(15,23,42,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.99] sm:min-h-[320px]"
            >
              <img
                src={collection.image}
                alt={`${collection.name} room palette`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,10,22,0.12),rgba(6,10,22,0.74))]" />

              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-[22px]">
                <div className="flex items-center gap-[8px]">
                  <span className="rounded-full border border-white/20 bg-white/12 px-[10px] py-[4px] text-[10px] font-extrabold uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm">
                    {index + 1}
                  </span>
                  <span className="rounded-full bg-white/12 px-[10px] py-[4px] text-[10px] font-semibold text-white/90 backdrop-blur-sm">
                    {collection.note}
                  </span>
                </div>

                <div className="space-y-[10px]">
                  <h3 className="m-0 text-[18px] font-extrabold leading-[1.2] text-white md:text-[20px] overflow-wrap-anywhere">
                    {collection.name}
                  </h3>
                  <p className="m-0 max-w-[320px] text-[13px] font-medium leading-[1.55] text-white/85 overflow-wrap-anywhere">
                    {collection.description}
                  </p>

                  {/* Color palette - visible on hover OR when card is active (clicked on mobile) */}
                  <div
                    className={`translate-y-[10px] opacity-0 transition-all duration-300 ${activeCard === collection.name ? "translate-y-0 opacity-100" : "md:group-hover:translate-y-0 md:group-hover:opacity-100"}`}
                  >
                    <div className="mb-[10px] inline-flex items-center overflow-hidden rounded-full border border-white/60 bg-white/10 p-[4px] shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm">
                      {collection.colors.map((color, colorIndex) => (
                        <span
                          key={`${collection.name}-${color}`}
                          className="h-[32px] w-[32px] transition-transform duration-200 hover:scale-110"
                          style={{
                            backgroundColor: color,
                            borderRadius: "50%",
                            marginLeft: colorIndex > 0 ? "-6px" : "0",
                          }}
                          title={color}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopyTheme(collection);
                      }}
                      className="inline-flex items-center gap-[6px] rounded-full bg-white/95 px-[14px] py-[7px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--ink)] shadow-[0_8px_18px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-[1px] hover:bg-white active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5464d1]/30"
                    >
                      {copiedTheme === collection.name ? (
                        <Check size={13} className="text-emerald-600" />
                      ) : (
                        <Copy size={13} className="text-[#5f67ff]" />
                      )}
                      {copiedTheme === collection.name
                        ? "Copied"
                        : "Copy Theme"}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <Link
          to="/colors"
          className="mx-auto mt-8 inline-flex w-max items-center justify-center gap-[8px] text-[14px] font-semibold text-[#5464d1] transition-all duration-200 hover:gap-[12px]"
        >
          Explore All Colors
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
