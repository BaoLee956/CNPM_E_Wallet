import type { Metadata } from "next";
import "../styles/globals.css";
import { ToastContainer } from "@/components/ui/Toast";
import { seedDefaultUser } from "@/services/authService";
export const metadata: Metadata = {
  title: {
    template: "%s | E-Wallet",
    default: "E-Wallet",
  },
  description: "Secure digital wallet platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    seedDefaultUser();
  }
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=DM+Sans:ital,wght@0,400;0,500;0,600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
