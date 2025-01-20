import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/components/common/ReactQueryProvider";

import "./globals.css";

const readexPro = Readex_Pro({ subsets: ["latin", "vietnamese"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Jira Clone",
    default: "Jira Clone",
  },
  description: "Created by Do Phuong Nam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          readexPro.className,
          "antialiased min-h-screen bg-neutral-50"
        )}
      >
        <Toaster />
        <ReactQueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
