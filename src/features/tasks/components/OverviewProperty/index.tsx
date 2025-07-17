import React from "react";

interface IProps {
  label: string;
  children: React.ReactNode;
}

const OverviewProperty = (props: IProps) => {
  const { label, children } = props;

  return (
    <div className="flex items-center gap-x-2">
      <div className="min-w-[100px]">
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>

      <div className="flex items-center gap-x-2">{children}</div>
    </div>
  );
};

export default OverviewProperty;
