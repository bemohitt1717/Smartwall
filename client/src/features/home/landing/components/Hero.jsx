import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../../../../components/common/Button.jsx";
import { Link } from "react-router-dom";
import logo from "../../../../assets/icons/smartwall-logo.svg";
import UploadCard from "../../../dashboard/components/UploadCard.jsx";

const features = [
  "Upload Your Room Photo",
  "Select Walls to Paint",
  "Choose From 1000+ Colors",
  "Visualize Rooms Instantly",
  "Compare Harmonious Tones",
  "Save Custom Palettes",
];

export default function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showUploadCard, setShowUploadCard] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex min-h-[700px] items-center overflow-hidden px-[16px] py-[60px] sm:px-0 md:py-[90px]">
      {/* Bottom-right Ripple Animation */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none overflow-hidden"
        style={{ width: 900, height: 900 }}
      >
        {[
          {
            size: 860,
            borderColor: "rgba(100,87,255,0.12)",
            bg: "rgba(100,87,255,0.03)",
            delay: 0,
          },
          {
            size: 680,
            borderColor: "rgba(99,102,241,0.16)",
            bg: "rgba(99,102,241,0.04)",
            delay: 0.7,
          },
          {
            size: 510,
            borderColor: "rgba(59,130,246,0.16)",
            bg: "rgba(59,130,246,0.04)",
            delay: 1.4,
          },
          {
            size: 350,
            borderColor: "rgba(99,102,241,0.14)",
            bg: "rgba(99,102,241,0.05)",
            delay: 2.1,
          },
          {
            size: 200,
            borderColor: "rgba(139,92,246,0.12)",
            bg: "rgba(139,92,246,0.03)",
            delay: 2.8,
          },
        ].map(({ size, borderColor, bg, delay }, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              right: -size / 2,
              bottom: -size / 2,
              border: `1.5px solid ${borderColor}`,
              background: bg,
            }}
            animate={{ scale: [0.9, 1.06, 0.9] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        ))}
      </div>

      {/* Main hero content */}
      <div className="container relative z-10 mx-auto text-center">
        <AnimatePresence mode="wait">
          {!showUploadCard ? (
            <motion.div
              key="hero-content"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Badge with animated text */}
              <div className="mx-auto mb-[28px] inline-flex min-h-[42px] max-w-full items-center gap-[8px] overflow-hidden rounded-full border border-slate-200/90 bg-white/80 px-[12px] sm:px-[16px] shadow-[0_8px_20px_rgba(15,23,42,0.04)] backdrop-blur-sm">
                <img
                  src={logo}
                  alt=""
                  className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px] transition-transform duration-300 group-hover:scale-110"
                />
                <div className="relative h-[20px] min-w-[150px] overflow-hidden sm:w-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentFeature}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 flex items-center text-[11px] sm:text-[13px] font-semibold text-slate-600"
                    >
                      {features[currentFeature]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Heading */}
              <h1 className="mx-auto max-w-[820px] text-wrap balance overflow-wrap-anywhere text-[clamp(2.7rem,5.2vw,4.6rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-[color:var(--ink)]">
                <span className="block">See Your Walls</span>
                <span className="block">
                  In A{" "}
                  <span className="inline-block text-[#5464d1]">New Light</span>
                </span>
              </h1>

              {/* Sub-text */}
              <p className="mx-auto mt-[24px] max-w-[590px] text-[16px] font-medium leading-[1.7] text-slate-600 overflow-wrap-anywhere">
                Upload your room photo, choose from 1,000+ colors, and see the
                perfect shade come to life with calm, confident clarity.
              </p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-[44px] flex flex-col sm:flex-row flex-wrap items-center justify-center gap-[12px] sm:gap-[16px] w-full px-4 sm:px-0"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
              >
                <Button
                  icon={ArrowRight}
                  onClick={() => setShowUploadCard(true)}
                  className="!min-h-[54px] w-full sm:w-auto !min-w-0 sm:!min-w-[190px] !rounded-full !text-[15px] !px-6 !font-semibold"
                >
                  Start Visualizing
                </Button>
                <Button
                  as={Link}
                  to="/colors"
                  variant="ghost"
                  className="!min-h-[54px] w-full sm:w-auto !min-w-0 sm:!min-w-[170px] !rounded-full !text-[15px] !px-6 !font-semibold"
                >
                  Explore Colors →
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="upload-section"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="space-y-6"
            >
              {/* Small instruction text */}
              <div className="text-center">
                <h2 className="text-[28px] sm:text-[30px] font-bold text-[color:var(--ink)] mb-2">
                  Upload Your Room Photo
                </h2>
                <p className="text-[14px] sm:text-[15px] text-slate-600 font-medium max-w-[500px] mx-auto">
                  Choose a clear photo of your room to start visualizing paint colors instantly
                </p>
              </div>

              {/* Upload Card Centered */}
              <UploadCard />

              {/* Back button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadCard(false)}
                className="mx-auto flex items-center gap-2 text-[14px] font-semibold text-slate-600 hover:text-[#5464d1] transition-colors"
                type="button"
              >
                ← Back to home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


