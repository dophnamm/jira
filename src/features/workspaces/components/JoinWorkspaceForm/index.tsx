"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import urlcat from "urlcat";

import { IWorkspaceInfo } from "@/models";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { routes } from "@/utils";

import { useJoinWorkspace } from "../../api/useJoinWorkspace";

interface IProps {
  initialValues: IWorkspaceInfo;
  id: string;
  inviteCode: string;
}

const JoinWorkspaceForm = (props: IProps) => {
  const { initialValues, id, inviteCode } = props;

  const router = useRouter();
  const { mutate, isPending } = useJoinWorkspace();

  const handleOnJoin = () => {
    mutate(
      {
        param: { id },
        json: { inviteCode },
      },
      {
        onSuccess: (workspace) => {
          router.push(urlcat(routes.workspaceDetail, { id: workspace.$id }));
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-xl font-bold">Join Workspace</CardTitle>

        <CardDescription>
          You&apos;re been invited to join <strong>{initialValues.name}</strong>{" "}
          workspace
        </CardDescription>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <div className="flex items-center justify-end gap-4">
          <Button variant="outline" type="button">
            <Link href={routes.home}>Cancel</Link>
          </Button>

          <Button type="button" onClick={handleOnJoin}>
            {!isPending ? "Join Workspace" : <Spinner />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
