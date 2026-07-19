import clsx from "clsx";

const variantClasses = {
  primary:
    "group relative overflow-hidden rounded-[14px] border border-white/20 bg-[linear-gradient(135deg,var(--primary)_0%,var(--primary-dark)_55%,var(--blue)_100%)] text-white shadow-[0_18px_34px_rgba(85,72,255,0.34)] transition-all duration-300 hover:-translate-y-[2px] hover:shadow-[0_24px_42px_rgba(85,72,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_15%,rgba(255,255,255,0.45)_50%,transparent_85%)] before:translate-x-[-140%] before:transition-transform before:duration-[1700ms] hover:before:translate-x-[140%]",
  ghost:
    "group relative overflow-hidden rounded-[14px] border-[1.5px] border-[color:var(--line)] bg-[linear-gradient(180deg,#ffffff_0%,var(--soft)_100%)] text-[color:var(--ink)] shadow-[0_14px_28px_rgba(32,42,82,0.06)] transition-all duration-300 hover:-translate-y-[2px] hover:border-[color:var(--primary)]/60 hover:text-[color:var(--primary-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--primary)]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white before:absolute before:inset-0 before:bg-[linear-gradient(120deg,transparent_15%,rgba(100,87,255,0.14)_50%,transparent_85%)] before:translate-x-[-140%] before:transition-transform before:duration-[1700ms] hover:before:translate-x-[140%]",
};

export default function Button({
  children,
  className,
  icon: Icon,
  iconPosition = "right",
  variant = "primary",
  as: Component = "button",
  type,
  ...props
}) {
  const isButton = Component === "button";

  return (
    <Component
      className={clsx(
        "inline-flex min-h-[50px] min-w-[164px] items-center justify-center gap-[9px] rounded-[14px] px-[24px] text-[13.5px] font-extrabold tracking-[0.01em] transition duration-300 disabled:cursor-not-allowed disabled:opacity-70",
        variantClasses[variant],
        className,
      )}
      type={isButton ? (type ?? "button") : undefined}
      {...props}
    >
      {Icon && iconPosition === "left" ? <Icon size={16} /> : null}
      <span>{children}</span>
      {Icon && iconPosition === "right" ? <Icon size={16} /> : null}
    </Component>
  );
}
