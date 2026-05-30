/* ============================================================
   Table — data table for admin & customer transaction lists
   ============================================================ */

export interface Column<T> {
  key: string;
  header: string;
  accessor: (row: T) => React.ReactNode;
  sortable?: boolean;
  align?: "left" | "center" | "right";
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string | number;
  loading?: boolean;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  sortKey?: string;
  sortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  onRowClick?: (row: T) => void;
  stickyHeader?: boolean;
  className?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  loading = false,
  emptyMessage = "No data found",
  emptyIcon,
  sortKey,
  sortDir,
  onSort,
  onRowClick,
  stickyHeader = false,
  className = "",
}: TableProps<T>) {
  return (
    <div
      className={[
        "w-full overflow-x-auto rounded-xl",
        "border border-subtle",
        className,
      ].join(" ")}
    >
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr
            className={`border-b border-subtle bg-surface-sunken ${stickyHeader ? "sticky top-0 z-10" : ""}`}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={[
                  "h-10 px-4",
                  "text-xs font-semibold tracking-wide uppercase text-secondary",
                  col.align === "right"
                    ? "text-right"
                    : col.align === "center"
                      ? "text-center"
                      : "text-left",
                  col.sortable
                    ? "cursor-pointer select-none hover:text-primary transition-colors"
                    : "",
                ].join(" ")}
                onClick={() => col.sortable && onSort?.(col.key)}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <SortIcon
                      active={sortKey === col.key}
                      dir={sortKey === col.key ? sortDir : undefined}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-subtle last:border-0">
                {columns.map((col) => (
                  <td key={col.key} className="h-12 px-4">
                    <div
                      className="animate-pulse h-3 rounded bg-surface-sunken"
                      style={{ width: `${60 + Math.random() * 30}%` }}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length}>
                <div className="flex flex-col items-center justify-center gap-2 py-16 text-tertiary">
                  {emptyIcon ?? <EmptyIcon />}
                  <p className="text-sm">{emptyMessage}</p>
                </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={keyExtractor(row, idx)}
                className={[
                  "border-b border-subtle last:border-0",
                  "bg-surface-base",
                  "transition-colors duration-100",
                  onRowClick ? "cursor-pointer hover:bg-surface-sunken" : "",
                ].join(" ")}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      "h-12 px-4 py-2 text-primary",
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                          ? "text-center"
                          : "text-left",
                    ].join(" ")}
                  >
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ---- Sort icon ---- */
function SortIcon({ active, dir }: { active: boolean; dir?: "asc" | "desc" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      className={active ? "text-brand-default" : "opacity-30"}
    >
      <path
        d="M6 2L3 5h6L6 2z"
        fill={active && dir === "asc" ? "currentColor" : "currentColor"}
        fillOpacity={active && dir === "asc" ? 1 : 0.4}
      />
      <path
        d="M6 10L9 7H3l3 3z"
        fill={active && dir === "desc" ? "currentColor" : "currentColor"}
        fillOpacity={active && dir === "desc" ? 1 : 0.4}
      />
    </svg>
  );
}

function EmptyIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      className="opacity-30"
    >
      <rect
        x="6"
        y="10"
        width="28"
        height="22"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 16h16M12 21h10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============================================================
   Pagination
   ============================================================ */

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  className = "",
}: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <p className="text-xs text-secondary">
        Showing{" "}
        <span className="font-medium text-primary">
          {start}–{end}
        </span>{" "}
        of <span className="font-medium text-primary">{total}</span>
      </p>

      <div className="flex items-center gap-1">
        <PageBtn
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 3L5 7l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PageBtn>

        {getPages(page, totalPages).map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-xs text-tertiary">
              …
            </span>
          ) : (
            <PageBtn
              key={p}
              onClick={() => onPageChange(p as number)}
              active={p === page}
            >
              {p}
            </PageBtn>
          ),
        )}

        <PageBtn
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M5 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PageBtn>
      </div>
    </div>
  );
}

function PageBtn({
  children,
  onClick,
  disabled = false,
  active = false,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  [key: string]: any;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "h-7 min-w-7 px-2 rounded-md text-xs font-medium",
        "transition-colors duration-100",
        active
          ? "bg-brand-default text-white"
          : "text-secondary hover:bg-surface-sunken hover:text-primary",
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

function getPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}
