import { motion } from "framer-motion";

const avatarUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=88";

export default function ProfileSettings({ user, register }) {
  const email = user?.email ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Profile Settings
      </h2>

      <div className="space-y-6">
        {/* Avatar */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <img
              src={user?.profileImage || avatarUrl}
              alt="Profile"
              className="size-20 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors" type="button">
                Change Photo
              </button>
              <p className="text-xs text-slate-500 mt-2">
                JPG, PNG or GIF. Max size 2MB
              </p>
            </div>
          </div>
        </div>

        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName")}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Email Address
          </label>
          <input
            readOnly
            type="email"
            defaultValue={email}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Bio
          </label>
          <textarea
            rows={4}
            placeholder="Tell us about yourself..."
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            {...register("bio")}
          />
        </div>
      </div>
    </motion.div>
  );
}
