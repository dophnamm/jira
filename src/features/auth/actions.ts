import { cookies } from "next/headers";
import { Account, Client } from "node-appwrite";

import { APPWRITE_ENDPOINT, APPWRITE_PROJECT } from "@/config";

import { AUTH_COOKIES } from "./utils/constants";

export const getCurrentUser = async () => {
  try {
    const client = new Client()
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT);

    const session = await cookies().get(AUTH_COOKIES);

    if (!session) return null;

    client.setSession(session.value);

    const account = new Account(client);

    return await account.get();
  } catch {
    return null;
  }
};
