import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  CreditCard,
  Shield,
  Save,
  Check,
} from "lucide-react";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import { useAuth } from "../../../../context/authContext.jsx";
import guestAvatar from "../../../../assets/images/user.png";

const settingsTabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Lock },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "billing", label: "Billing", icon: CreditCard },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const { user, updateUser } = useAuth();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || "",
        bio: user.bio || "",
      });
    }
  }, [user, reset]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const onSubmitProfile = async (data) => {
    try {
      const response = await updateUser({
        fullName: data.fullName,
        bio: data.bio,
      });
      setSaved(true);
      toast.success("Profile updated successfully");
      reset({ fullName: response.user.fullName, bio: response.user.bio || "" });
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("[Settings] Profile update failed", error);
      toast.error(error.response?.data?.message || "Could not update profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar />
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8 w-full overflow-y-auto">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Settings
              </h1>
              <p className="text-slate-600">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              {/* Settings Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl border border-slate-200 p-2">
                  {settingsTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        type="button"
                      >
                        <Icon className="size-5" strokeWidth={1.5} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Settings Content */}
              <div className="flex-1">
                <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                  {activeTab === "profile" && (
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
                              src={user?.profileImage || guestAvatar}
                              alt="Profile"
                              className="size-20 rounded-full object-cover ring-2 ring-slate-200"
                            />
                            <div>
                              <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors">
                                Change Photo
                              </button>
                              <p className="text-xs text-slate-500 mt-2">
                                JPG, PNG or GIF. Max size 2MB
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Name */}
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

                        {/* Email */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                          </label>
                          <input
                            readOnly
                            type="email"
                            defaultValue={user?.email || ""}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50"
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
                  )}

                  {activeTab === "notifications" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Notification Preferences
                      </h2>

                      <div className="space-y-6">
                        {[
                          {
                            title: "Project Updates",
                            description:
                              "Get notified when your projects are ready",
                          },
                          {
                            title: "New Colors",
                            description: "Alerts for new color releases",
                          },
                          {
                            title: "Marketing",
                            description: "Promotional offers and tips",
                          },
                          {
                            title: "Account Activity",
                            description: "Security alerts and account changes",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0"
                          >
                            <div className="flex-1">
                              <h3 className="font-semibold text-slate-900 mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-slate-600">
                                {item.description}
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                defaultChecked={index < 2}
                              />
                              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "security" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Security Settings
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Current Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>

                        <div className="pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-slate-900 mb-1">
                                Two-Factor Authentication
                              </h3>
                              <p className="text-sm text-slate-600">
                                Add an extra layer of security
                              </p>
                            </div>
                            <button className="px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 text-sm font-semibold hover:bg-indigo-50 transition-colors">
                              Enable
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "appearance" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h2 className="text-2xl font-bold text-slate-900 mb-6">
                        Appearance
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-3">
                            Theme
                          </label>
                          <div className="grid grid-cols-3 gap-4">
                            {["Light", "Dark", "System"].map((theme) => (
                              <button
                                key={theme}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  theme === "Light"
                                    ? "border-indigo-600 bg-indigo-50"
                                    : "border-slate-200 hover:border-slate-300"
                                }`}
                                type="button"
                              >
                                <div className="text-sm font-semibold text-slate-900">
                                  {theme}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={
                        activeTab === "profile"
                          ? handleSubmit(onSubmitProfile)
                          : handleSave
                      }
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
                      type="button"
                    >
                      <Save className="size-5" />
                      Save Changes
                    </motion.button>

                    {saved && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-emerald-600"
                      >
                        <Check className="size-5" />
                        <span className="text-sm font-medium">
                          Changes saved!
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
