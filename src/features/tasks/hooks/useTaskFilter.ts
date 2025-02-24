import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

import { ETaskStatus } from "@/models";

export const useTaskFilter = () => {
  return useQueryStates({
    projectId: parseAsString,
    assigneeId: parseAsString,
    status: parseAsStringEnum(Object.values(ETaskStatus)),
    search: parseAsString,
    dueDate: parseAsString,
  });
};
