"use client";

import {
  FileText,
  Home,
  BookOpen,
  BarChart,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "h-screen border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <h2 className="text-lg font-semibold">VT Health Reform</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      <nav className="space-y-1 p-2">
        <NavItem icon={Home} label="Dashboard" collapsed={collapsed} />
        <NavItem
          icon={FileText}
          label="Documents"
          collapsed={collapsed}
          active
        />
        <NavItem icon={BookOpen} label="Glossary" collapsed={collapsed} />
        <NavItem icon={BarChart} label="Analytics" collapsed={collapsed} />
        <NavItem icon={Settings} label="Settings" collapsed={collapsed} />
      </nav>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  collapsed,
  active,
}: {
  icon: any;
  label: string;
  collapsed: boolean;
  active?: boolean;
}) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn("w-full justify-start", collapsed ? "px-2" : "px-3")}
    >
      <Icon className="h-5 w-5" />
      {!collapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
}
