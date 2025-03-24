import { useState } from "react";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ResponsiveModal from "@/components/ResponsiveModal";

interface IProps {
  title: string;
  message: string;
  variant: ButtonProps["variant"];
  textCancel?: string;
  textConfirm?: string;
}

export const useConfirmModal = (
  props: IProps
): [JSX.Element | null, () => Promise<unknown>] => {
  const {
    title,
    message,
    variant = "default",
    textCancel = "Cancel",
    textConfirm = "Confirm",
  } = props;

  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const onConfirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleOnClose = () => {
    setPromise(null);
  };

  const handleOnConfirm = () => {
    promise?.resolve(true);
    handleOnClose();
  };

  const handleOnCancel = () => {
    promise?.resolve(false);
    handleOnClose();
  };

  const context = (
    <ResponsiveModal open={promise !== null} onOpenChange={handleOnClose}>
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="p-7">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription className="text-base">{message}</CardDescription>
        </CardHeader>

        <CardContent className="p-7 pt-0 flex gap-2 items-center">
          <Button variant="outline" className="w-full" onClick={handleOnCancel}>
            {textCancel}
          </Button>

          <Button
            variant={variant}
            className="w-full"
            onClick={handleOnConfirm}
          >
            {textConfirm}
          </Button>
        </CardContent>
      </Card>
    </ResponsiveModal>
  );

  return [context, onConfirm];
};
