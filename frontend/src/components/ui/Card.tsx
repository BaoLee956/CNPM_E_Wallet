import { type HTMLAttributes } from "react";

/* ============================================================
   Card — base surface component
   ============================================================ */

type Padding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: Padding;
  hoverable?: boolean;
  bordered?: boolean;
}

const paddingMap: Record<Padding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-6",
};

export function Card({
  padding = "md",
  hoverable = false,
  bordered = true,
  className = "",
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        "card",
        hoverable ? "card-hover cursor-pointer" : "",
        !bordered ? "border-transparent shadow-none" : "",
        paddingMap[padding],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

/* Sub-components */

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

Card.Header = function CardHeader({
  title,
  subtitle,
  action,
  className = "",
  children,
  ...props
}: CardHeaderProps) {
  if (children) {
    return (
      <div className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`flex items-start justify-between gap-4 mb-4 ${className}`}
      {...props}
    >
      <div>
        {title && (
          <h3 className="text-sm font-semibold text-primary">{title}</h3>
        )}
        {subtitle && (
          <p className="mt-0.5 text-xs text-secondary">{subtitle}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
};

Card.Divider = function CardDivider({
  className = "",
}: {
  className?: string;
}) {
  return <hr className={`divider -mx-5 my-4 ${className}`} />;
};

Card.Footer = function CardFooter({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-subtle flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/* ============================================================
   StatCard — KPI / metric display card
   ============================================================ */

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBg?: string;
  trend?: number;
  trendLabel?: string;
  loading?: boolean;
  className?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  iconBg = "bg-brand-subtle",
  trend,
  trendLabel = "vs last month",
  loading = false,
  className = "",
}: StatCardProps) {
  const isPositive = (trend ?? 0) >= 0;

  if (loading) {
    return (
      <Card className={className}>
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-24 bg-surface-sunken rounded" />
          <div className="h-7 w-32 bg-surface-sunken rounded" />
          <div className="h-3 w-20 bg-surface-sunken rounded" />
        </div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold tracking-wide uppercase text-secondary truncate">
            {title}
          </p>
          <p className="mt-1.5 text-2xl font-bold font-mono text-primary tabular-nums">
            {value}
          </p>
          {subtitle && (
            <p className="mt-0.5 text-xs text-tertiary">{subtitle}</p>
          )}
          {trend !== undefined && (
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-xs font-semibold ${
                  isPositive ? "text-success" : "text-danger"
                }`}
              >
                {isPositive ? "↑" : "↓"} {Math.abs(trend)}%
              </span>
              <span className="text-xs text-tertiary">{trendLabel}</span>
            </div>
          )}
        </div>

        {icon && (
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-brand-default ${iconBg}`}
          >
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
