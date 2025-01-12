import Link from "next/link";
import {
  GoHome,
  GoHomeFill,
  GoCheckCircle,
  GoCheckCircleFill,
} from "react-icons/go";
import { SettingsIcon, UserIcon } from "lucide-react";

import { cn } from "@/lib/utils";

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
  return (
    <ul className="flex flex-col">
      {navItems.map((item) => {
        const isActive = false;
        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <Link href={item.href} key={item.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
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
