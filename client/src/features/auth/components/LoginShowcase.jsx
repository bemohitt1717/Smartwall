import wallVisualizationVideo from "../../../assets/video/women-painting.mp4";

export default function LoginShowcase() {
  return (
    <aside
      className="relative hidden min-h-[100dvh] overflow-hidden bg-[#e9e6e4] p-4 md:block md:h-full md:min-h-0 md:p-5 xl:p-7"
      aria-label="SmartWall color visualization preview"
    >
      <figure className="relative h-full overflow-hidden rounded-[18px] bg-[#d8d1ce]">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-label="A painter applying color to an interior wall."
          className="h-full w-full object-cover object-center"
        >
          <source src={wallVisualizationVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#171417]/55 via-[#171417]/14 to-transparent" />

        <figcaption className="absolute inset-x-0 top-0 p-4 sm:p-5 xl:p-6">
          <div className="max-w-[360px]  p-4   backdrop-blur-md">
            <h2 className="text-[15px] font-extrabold uppercase tracking-[0.22em] text-black">
              SmartWall studio.
            </h2>
            <p className="mt-2 text-[14px] leading-[1.35] tracking-[-0.03em] text-slate-700">
              Upload a wall, test paint colors with AI, and preview the final
              finish before you commit.
            </p>
    
          </div>
        </figcaption>
      </figure>
    </aside>
  );
}
