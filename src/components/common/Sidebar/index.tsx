import Image from "next/image";
import Link from "next/link";

import WorkspaceSwitcher from "@/components/WorkspaceSwitcher";

import { routes } from "@/utils";

import DottedSeparator from "../../DottedSeparator";
import Navigation from "../Navigation";
import Projects from "../Projects";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={routes.home}>
        <Image
          src="/logo.svg"
          alt="logo"
          width={64}
          height={48}
          className="mx-auto"
        />
      </Link>

      <DottedSeparator className="my-4" />

      <WorkspaceSwitcher />

      <DottedSeparator className="my-4" />

      <Navigation />

      <DottedSeparator className="my-4" />

      <Projects />
    </aside>
  );
};

export default Sidebar;
