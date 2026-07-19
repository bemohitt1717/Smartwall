import { motion } from "framer-motion";
import { Loader2, Upload, Layers, Palette, Wand2, Download } from "lucide-react";

export function UploadingLoader() {
  return (
    <LoaderBase
      icon={Upload}
      title="Uploading..."
      description="Preparing your image"
      color="indigo"
    />
  );
}

export function DetectingWallsLoader() {
  return (
    <LoaderBase
      icon={Layers}
      title="Detecting walls..."
      description="Analyzing room structure"
      color="purple"
    />
  );
}

export function PreparingPreviewLoader() {
  return (
    <LoaderBase
      icon={Wand2}
      title="Preparing preview..."
      description="Setting up your workspace"
      color="cyan"
    />
  );
}

export function ApplyingPaintLoader() {
  return (
    <LoaderBase
      icon={Palette}
      title="Applying paint..."
      description="Visualizing color on wall"
      color="purple"
    />
  );
}

export function GeneratingExportLoader() {
  return (
    <LoaderBase
      icon={Download}
      title="Generating export..."
      description="Creating high-quality image"
      color="emerald"
    />
  );
}

function LoaderBase({ icon: Icon, title, description, color = "indigo" }) {
  const colorClasses = {
    indigo: {
      bg: "from-indigo-50 to-purple-50",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      spinnerColor: "border-indigo-600",
    },
    purple: {
      bg: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      spinnerColor: "border-purple-600",
    },
    cyan: {
      bg: "from-cyan-50 to-blue-50",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-600",
      spinnerColor: "border-cyan-600",
    },
    emerald: {
      bg: "from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      spinnerColor: "border-emerald-600",
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center"
    >
      <div className="relative mb-6">
        {/* Spinning border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-2xl"
        >
          <div className={`w-24 h-24 rounded-2xl border-4 border-transparent ${colors.spinnerColor} border-t-transparent`} />
        </motion.div>

        {/* Icon container */}
        <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
          <div className={`p-3 rounded-xl ${colors.iconBg}`}>
            <Icon className={`size-8 ${colors.iconColor}`} strokeWidth={2} />
          </div>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>

      {/* Animated dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 rounded-full bg-slate-400"
          />
        ))}
      </div>
    </motion.div>
  );
}

// Skeleton loader for content
export function SkeletonLoader() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 bg-slate-200 rounded-lg w-3/4" />
      <div className="h-4 bg-slate-200 rounded-lg w-1/2" />
      <div className="h-4 bg-slate-200 rounded-lg w-5/6" />
    </div>
  );
}

// Progress bar loader
export function ProgressLoader({ progress = 50, label = "Processing..." }) {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-sm font-bold text-indigo-600">{progress}%</p>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
        />
      </div>
    </div>
  );
}
