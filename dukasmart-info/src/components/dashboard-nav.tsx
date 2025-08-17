"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Boxes, LayoutDashboard, BarChart3, User, CircleHelp } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export function DashboardNav({ isCollapsed }: { isCollapsed: boolean }) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/dashboard/inventory",
      label: "Inventory",
      icon: Boxes,
    },
    {
      href: "/dashboard/reports",
      label: "Reports",
      icon: BarChart3,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/help",
      label: "Help",
      icon: CircleHelp,
    },
  ];
  
  return (
    <TooltipProvider>
      <nav className="grid gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return isCollapsed ? (
            <Tooltip key={item.href} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-9 md:w-9",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.label}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-accent text-accent-foreground hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </TooltipProvider>
  );
}
