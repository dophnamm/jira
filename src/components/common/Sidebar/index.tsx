import Image from "next/image";
import Link from "next/link";

import { routes } from "@/utils";

import DottedSeparator from "../../DottedSeparator";
import Navigation from "../Navigation";

const Sidebar = () => {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href={routes.home}>
        <Image src="/logo.svg" alt="logo" width={64} height={48} />
      </Link>

      <DottedSeparator className="my-4" />

      <Navigation />
    </aside>
  );
};

export default Sidebar;
