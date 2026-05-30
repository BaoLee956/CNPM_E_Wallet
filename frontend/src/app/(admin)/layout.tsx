import { AdminLayout } from "@/components/ui";
import { LayoutDashboard, Users, ArrowLeftRight } from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard size={16} />,
  },
  { href: "/users", label: "Users", icon: <Users size={16} /> },
  {
    href: "/transactions",
    label: "Transactions",
    icon: <ArrowLeftRight size={16} />,
  },
];

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout navItems={navItems}>{children}</AdminLayout>;
}
