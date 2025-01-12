"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TSignInForm, SignInSchema } from "@/models";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import DottedSeparator from "@/components/DottedSeparator";

import { useSignIn } from "../../api/useSignIn";

const SignInCard = () => {
  const { mutateAsync, isPending } = useSignIn();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formInstance = useForm<TSignInForm>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleOnSubmit = async (values: TSignInForm) => {
    setIsLoading(true);
    await mutateAsync({ json: values });
    setIsLoading(false);
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex justify-center items-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7">
        <Form {...formInstance}>
          <form
            onSubmit={formInstance.handleSubmit(handleOnSubmit)}
            className="space-y-4"
          >
            <FormField
              name="email"
              control={formInstance.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="email"
                        placeholder="Enter your email"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="password"
              control={formInstance.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type="password"
                        placeholder="Enter your password"
                        min={8}
                        max={256}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit" size="lg" className="w-full" disabled={false}>
              {!isLoading ? (
                "Login"
              ) : (
                <Loader className="size-4 animate-spin text-muted-foreground" />
              )}
            </Button>
          </form>
        </Form>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          disabled={isPending}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <FcGoogle className="!size-5" />
          Login with Google
        </Button>

        <Button
          type="submit"
          disabled={isPending}
          variant="outline"
          size="lg"
          className="w-full"
        >
          <FaGithub className="!size-5" />
          Login with Github
        </Button>
      </CardContent>

      <div className="px-7">
        <DottedSeparator />
      </div>

      <CardFooter className="p-7 text-center items-center justify-center">
        <CardDescription>
          You don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-blue-700">
            Sign up
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default SignInCard;
