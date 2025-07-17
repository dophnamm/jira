import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { dateFormat } from "@/utils";

import { Button } from "@/components/ui/button";

import { TAction } from "../../index";

interface IProps {
  date: Dayjs;
  onNavigate: (action: TAction) => void;
}

const CustomToolbar = (props: IProps) => {
  const { date, onNavigate } = props;

  const handlePrev = () => {
    onNavigate("PREV");
  };

  const handleNext = () => {
    onNavigate("NEXT");
  };

  return (
    <div className="flex mb-4 gap-x-2 items-center w-full justify-center">
      <Button
        variant="outline"
        size="icon"
        className="flex items-center"
        onClick={handlePrev}
      >
        <ChevronLeftIcon className="size-4" />
      </Button>

      <div className="flex items-center justify-center border border-input rounded-md px-3 py-2 h-8 w-full ">
        <CalendarIcon className="size-4 mr-2" />
        <p className="text-sm">{dayjs(date).format(dateFormat.monthAndYear)}</p>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="flex items-center"
        onClick={handleNext}
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
};

export default CustomToolbar;
