import { Hono } from "hono";
import { hc } from "hono/client";

import { route as apiV1AuthLogin } from "@/routes/api/v1/auth/login";
import { route as apiV1Images } from "@/routes/api/v1/images";

const app = new Hono()
	.route("/api/v1/auth/login", apiV1AuthLogin)
	.route("/api/v1/images", apiV1Images);

export const apiClientV1 = hc<typeof app>("").api.v1;
