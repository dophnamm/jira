"use client";

import { useRouter } from "next/navigation";
import { FaAngleLeft } from "react-icons/fa6";
import { MoreVerticalIcon } from "lucide-react";

import { EMemberRole } from "@/models";

import { useWorkspaceId } from "@/features/workspaces/hooks/useWorkspaceId";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Avatar from "@/components/Avatar";
import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

import { useConfirmModal } from "@/hooks/useConfirmModal";

import { useGetMembers } from "../../api/useGetMembers";
import { useDeleteMember } from "../../api/useDeleteMember";
import { useUpdateMember } from "../../api/useUpdateMember";

const MembersList = () => {
  const router = useRouter();

  const workspaceId = useWorkspaceId();
  const { data, isLoading: isGettingMembers } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();
  const [contextModal, onConfirm] = useConfirmModal({
    title: "Remove member",
    message: "This member will be removed from the workspace",
    variant: "destructive",
  });

  const handleUpdateMember = (id: string, role: EMemberRole) => {
    const json = {
      role,
    };

    updateMember({
      json,
      param: { id },
    });
  };

  const handleDeleteMember = async (id: string) => {
    const ok = await onConfirm();

    if (!ok) return;

    deleteMember({ param: { id } });
  };

  const isLoading = isDeletingMember || isUpdatingMember;

  return (
    <>
      {contextModal}

      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row gap-5 p-7">
          <Button variant="ghost" onClick={router.back}>
            <FaAngleLeft />
          </Button>

          <CardTitle className="text-xl font-bold">Members List</CardTitle>
        </CardHeader>

        <div className="px-7">
          <DottedSeparator />
        </div>

        <CardContent className="p-7">
          {!isGettingMembers ? (
            data?.documents.map((member, index) => {
              return (
                <div key={member.$id}>
                  <div className="flex items-center gap-2">
                    <Avatar name={member.name} className="size-10" />

                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {member.email}
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild disabled={isLoading}>
                        <Button variant="ghost" className="ml-auto" size="sm">
                          {!isLoading ? (
                            <MoreVerticalIcon className="size-4 text-muted-foreground" />
                          ) : (
                            <Spinner />
                          )}
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent side="bottom" align="end">
                        <DropdownMenuItem
                          className="font-medium cursor-pointer"
                          onClick={() =>
                            handleUpdateMember(member.userId, EMemberRole.ADMIN)
                          }
                        >
                          Set as Administrator
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="font-medium cursor-pointer"
                          onClick={() =>
                            handleUpdateMember(
                              member.userId,
                              EMemberRole.MEMBER
                            )
                          }
                        >
                          Set as Member
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          className="font-medium text-destructive cursor-pointer"
                          onClick={() => handleDeleteMember(member.userId)}
                        >
                          Remove {member.name}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {index < data.documents.length - 1 && (
                    <Separator className="my-2.5" />
                  )}
                </div>
              );
            })
          ) : (
            <div>
              <Spinner className="size-6 mx-auto" />
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default MembersList;
