"use client";

import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";

import { routes } from "@/utils";

const ErrorPage = () => {
  const router = useRouter();

  const handleOnBack = () => {
    router.push(routes.home);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center justify-center gap-2">
        <AlertTriangle />
        <p className="text-md text-muted-foreground">Something went wrong</p>
      </div>

      <Button onClick={handleOnBack}>Back to home</Button>
    </div>
  );
};

export default ErrorPage;
