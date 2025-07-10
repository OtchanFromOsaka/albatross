import type {} from "hono";

declare module "process" {
	global {
		namespace NodeJS {
			interface ProcessEnv {
				NODE_ENV?: string;
				VITE_SECRET_KEY?: string;
			}
		}
	}
}

declare module "hono" {
	interface Env {
		Variables: {};
		Bindings: {};
	}
}
