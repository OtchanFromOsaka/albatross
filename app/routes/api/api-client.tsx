import { Hono } from "hono";
import { hc } from "hono/client";

import { route as apiAuthLogin } from "@/routes/api/auth/login";

const app = new Hono().route("/api/auth/login", apiAuthLogin);

export const apiClient = hc<typeof app>("").api;
