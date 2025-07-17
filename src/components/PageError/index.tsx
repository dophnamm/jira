import React from "react";

import { AlertTriangleIcon } from "lucide-react";

interface IProps {
  message: string;
}

const PageError = (props: IProps) => {
  const { message = "Something Went Wrong" } = props;

  return (
    <div className="flex flex-col items-center justify-center h-ull">
      <AlertTriangleIcon className="size-6 text-muted-foreground mb-2" />

      <p className="text-sm font-medium text-muted-foreground">{message}</p>
    </div>
  );
};

export default PageError;
