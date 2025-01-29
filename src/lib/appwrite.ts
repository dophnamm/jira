import "server-only";

import {
  Client,
  Account,
  OAuthProvider,
  Databases,
  Users,
} from "node-appwrite";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { AUTH_COOKIES } from "@/features/auth/utils/constants";

import { routes } from "@/utils";

import { APPWRITE_ENDPOINT, APPWRITE_KEY, APPWRITE_PROJECT } from "@/config";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT);

  const session = await cookies().get(AUTH_COOKIES);

  if (!session || !session.value) {
    throw new Error("Unauthorized");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },

    get databases() {
      return new Databases(client);
    },
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT)
    .setKey(APPWRITE_KEY);

  return {
    get account() {
      return new Account(client);
    },
    get users() {
      return new Users(client);
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
