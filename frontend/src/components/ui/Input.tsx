import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
  type SelectHTMLAttributes,
} from "react";

/* ============================================================
   Input
   ============================================================ */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  prefix?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      iconLeft,
      iconRight,
      prefix,
      id,
      className = "",
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wide uppercase text-secondary"
          >
            {label}
            {props.required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {prefix && (
            <span className="absolute left-3 text-sm text-tertiary font-medium select-none">
              {prefix}
            </span>
          )}

          {iconLeft && !prefix && (
            <span className="absolute left-3 text-tertiary flex items-center">
              {iconLeft}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={[
              "input-base",
              prefix ? "pl-10" : iconLeft ? "pl-10" : "",
              iconRight ? "pr-10" : "",
              error
                ? "border-danger focus:border-danger focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-danger)_15%,transparent)]"
                : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            aria-invalid={error ? "true" : undefined}
            {...props}
          />

          {iconRight && (
            <span className="absolute right-3 text-tertiary flex items-center">
              {iconRight}
            </span>
          )}
        </div>

        {(hint || error) && (
          <p
            id={error ? `${inputId}-error` : `${inputId}-hint`}
            className={`text-xs ${error ? "text-danger" : "text-tertiary"}`}
          >
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

/* ============================================================
   Textarea
   ============================================================ */

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: "none" | "y" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, resize = "y", id, className = "", ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");
    const resizeClass =
      resize === "none"
        ? "resize-none"
        : resize === "y"
          ? "resize-y"
          : "resize";

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wide uppercase text-secondary"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          rows={4}
          className={[
            "input-base min-h-20",
            resizeClass,
            error ? "border-danger" : "",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {(hint || error) && (
          <p className={`text-xs ${error ? "text-danger" : "text-tertiary"}`}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";

/* ============================================================
   Select
   ============================================================ */

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, hint, error, placeholder, options, id, className = "", ...props },
    ref,
  ) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold tracking-wide uppercase text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={inputId}
            className={[
              "input-base appearance-none pr-9",
              error ? "border-danger" : "",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-tertiary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 5l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
        {(hint || error) && (
          <p className={`text-xs ${error ? "text-danger" : "text-tertiary"}`}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
