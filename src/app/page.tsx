"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useLogout } from "@/features/auth/api/useLogout";
import { useCurrentUser } from "@/features/auth/api/useCurrentUser";

import { routes } from "@/utils";

export default function Home() {
  const router = useRouter();

  const { mutate } = useLogout();
  const { data, isLoading } = useCurrentUser();

  useEffect(() => {
    if (!data && !isLoading) {
      router.push(routes.signIn);
    }
  }, [data, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center grid gap-4">
        <h1>Hello world !</h1>

        <div>
          <Button size="lg" onClick={mutate}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
