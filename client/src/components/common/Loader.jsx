import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Base Skeleton component with shimmer effect
export function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-slate-200 rounded-md relative overflow-hidden ${className}`}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

const loadingMessages = [
  "Loading your workspace...",
  "Preparing your dashboard...",
  "Setting up your projects...",
  "Almost there...",
  "Getting things ready...",
  "Loading resources...",
];

// Full-screen loader with 3D cube animation and rotating text
export default function Loader() {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-8">
        {/* 3D Cube Spinner */}
        <div className="relative" style={{ perspective: "1000px" }}>
          <motion.div
            className="relative"
            style={{
              width: "44px",
              height: "44px",
              transformStyle: "preserve-3d",
            }}
            animate={{
              rotateX: [-25, -385],
              rotateY: [25, 385],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {/* Cube faces */}
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{ transform: "translateZ(-22px) rotateY(180deg)" }}
            />
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{
                transform: "rotateY(-270deg) translateX(50%)",
                transformOrigin: "top right",
              }}
            />
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{
                transform: "rotateY(270deg) translateX(-50%)",
                transformOrigin: "center left",
              }}
            />
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{
                transform: "rotateX(90deg) translateY(-50%)",
                transformOrigin: "top center",
              }}
            />
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{
                transform: "rotateX(-90deg) translateY(50%)",
                transformOrigin: "bottom center",
              }}
            />
            <div
              className="absolute inset-0 border-2 border-indigo-600 bg-indigo-600/20"
              style={{ transform: "translateZ(22px)" }}
            />
          </motion.div>
        </div>

        {/* Animated Loading Text */}
        <div className="relative h-[24px] min-w-[200px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-600"
            >
              {loadingMessages[currentMessage]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
