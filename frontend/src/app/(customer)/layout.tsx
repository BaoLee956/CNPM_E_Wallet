import { CustomerLayout } from "@/components/ui";
import { Home, ArrowLeftRight, Clock, User } from "lucide-react";

const navItems = [
  { href: "/home", label: "Home", icon: <Home size={20} /> },
  { href: "/transfer", label: "Transfer", icon: <ArrowLeftRight size={20} /> },
  { href: "/history", label: "History", icon: <Clock size={20} /> },
  { href: "/profile", label: "Profile", icon: <User size={20} /> },
];

export default function CustomerRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CustomerLayout navItems={navItems}>{children}</CustomerLayout>;
}
