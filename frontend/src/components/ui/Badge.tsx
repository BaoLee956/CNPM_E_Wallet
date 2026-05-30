/* ============================================================
   Badge — status labels, counts, tags
   ============================================================ */

type BadgeVariant =
  | "default"
  | "brand"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";

type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "bg-surface-sunken text-secondary border border-default",
  brand: "bg-brand-subtle text-brand-text border border-brand-border",
  success: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger",
  info: "bg-info-light text-info",
  outline: "border border-default text-secondary bg-transparent",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-tertiary",
  brand: "bg-brand-default",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  outline: "bg-tertiary",
};

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "badge",
        badgeVariants[variant],
        size === "sm" ? "text-2xs py-px px-1.5" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {dot && (
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`}
        />
      )}
      {children}
    </span>
  );
}

/* ============================================================
   StatusDot — minimal inline status indicator
   ============================================================ */

type Status = "active" | "inactive" | "pending" | "blocked" | "processing";

const statusConfig: Record<Status, { color: string; label: string }> = {
  active: { color: "bg-success", label: "Active" },
  inactive: { color: "bg-neutral-400", label: "Inactive" },
  pending: { color: "bg-warning", label: "Pending" },
  blocked: { color: "bg-danger", label: "Blocked" },
  processing: { color: "bg-info", label: "Processing" },
};

interface StatusDotProps {
  status: Status;
  showLabel?: boolean;
  pulse?: boolean;
}

export function StatusDot({
  status,
  showLabel = false,
  pulse = false,
}: StatusDotProps) {
  const { color, label } = statusConfig[status];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${color}`}
          />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${color}`}
        />
      </span>
      {showLabel && (
        <span className="text-xs text-secondary font-medium">{label}</span>
      )}
    </span>
  );
}

/* ============================================================
   Chip — selectable tag (for filters)
   ============================================================ */

interface ChipProps {
  selected?: boolean;
  onToggle?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Chip({
  selected = false,
  onToggle,
  children,
  className = "",
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={[
        "inline-flex items-center gap-1 h-7 px-3",
        "text-xs font-medium rounded-full",
        "border transition-all duration-150",
        "cursor-pointer select-none",
        selected
          ? "bg-brand-default text-white border-brand-default"
          : "bg-surface-base text-secondary border-default hover:border-brand-default hover:text-brand-text",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
}
