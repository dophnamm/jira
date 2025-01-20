import { Hono } from "hono";
import { handle } from "hono/vercel";

import { API_BASE } from "@/utils";

import auth from "@/features/auth/server/route";
import workspaces from "@/features/workspaces/server/route";

const app = new Hono().basePath(API_BASE);

app.get("/health-check", (c) => {
  return c.json({ messages: "Ok" });
});

export const routes = app.route("", auth).route("", workspaces);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type TAppRoute = typeof routes;
