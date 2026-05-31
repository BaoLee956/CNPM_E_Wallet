// components/banks/BankLogo.tsx
"use client";

import { getOptimizedBankLogoUrl } from "@/utils/cloudinary";
import { useState } from "react";

interface BankLogoProps {
  logoUrl: string;
  bankName: string;
  size?: number; // kích thước hiển thị (px)
  className?: string;
  backgroundColor?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

export function BankLogo({
  logoUrl,
  bankName,
  size = 48,
  className = "",
  backgroundColor = "#f0f0f0",
  rounded = "xl",
}: BankLogoProps) {
  const [imgError, setImgError] = useState(false);
  // Yêu cầu ảnh đủ lớn để không bị mờ
  const optimizedUrl = getOptimizedBankLogoUrl(logoUrl, size);

  const roundedClasses = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    full: "rounded-full",
  };

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden shadow-sm ${roundedClasses[rounded]} ${className}`}
      style={{ width: size, height: size, backgroundColor }}
    >
      {!imgError ? (
        <img
          src={optimizedUrl}
          alt={bankName}
          className="h-full w-full object-cover"
          style={{ imageRendering: "crisp-edges" }} // tùy chọn, giúp logo không bị nhòe khi scale
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-2xl">🏦</span>
      )}
    </div>
  );
}
