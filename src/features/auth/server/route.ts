import { Hono } from "hono";
import { setCookie, deleteCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";

import { SignInSchema, SignUpSchema } from "@/models";

import { createAdminClient } from "@/lib/appwrite";

import { LOGIN_API, LOGOUT_API, REGISTER_API } from "@/utils";

import { AUTH_COOKIES, cookieOptions } from "../utils/constants";

const app = new Hono()
  .post(LOGIN_API, zValidator("json", SignInSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIES, session.secret, cookieOptions);

    return c.json({ success: true });
  })
  .post(REGISTER_API, zValidator("json", SignUpSchema), async (c) => {
    const { email, name, password } = c.req.valid("json");

    const { account } = await createAdminClient();
    await account.create(ID.unique(), email, password, name);

    const session = await account.createEmailPasswordSession(email, password);

    setCookie(c, AUTH_COOKIES, session.secret, cookieOptions);

    return c.json({ success: true });
  })
  .post(LOGOUT_API, (c) => {
    deleteCookie(c, AUTH_COOKIES);

    return c.json({ success: true });
  });

export default app;
