"use client";

import { useState } from "react";
import dayjs from "dayjs";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { dateFormat } from "@/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface IProps {
  value: Date | undefined;
  onChange: (date?: Date) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

const DatePicker = (props: IProps) => {
  const { value, onChange, className, placeholder, disabled } = props;

  const [open, setOpen] = useState<boolean>(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground",
            className
          )}
          onClick={toggle}
          disabled={disabled}
        >
          <CalendarIcon className="h-4 w-4" />
          {value ? (
            dayjs(value).format(dateFormat.common)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          disabled={disabled}
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date);
            toggle();
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
