import { LogOut, Users, ClipboardList, BarChart3 } from "lucide-react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function SideBar() {
  const pathname = usePathname();

  // Define the routes for each link
  const routes = [
    { href: "/dashboard", icon: <BarChart3 />, label: "Dashboard" },
    { href: "/manage-users", icon: <Users />, label: "Manage Users" },
    { href: "/manage-loans", icon: <ClipboardList />, label: "Manage Loans" },
    { href: "/reports", icon: <BarChart3 />, label: "Reports" },
  ];

  return (
    <aside className="w-64 pl-5 py-32 bg-[#0A1124] text-white flex flex-col min-h-screen">  
      <nav className="flex-1 space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={clsx(
              "flex items-center gap-3 p-3 rounded-l-full transition-colors w-full",
              {
                "bg-white text-[#0A1124]": pathname === route.href, // Active link
                "text-gray-300 hover:text-white hover:bg-white/10": pathname !== route.href, // Inactive link
              }
            )}
          >
            {route.icon} {route.label}
          </Link>
        ))}
      </nav>

      <button className="mt-auto flex items-center gap-3 text-red-400 hover:text-red-500">
        <LogOut /> Logout
      </button>
    </aside>
  );
}