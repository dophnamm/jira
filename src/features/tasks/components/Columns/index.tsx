"use client";

import { MoreVertical } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { ITask } from "@/models";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import Avatar from "@/components/Avatar";

import { statusMapping } from "@/utils";

import TaskDate from "../TaskDate";
import TaskActions from "../TaskActions";

export const columns: ColumnDef<ITask>[] = [
  {
    accessorKey: "name",
    header: "Task Name",
    cell: ({ row }) => {
      const name = row.original.name;

      return <p className="line-clamp-1">{name}</p>;
    },
  },
  {
    accessorKey: "project",
    header: "Project",
    cell: ({ row }) => {
      const project = row.original.project;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <Avatar
            className="size-6"
            name={project?.name ?? ""}
            image={project?.imageUrl}
          />

          <p className="line-clamp-1">{project?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <p className="line-clamp-1">
            <TaskDate value={dueDate} />
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <Badge variant={status}>{statusMapping[status]}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => {
      const id = row.original.$id;
      const projectId = row.original.projectId;

      return (
        <TaskActions id={id} projectId={projectId}>
          <Button variant="ghost" className="size-8 p-0">
            <MoreVertical className="size-4" />
          </Button>
        </TaskActions>
      );
    },
  },
];
