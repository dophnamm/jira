import { Hono } from "hono";
import { handle } from "hono/vercel";

import { API_BASE } from "@/utils";

import authApp from "@/features/auth/server/route";

const app = new Hono().basePath(API_BASE);

app.get("/health-check", (c) => {
  return c.json({ messages: "Ok" });
});

const routes = app.route("", authApp);

export const GET = handle(app);
export const POST = handle(app);

export type TAppRoute = typeof routes;
