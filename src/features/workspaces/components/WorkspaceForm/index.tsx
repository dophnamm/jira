import { useMemo, useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import { TCreateWorkspacesSchema, TUpdateWorkspacesSchema } from "@/models";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Spinner from "@/components/Spinner";
import DottedSeparator from "@/components/DottedSeparator";

interface IProps {
  formInstance: UseFormReturn<
    TCreateWorkspacesSchema | TUpdateWorkspacesSchema
  >;
  isPending: boolean;
  isEdit?: boolean;
  onSubmit: (value: TCreateWorkspacesSchema | TUpdateWorkspacesSchema) => void;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel?: () => void;
}

const WorkspaceForm = (props: IProps) => {
  const { formInstance, isPending, isEdit, onSubmit, onImageChange, onCancel } =
    props;

  const inputRef = useRef<HTMLInputElement>(null);

  const buttonText = useMemo(() => {
    return isEdit ? "Update Workspace" : "Create Workspace";
  }, [isEdit]);

  return (
    <Form {...formInstance}>
      <form onSubmit={formInstance.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={formInstance.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Enter workspace name"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={formInstance.control}
            name="image"
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-5">
                    {field.value ? (
                      <div className="size-[72px] relative rounded-md overflow-hidden">
                        <Image
                          src={
                            field.value instanceof File
                              ? URL.createObjectURL(field.value)
                              : field.value
                          }
                          fill
                          className="object-cover"
                          alt="image"
                        />

                        <Button
                          variant="ghost"
                          className="p-1 h-fit absolute z-5 right-0 top-0"
                          onClick={() => {
                            field.onChange(null);
                            if (inputRef.current) inputRef.current.value = "";
                          }}
                        >
                          <IoClose />
                        </Button>
                      </div>
                    ) : (
                      <Avatar className="size-[72px]">
                        <AvatarFallback>
                          <ImageIcon className="size-9 text-neutral-400" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div className="flex flex-col">
                      <p className="text-sm">Workspace Icon</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, JPEG, PNG or SVG max 1MB
                      </p>

                      <input
                        type="file"
                        accept=".jpg, .jpeg, .png, .svg"
                        className="hidden"
                        ref={inputRef}
                        disabled={isPending}
                        onChange={onImageChange}
                      />

                      <Button
                        type="button"
                        variant="teritary"
                        size="xs"
                        className="w-fit mt-2"
                        onClick={() => inputRef.current?.click()}
                      >
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        <DottedSeparator className="py-7" />

        <div className="flex items-center justify-end gap-4">
          <Button
            type="button"
            size="lg"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>

          <Button type="submit" size="lg" disabled={isPending}>
            {!isPending ? buttonText : <Spinner />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default WorkspaceForm;
