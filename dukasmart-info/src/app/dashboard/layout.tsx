
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Gem,
  Menu,
  PanelLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { UserNav } from "@/components/user-nav";
import { DashboardNav } from "@/components/dashboard-nav";
import { DashboardStateProvider } from "./state-provider";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
  
    return (
      <DashboardStateProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <aside
            className={cn(
              "fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex transition-all duration-300 ease-in-out",
              isCollapsed && "w-14"
            )}
          >
            <div className="flex h-16 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-semibold text-primary"
              >
                <Gem className="h-6 w-6" />
                <span
                  className={cn(
                    "transition-opacity",
                    isCollapsed && "opacity-0 w-0"
                  )}
                >
                  DukaSmart
                </span>
              </Link>
            </div>
            <div className="flex-1">
              <div
                className={cn(
                  "flex flex-col items-start p-2",
                  isCollapsed && "items-center"
                )}
              >
                <DashboardNav isCollapsed={isCollapsed} />
              </div>
            </div>
          </aside>
          <div
            className={cn(
              "flex flex-col sm:pl-64 transition-all duration-300 ease-in-out",
              isCollapsed && "sm:pl-14"
            )}
          >
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Button
                variant="outline"
                size="icon"
                className="hidden sm:flex"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <div className="p-4">
                     <DashboardNav isCollapsed={false} />
                    </div>
                </SheetContent>
              </Sheet>
              <div className="ml-auto flex items-center gap-2">
                <UserNav />
              </div>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
          </div>
        </div>
      </DashboardStateProvider>
    );
  }
