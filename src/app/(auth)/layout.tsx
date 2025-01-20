"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { routes } from "@/utils";

interface IProps {
  children?: React.ReactNode;
}

const AuthLayout = (props: IProps) => {
  const { children } = props;

  const pathname = usePathname();
  const isSignUp = pathname === routes.signUp;

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" width="84" height="100" alt="Logo" priority />

          <Button asChild variant="secondary">
            <Link href={isSignUp ? routes.signIn : routes.signUp}>
              {isSignUp ? "Login" : "Sign Up"}
            </Link>
          </Button>
        </nav>

        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
