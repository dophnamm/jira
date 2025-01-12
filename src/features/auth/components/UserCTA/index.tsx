"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { useLogout } from "../../api/useLogout";
import { useCurrentUser } from "../../api/useCurrentUser";

const UserCTA = () => {
  const { mutateAsync: logout } = useLogout();
  const { data: user, isLoading } = useCurrentUser();

  const [isLogoutLoading, setIsLogoutLoading] = useState<boolean>(false);

  if (isLoading || isLogoutLoading)
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Spinner />
      </div>
    );

  if (!user) return null;

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    await logout();
    setIsLogoutLoading(false);
  };

  const { name, email } = user;
  const avatarFallback =
    (name ? name.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()) ??
    "U";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{name}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>

        <DottedSeparator className="mb-1" />

        <DropdownMenuItem
          onClick={handleLogout}
          className="h-10 flex items-center justify-center font-medium text-red-500 cursor-pointer"
        >
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserCTA;
