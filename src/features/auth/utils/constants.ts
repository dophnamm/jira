import { CookieOptions } from "hono/utils/cookie";

export const AUTH_COOKIES = "jira-clone-session";

export const cookieOptions: CookieOptions = {
  path: "/",
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  maxAge: 60 * 60 * 24 * 30,
};
