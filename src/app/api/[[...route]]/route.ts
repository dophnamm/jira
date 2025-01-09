import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");

app.get("/health-check", (c) => {
  return c.json({ messages: "Ok" });
});

export const GET = handle(app);
