import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

interface IProps {
  className?: string;
}

const Spinner = ({ className }: IProps) => {
  return (
    <Loader
      className={cn("size-4 animate-spin text-muted-foreground", className)}
    />
  );
};

export default Spinner;
