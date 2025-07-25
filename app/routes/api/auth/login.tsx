import { Hono } from "hono";
import { validator } from "hono/validator";
import { setSignedCookie } from "hono/cookie";
import { sign } from "hono/jwt";
import type { JWTPayload } from "hono/utils/jwt/types";
import type { CookieOptions } from "hono/utils/cookie";

const schema = validator("json", (value) => {
	const { username, password } = value;
	if (typeof username !== "string" || typeof password !== "string") {
		console.log("Invalid request body:", value);
		return {
			username: "",
			password: "",
		};
	}
	return {
		username,
		password,
	};
});

async function authenticateUser(
	username: string,
	password: string,
): Promise<boolean> {
	return username === "admin" && password === "admin";
}

const app = new Hono();

export const route = app.post("/", schema, async (c) => {
	const { username, password } = c.req.valid("json");
	if (!username || !password) {
		return c.text("Bad Request", 400);
	}

	const isValidUser = await authenticateUser(username, password);
	if (!isValidUser) {
		return c.text("Unauthorized", 401);
	}

	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1); // 1時間後

	const jwtPayload: JWTPayload = {
		sub: username,
		role: "user",
		exp: Math.floor(expiration.getTime() / 1000),
	};

	const cookieOptions: CookieOptions = {
		path: "/",
		secure: process.env.NODE_ENV === "production",
		httpOnly: true,
		expires: expiration,
		sameSite: "Lax",
	};

	const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

	const token = await sign(jwtPayload, SECRET_KEY);
	await setSignedCookie(c, "auth", token, SECRET_KEY, cookieOptions);

	return c.text("OK", 200);
});

export default app;
