// utils/cloudinary.ts

export function getCloudinaryImageUrl(
  url: string,
  width: number,
  height: number,
  options: {
    crop?: "fill" | "fit" | "limit" | "pad" | "thumb";
    quality?: number | "auto" | "auto:best";
    format?: "jpg" | "png" | "webp" | "auto";
    gravity?: "auto" | "face" | "center" | "north" | "south" | "east" | "west";
    dpr?: number | "auto";
  } = {},
): string {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

  const {
    crop = "fill",
    quality = "auto:best",
    format = "auto",
    gravity = "auto",
    dpr = "auto",
  } = options;

  const transformations = [
    `w_${Math.round(width)}`,
    `h_${Math.round(height)}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`,
    `g_${gravity}`,
    `dpr_${dpr}`,
  ].join(",");

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
}

export function getOptimizedBankLogoUrl(logoUrl: string, displaySize: number = 48): string {
  const requestSize = displaySize * 2;
  return getCloudinaryImageUrl(logoUrl, requestSize, requestSize, {
    crop: "fill",
    quality: "auto:best",
    format: "auto",
    gravity: "auto",
    dpr: "auto",
  });
}