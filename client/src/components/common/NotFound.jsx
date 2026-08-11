import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ArrowLeft, Plus } from "lucide-react";
import undrawBlank from "../../assets/images/undraw_blank.png";

export default function NotFound() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none"
      style={{ backgroundColor: '#ffffff' }}
    >
      {/* Top Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl self-start z-10"
      >
        <h1 
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-3"
          style={{ color: 'var(--ink)' }}
        >
          We're not sure what happened there—sorry!
        </h1>
        <p 
          className="text-base md:text-xl font-semibold"
          style={{ color: 'var(--muted)' }}
        >
          Check for typos, try again?
        </p>
      </motion.div>

      {/* Center 404 Paint Illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center gap-6 md:gap-12 my-auto py-8 z-10"
      >
        {/* Left "4" */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[140px] sm:text-[200px] md:text-[280px] font-black leading-none select-none"
          style={{ color: 'var(--primary)', opacity: 0.25 }}
        >
          4
        </motion.div>

        {/* Paint Visualizer Image */}
        <div className="relative flex items-center justify-center">
          {/* Glowing backlight halo (soft matching purple glow) */}
          <div 
            className="absolute w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] rounded-full blur-3xl pointer-events-none opacity-30 z-0"
            style={{
              background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            }}
          />
          <img 
            src={undrawBlank} 
            alt="Color Visualizer" 
            className="relative z-10 w-[160px] h-auto sm:w-[210px] md:w-[260px] object-contain max-h-[260px]"
          />
        </div>

        {/* Right "4" */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[140px] sm:text-[200px] md:text-[280px] font-black leading-none select-none"
          style={{ color: 'var(--primary)', opacity: 0.25 }}
        >
          4
        </motion.div>
      </motion.div>

      {/* Footer Section */}
      <div className="flex flex-row items-end justify-end w-full mt-auto relative z-20">
        {/* Right Side: Expandable navigation menu */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={() => setIsMenuOpen(false)}
        >
          <div className="flex items-center flex-row-reverse gap-3">
            {/* Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 bg-white transition-all duration-300 focus:outline-none select-none cursor-pointer"
              style={{
                borderColor: 'var(--primary)',
                color: 'var(--ink)',
                boxShadow: '0 6px 20px rgba(100, 87, 255, 0.2)'
              }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 135 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                <Plus className="w-8 h-8 sm:w-9 sm:h-9" strokeWidth={3} />
              </motion.div>
            </button>

            {/* Expanded Menu Actions */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl border-2 font-bold text-base sm:text-lg transition-all duration-300 whitespace-nowrap bg-white cursor-pointer"
                    style={{
                      borderColor: 'var(--primary)',
                      color: 'var(--primary)',
                      boxShadow: '0 6px 20px rgba(100, 87, 255, 0.15)'
                    }}
                  >
                    <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                    Go Back
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 px-6 py-4 sm:px-8 sm:py-5 rounded-2xl text-white font-bold text-base sm:text-lg transition-all duration-300 whitespace-nowrap cursor-pointer"
                    style={{
                      background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 55%, var(--blue) 100%)',
                      boxShadow: '0 10px 30px rgba(100, 87, 255, 0.4)'
                    }}
                  >
                    <Home className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                    Go to Homepage
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
