import { hc } from "hono/client";

import { TAppRoute } from "@/app/api/[[...route]]/route";

import { BFF_URL } from "@/config";

export const client = hc<TAppRoute>(BFF_URL);
