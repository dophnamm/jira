import React, { useState } from "react";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";

import { ITask } from "@/models";
import { dateFormat } from "@/utils";

import EventCard from "./components/EventCard";
import CustomToolbar from "./components/CustomToolbar";

import "dayjs/locale/en";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";

const localizer = dayjsLocalizer(dayjs);

export type TAction = "PREV" | "NEXT" | "TODAY";

interface IProps {
  data: ITask[];
}

const DataCalendar = (props: IProps) => {
  const { data } = props;

  const [value, setValue] = useState(
    data.length > 0 ? dayjs(data[0].dueDate) : dayjs()
  );

  const events = data.map((task) => {
    return {
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      title: task.name,
      project: task.project,
      assignee: task.assignee,
      status: task.status,
      id: task.$id,
    };
  });

  const handleNavigate = (action: TAction) => {
    if (action === "PREV") {
      setValue(value.subtract(1, "month"));
    } else if (action === "NEXT") {
      setValue(value.add(1, "month"));
    } else if (action === "TODAY") {
      setValue(dayjs());
    }
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        date={value.toDate()}
        events={events}
        views={["month"]}
        defaultView="month"
        toolbar
        showAllEvents
        className="h-full"
        max={dayjs().add(1, "year").toDate()}
        formats={{
          weekdayFormat: (date, culture, localizer) => {
            return localizer?.format(date, dateFormat.dayOfWeek, culture) ?? "";
          },
        }}
        components={{
          eventWrapper: ({ event }) => {
            return (
              <EventCard
                id={event.id}
                title={event.title}
                assignee={event.assignee}
                project={event.project}
                status={event.status}
              />
            );
          },

          toolbar: () => {
            return <CustomToolbar date={value} onNavigate={handleNavigate} />;
          },
        }}
      />
    </div>
  );
};

export default DataCalendar;
