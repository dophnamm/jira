import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { SignInSchema, SignUpSchema } from "@/models";

import { LOGIN_API, REGISTER_API } from "@/utils";

const app = new Hono()
  .post(LOGIN_API, zValidator("json", SignInSchema), async (c) => {
    const { email } = c.req.valid("json");

    return c.json({ email });
  })
  .post(REGISTER_API, zValidator("json", SignUpSchema), async (c) => {
    const { email, name } = c.req.valid("json");

    return c.json({ email, name });
  });

export default app;
