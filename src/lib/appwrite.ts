"use server";

import { Client, Account, OAuthProvider } from "node-appwrite";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { routes } from "@/utils";

import { APPWRITE_ENDPOINT, APPWRITE_KEY, APPWRITE_PROJECT } from "@/config";

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY);

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
