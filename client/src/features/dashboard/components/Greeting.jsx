import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../../context/authContext.jsx";
import helloVideo from "../../../assets/video/Waving.svg";
import CreateProjectModal from "./CreateProjectModal.jsx";

const reducedMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.2 },
};

const fullMotion = {
  image: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  text: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  button: {
    initial: { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Greeting() {
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  return (
    <>
      <section className="mb-10">
        <div className="flex items-center justify-between gap-6">
          {/* Left side: Hello Video + Text */}
          <div className="flex items-center gap-6 flex-1">
            {/* Hello Video on the left */}
            <motion.div
              {...fullMotion.image}
              className="hidden md:block flex-shrink-0"
            >
              <div className="w-33 h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden shadow-sm">
                <img
                  src={helloVideo}
                  className="w-full h-full object-cover"
                  alt="Waving"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div {...fullMotion.text} className="flex-1">
              <h1
                className="text-3xl md:text-4xl font-bold leading-[1.15] md:mt-20 tracking-[-0.02em] text-slate-900"
                style={{ textWrap: "balance" }}
              >
                Welcome back{user?.fullName ? `, ${user.fullName}` : ""}
              </h1>
              <p className="mt-3 text-base md:text-lg text-slate-700 leading-relaxed max-w-[65ch]">
                Upload a room image to start visualizing paint colors instantly.
              </p>
            </motion.div>
          </div>

          {/* Right side: Create New Project Button */}
          <motion.button
            {...fullMotion.button}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all md:mt-20"
            type="button"
          >
            <Plus className="size-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Create New Project</span>
            <span className="sm:hidden">New Project</span>
          </motion.button>
        </div>
      </section>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
