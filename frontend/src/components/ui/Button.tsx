import { forwardRef } from "react";
import { type ButtonHTMLAttributes } from "react";

/* ============================================================
   Button — Shared Component
   ============================================================ */

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "xs" | "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<Variant, string> = {
  primary: [
    "bg-brand-default text-on-brand",
    "hover:bg-brand-hover active:bg-brand-active",
    "shadow-xs",
  ].join(" "),

  secondary: [
    "bg-surface-base text-primary",
    "border border-default",
    "hover:bg-surface-sunken hover:border-strong",
  ].join(" "),

  ghost: [
    "bg-transparent text-secondary",
    "hover:bg-surface-sunken hover:text-primary",
  ].join(" "),

  outline: [
    "bg-transparent text-brand-default",
    "border border-brand-border",
    "hover:bg-brand-subtle hover:border-brand-default",
  ].join(" "),

  danger: [
    "bg-danger text-white",
    "hover:bg-danger-dark active:opacity-90",
    "shadow-xs",
  ].join(" "),
};

const sizeStyles: Record<Size, string> = {
  xs: "h-7 px-2.5 text-xs gap-1 rounded-md",
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-9 px-4 text-sm gap-2 rounded-lg",
  lg: "h-11 px-5 text-base gap-2 rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          // Base
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-150 ease-in-out",
          "select-none cursor-pointer",
          "focus-visible:ring-2 focus-visible:ring-brand-default focus-visible:ring-offset-2",
          // Variant
          variantStyles[variant],
          // Size
          sizeStyles[size],
          // Width
          fullWidth ? "w-full" : "",
          // Disabled
          isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {loading ? (
          <Spinner size={size === "xs" || size === "sm" ? 14 : 16} />
        ) : (
          iconLeft && <span className="shrink-0">{iconLeft}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && iconRight && <span className="shrink-0">{iconRight}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";

/* ---- Spinner ---- */
function Spinner({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className="animate-spin shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.25"
      />
      <path
        d="M14 8a6 6 0 0 0-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
