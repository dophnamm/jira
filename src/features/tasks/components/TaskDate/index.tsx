import dayjs from "dayjs";

import { cn } from "@/lib/utils";

import { dateFormat } from "@/utils";

interface IProps {
  value: string | Date;
  className?: string;
}

const TaskDate = (props: IProps) => {
  const { value, className } = props;

  const today = dayjs();
  const endDate = dayjs(value);
  const diffInDays = today.diff(endDate, "days");

  let textColor = "text-muted-foreground";

  if (today.isBefore(endDate) && diffInDays >= 0) {
    if (diffInDays <= 3) {
      textColor = "text-orange-500";
    } else if (diffInDays <= 7) {
      textColor = "text-yellow-500";
    }
  } else if (today.isSame(endDate) || today.isAfter(endDate)) {
    textColor = "text-red-500";
  }

  return (
    <div className={textColor}>
      <span className={cn("truncate", className)}>
        {dayjs(value).format(dateFormat.common)}
      </span>
    </div>
  );
};

export default TaskDate;
