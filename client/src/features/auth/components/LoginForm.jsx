import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import clsx from "clsx";
import { registerUser, loginUser, googleLogin } from "../../../api/auth.api.js";
import { useAuth } from "../../../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";

const schemas = {
  login: z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters"),
  }),
  signup: z.object({
    name: z.string().trim().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Use at least 8 characters"),
  }),
  forgot: z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
  }),
};

const modeCopy = {
  login: {
    heading: "Welcome back",
    submit: "Continue",
    submitting: "Signing in…",
    switchPrompt: "New to SmartWall?",
    switchAction: "Create an account",
  },
  signup: {
    heading: "Create your account",
    submit: "Continue",
    submitting: "Creating account…",
    switchPrompt: "Already have an account?",
    switchAction: "Log in",
  },
  forgot: {
    heading: "Reset your password",
    submit: "Send reset link",
    submitting: "Sending link…",
  },
};

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.97 7.29C4.678 5.163 6.662 3.58 9 3.58Z"
      />
    </svg>
  );
}

function Field({ label, id, error, children, action }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-[13px] font-medium tracking-[-0.01em] text-[#38323a]"
        >
          {label}
        </label>
        {action}
      </div>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          className="text-[12px] font-medium text-[#b34769]"
          role="alert"
        >
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

function AuthInput({ error, className, ...props }) {
  return (
    <input
      className={clsx(
        "h-14 w-full rounded-[12px] border bg-[#fffefe] px-4 text-[15px] tracking-[-0.01em] text-[#211d22] outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-[#716a72] hover:border-[#c6bdc4] focus:border-[#6e4d82] focus:bg-white focus:ring-4 focus:ring-[#6e4d82]/12",
        error
          ? "border-[#d7899f] focus:border-[#b34769] focus:ring-[#b34769]/12"
          : "border-[#ddd7da]",
        className,
      )}
      {...props}
    />
  );
}

export default function LoginForm() {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const reduceMotion = useReducedMotion();
  const copy = modeCopy[mode];
  const { loadProfile } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: "", email: "", password: "" } });

  const changeMode = (nextMode) => {
    if (nextMode !== mode) {
      reset({ name: "", email: "", password: "" });
      setShowPassword(false);
      setMode(nextMode);
    }
  };

  /**
   * Handle form submission (Login/Register)
   */
  const onSubmit = async (values) => {
    console.log("🔵 [LoginForm] Form submitted:", {
      mode,
      values: { ...values, password: "***" },
    });

    const parsed = schemas[mode].safeParse(values);

    if (!parsed.success) {
      console.log("❌ [LoginForm] Validation failed:", parsed.error.issues);
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0];
        setError(field, { message: issue.message });
      });
      return;
    }

    try {
      if (mode === "signup") {
        console.log("🔵 [LoginForm] Calling registerUser API...");

        const response = await registerUser({
          fullName: values.name,
          email: values.email,
          password: values.password,
        });

        console.log("✅ [LoginForm] Registration successful:", response);
        toast.success("Account created! Signing you in...");

        const loginResponse = await loginUser({
          email: values.email,
          password: values.password,
        });

        localStorage.setItem("token", loginResponse.token);
        await loadProfile();
        console.log(
          "✅ [LoginForm] Token stored and profile loaded after signup",
        );

        navigate("/dashboard");
        return;
      } else if (mode === "login") {
        console.log("🔵 [LoginForm] Calling loginUser API...");

        const response = await loginUser({
          email: values.email,
          password: values.password,
        });

        console.log("✅ [LoginForm] Login successful:", response);

        localStorage.setItem("token", response.token);
        await loadProfile();
        console.log("✅ [LoginForm] Token stored and profile loaded");

        toast.success("Welcome back!");

        console.log("🔵 [LoginForm] Navigating to /dashboard");
        navigate("/dashboard");
      } else if (mode === "forgot") {
        console.log("⚠️ [LoginForm] Forgot password not implemented yet");
        toast.error("Password reset not implemented yet");
      }
    } catch (error) {
      console.error("❌ [LoginForm] API Error:", error);

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error("❌ [LoginForm] Error message:", errorMessage);

      toast.error(errorMessage);

      // Set form error
      if (error.response?.status === 404) {
        setError("email", { message: "User not found" });
      } else if (error.response?.status === 401) {
        setError("password", { message: "Invalid password" });
      } else if (error.response?.status === 409) {
        setError("email", { message: "Email already registered" });
      }
    }
  };

  /**
   * Handle Google Login
   */
  const handleGoogleSuccess = async (credentialResponse) => {
    console.log("🔵 [LoginForm] Google login credential received");

    try {
      console.log("🔵 [LoginForm] Calling googleLogin API...");

      const response = await googleLogin(credentialResponse.credential);

      console.log("✅ [LoginForm] Google login successful:", response);

      localStorage.setItem("token", response.token);
      await loadProfile();
      console.log("✅ [LoginForm] Token stored and profile loaded");

      toast.success("Welcome!");

      console.log("🔵 [LoginForm] Navigating to /dashboard");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ [LoginForm] Google login error:", error);
      const errorMessage =
        error.response?.data?.message || "Google login failed";
      toast.error(errorMessage);
    }
  };

  const handleGoogleError = () => {
    console.error("❌ [LoginForm] Google login failed");
    toast.error("Google login failed");
  };

  const passwordField =
    mode !== "forgot" ? (
      <Field
        label={mode === "signup" ? "Create password" : "Password"}
        id="password"
        error={errors.password}
        action={
          mode === "login" ? (
            <button
              type="button"
              onClick={() => changeMode("forgot")}
              className="rounded-md text-[13px] font-medium text-[#654678] transition-colors hover:text-[#3f294e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4d82]/25"
            >
              Forgot password?
            </button>
          ) : null
        }
      >
        <div className="relative">
          <AuthInput
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete={
              mode === "signup" ? "new-password" : "current-password"
            }
            placeholder={
              mode === "signup" ? "Create a password" : "Enter your password"
            }
            aria-invalid={errors.password ? "true" : "false"}
            aria-describedby={errors.password ? "password-error" : undefined}
            error={errors.password}
            className="pr-12"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-[9px] text-[#756d75] transition-colors hover:bg-[#f3eff3] hover:text-[#312a32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4d82]/25"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={18} strokeWidth={1.55} aria-hidden="true" />
            ) : (
              <Eye size={18} strokeWidth={1.55} aria-hidden="true" />
            )}
          </button>
        </div>
      </Field>
    ) : null;

  const transition = reduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.22, 1, 0.36, 1] };

  return (
    <div className="mt-10">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          layout
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.985 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }
          }
          transition={transition}
        >
          <h1 className="text-balance text-[32px] font-semibold leading-[1.08] tracking-[-0.045em] text-[#211d22] sm:text-[36px]">
            {copy.heading}
          </h1>

          <form
            className="mt-9 space-y-5"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {mode !== "forgot" ? (
              <>
                <div className="space-y-3">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    render={(renderProps) => (
                      <button
                        type="button"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        className="group flex h-14 w-full items-center justify-center gap-3 rounded-[18px] border border-[#dcd7dc] bg-white px-5 text-[15px] font-semibold tracking-[-0.015em] text-[#211d22] shadow-sm transition-[background-color,border-color,box-shadow] duration-200 hover:border-[#a69aa8] hover:bg-[#faf7fb] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-[#f8f7f9] shadow-sm">
                          <GoogleMark />
                        </span>
                        <span className="text-[15px] font-semibold text-[#1f1b20]">
                          {mode === "login"
                            ? "Continue with Google"
                            : "Create account with Google"}
                        </span>
                      </button>
                    )}
                  />
                </div>

                <div className="flex items-center gap-3 text-[13px] font-medium text-[#716970]">
                  <span className="flex-1 h-px bg-[#e5e1e4]" />
                  <span className="whitespace-nowrap">
                    or continue with email
                  </span>
                  <span className="flex-1 h-px bg-[#e5e1e4]" />
                </div>
              </>
            ) : null}

            {mode === "signup" ? (
              <Field label="Full name" id="name" error={errors.name}>
                <AuthInput
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  error={errors.name}
                  {...register("name")}
                />
              </Field>
            ) : null}

            <Field label="Email" id="email" error={errors.email}>
              <AuthInput
                id="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                spellCheck={false}
                placeholder="name@company.com"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                error={errors.email}
                {...register("email")}
              />
            </Field>

            {passwordField}

            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-[12px] bg-[#28232a] px-5 text-[15px] font-semibold tracking-[-0.015em] text-white shadow-[0_7px_16px_rgba(40,35,42,0.16)] transition-[transform,background-color,box-shadow] duration-200 hover:bg-[#3a2d3e] hover:shadow-[0_8px_18px_rgba(57,43,62,0.2)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6e4d82]/25 active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  {copy.submitting}
                </>
              ) : (
                <>
                  {copy.submit}
                  {mode !== "forgot" ? (
                    <ArrowRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  ) : null}
                </>
              )}
            </button>
          </form>

          <div className="mt-7 text-center text-[14px] tracking-[-0.01em] text-[#716970]">
            {mode === "forgot" ? (
              <button
                type="button"
                onClick={() => changeMode("login")}
                className="rounded-md font-medium text-[#654678] transition-colors hover:text-[#3f294e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4d82]/25"
              >
                Back to login
              </button>
            ) : (
              <>
                {copy.switchPrompt}{" "}
                <button
                  type="button"
                  onClick={() =>
                    changeMode(mode === "login" ? "signup" : "login")
                  }
                  className="rounded-md font-medium text-[#654678] transition-colors hover:text-[#3f294e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6e4d82]/25"
                >
                  {copy.switchAction}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
