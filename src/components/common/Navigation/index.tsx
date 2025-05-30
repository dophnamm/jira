"use client";

import Link from "next/link";
import {
  GoHome,
  GoHomeFill,
  GoCheckCircle,
  GoCheckCircleFill,
} from "react-icons/go";
import { SettingsIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { routes } from "@/utils";

const navItems = [
  { label: "Home", href: routes.home, icon: GoHome, activeIcon: GoHomeFill },
  {
    label: "My Tasks",
    href: routes.tasks,
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: routes.settings,
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: routes.members,
    icon: UserIcon,
    activeIcon: UserIcon,
  },
];

const Navigation = () => {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();

  return (
    <ul className="flex flex-col">
      {navItems.map((item) => {
        const fullHref = `${routes.workspaces}/${workspaceId}${item.href}`;
        const isActive = pathname === fullHref;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link href={fullHref} key={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 font-medium hover:text-primary transition text-neutral-500 rounded-md",
                isActive && "bg-white hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {item.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};

export default Navigation;
