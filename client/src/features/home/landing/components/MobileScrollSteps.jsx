import { motion, AnimatePresence } from "framer-motion";
import { Download, UploadCloud } from "lucide-react";

export default function MobileScrollSteps({
  scrollSteps,
  activeStep,
  setActiveStep,
  c,
  palette,
  activeColor,
}) {
  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % scrollSteps.length);
  };

  const prevStep = () => {
    setActiveStep(
      (prev) => (prev - 1 + scrollSteps.length) % scrollSteps.length,
    );
  };

  return (
    <div className="md:hidden">
      {/* Text Content - Always visible at top */}
      <div className="mb-6 sm:mb-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span
              className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.2em] sm:text-[11px]"
              style={{ color: c.accent }}
            >
              {scrollSteps[activeStep].badge}
            </span>
            <span className="mb-2 block select-none text-[36px] font-black leading-none !text-[#14203d] sm:text-[48px]">
              {scrollSteps[activeStep].number}
            </span>
            <h3 className="mb-3 text-[20px] font-extrabold text-[#14203d] sm:text-[24px]">
              {scrollSteps[activeStep].title}
            </h3>
            <p className="text-[13px] font-semibold leading-[1.7] text-[#1e293b] sm:text-[15px]">
              {scrollSteps[activeStep].text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Preview Window - Below text */}
      <div
        className="overflow-hidden rounded-[18px] border bg-white/95 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
        style={{
          borderColor: `${c.border}`,
          boxShadow: `0 16px 40px ${c.bg.replace("0.12", "0.18")}`,
        }}
      >
        {/* Window header */}
        <div
          className="flex h-[40px] items-center justify-between border-b px-4"
          style={{
            borderBottomColor: `${c.border}`,
            background: `linear-gradient(135deg, ${c.bg.replace("0.12", "0.16")}, rgba(255,255,255,0.96))`,
          }}
        >
          <div className="flex gap-[6px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#ef4444]/80" />
            <span className="h-[8px] w-[8px] rounded-full bg-[#f59e0b]/80" />
            <span className="h-[8px] w-[8px] rounded-full bg-[#10b981]/80" />
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-700">
            <span
              className="h-[6px] w-[6px] rounded-full animate-pulse"
              style={{ backgroundColor: c.accent }}
            />
            Live Preview
          </div>
        </div>

        {/* Content area */}
        <div className="relative flex min-h-[300px] items-center justify-center bg-white/70 p-4 sm:min-h-[340px] sm:p-6">
          <AnimatePresence mode="wait">
            {activeStep === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full flex flex-col items-center text-center justify-center"
              >
                <div
                  className="mb-5 flex h-[84px] w-[84px] items-center justify-center rounded-full border border-dashed bg-white/10"
                  style={{ borderColor: `${c.accent}55`, color: c.accent }}
                >
                  <UploadCloud
                    className="h-8 w-8 animate-bounce"
                    style={{ color: c.accent }}
                  />
                </div>
                <h4 className="mb-2 text-[16px] font-extrabold text-[#14203d]">
                  Upload Room Photo
                </h4>
                <p className="max-w-[260px] text-[12px] font-semibold text-slate-600">
                  Drag &amp; drop or click to browse files.
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
                <div className="flex justify-between items-center text-xs mb-4">
                  <span
                    className="font-extrabold uppercase tracking-wider text-[10px]"
                    style={{ color: c.accent }}
                  >
                    Wall Color
                  </span>
                  <span
                    className="rounded px-2 py-1 text-[10px] font-bold text-slate-700"
                    style={{ backgroundColor: `${c.accent}16` }}
                  >
                    {c.name}
                  </span>
                </div>

                <div
                  className="flex-1 my-4 rounded-xl border overflow-hidden relative shadow-inner min-h-[180px]"
                  style={{
                    backgroundColor: c.wall,
                    borderColor: `${c.accent}22`,
                    transition: "background-color 500ms ease",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 backdrop-blur-sm rounded-full py-1.5 px-3 border border-white/90 text-[11px] font-bold text-[#14203d] shadow-sm">
                      Paint applied live
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/10" />
                </div>

                <div className="mt-4 flex justify-center gap-2">
                  {palette.map((p, idx) => (
                    <span
                      key={idx}
                      className={`h-[22px] w-[22px] rounded-full border-2 transition-all duration-300 ${activeColor === idx ? "scale-110" : "opacity-60"}`}
                      style={{
                        backgroundColor: p.wall,
                        borderColor:
                          activeColor === idx ? c.accent : "transparent",
                      }}
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
                className="w-full flex flex-col justify-center items-center text-center"
              >
                <div
                  className="mb-5 flex h-[120px] w-full max-w-[260px] flex-col justify-between rounded-xl border bg-white/80 p-3"
                  style={{ borderColor: `${c.accent}22` }}
                >
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span>Side-by-Side</span>
                    <span className="font-bold" style={{ color: c.accent }}>
                      100%
                    </span>
                  </div>
                  <div className="relative h-10 bg-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[55%] flex items-center justify-end pr-2 text-[8px] text-slate-800 font-black"
                      style={{ backgroundColor: c.wall }}
                    >
                      PAINTED
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-[45%] flex items-center pl-2 text-[8px] text-slate-400 font-bold">
                      PLAIN
                    </div>
                    <div className="absolute left-[55%] top-0 bottom-0 w-[2px] bg-white" />
                  </div>
                </div>

                <button
                  className="flex items-center gap-2 rounded-full px-5 py-2.5 text-[12px] font-bold text-white shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${c.accent} 0%, ${c.text} 100%)`,
                  }}
                >
                  <Download size={14} />
                  Download High-Res
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots & Arrows */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={prevStep}
          disabled={activeStep === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#6570ff] text-[18px] font-bold text-[#6570ff] transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>

        <div className="flex gap-2">
          {scrollSteps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`h-[10px] rounded-full transition-all duration-300 ${
                activeStep === idx ? "w-8" : "w-[10px]"
              }`}
              style={{
                backgroundColor:
                  activeStep === idx ? c.accent : `${c.accent}40`,
              }}
            />
          ))}
        </div>

        <button
          onClick={nextStep}
          disabled={activeStep === scrollSteps.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#6570ff] text-[18px] font-bold text-[#6570ff] transition-all duration-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>
      </div>
    </div>
  );
}
