import React from "react";
import { PencilIcon, XIcon } from "lucide-react";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import DottedSeparator from "@/components/DottedSeparator";

import { ITask } from "@/models";

import { useUpdateTask } from "../../api/useUpdateTask";

interface IProps {
  task: ITask;
}

const TaskDescription = (props: IProps) => {
  const { task } = props;

  const [isEditing, setIsEditing] = React.useState(false);
  const [description, setDescription] = React.useState(task.description || "");

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({
      json: { description },
      param: { id: task.$id },
    });
  };

  const handleToggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="p-4 border rounded-lg ">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Overview</p>

        <Button size="sm" variant="outline" onClick={handleToggleEdit}>
          {isEditing ? (
            <XIcon className="size-4" />
          ) : (
            <PencilIcon className="size-4" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      <DottedSeparator className="my-4" />

      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            rows={4}
            value={description}
            disabled={isPending}
            placeholder="Add a description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? <Spinner /> : "Save Changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">No description set</span>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
