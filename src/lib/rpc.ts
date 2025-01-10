import { hc } from "hono/client";

import { TAppRoute } from "@/app/api/[[...route]]/route";

export const client = hc<TAppRoute>(process.env.NEXT_PUBLIC_BFF_URL);
