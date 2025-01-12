"use server";

import { Client, Account, OAuthProvider } from "node-appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/utils";

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.NEXT_APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
  };
};

export const signInWithGithub = async () => {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Github,
    `${origin}${routes.home}`,
    `${origin}${routes.signUp}`
  );

  return redirect(redirectUrl);
};
