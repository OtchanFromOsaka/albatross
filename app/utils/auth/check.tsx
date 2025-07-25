import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import type { Context } from "hono";

export async function checkAuthToken(c: Context): Promise<boolean> {
	const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

	const token = await getSignedCookie(c, SECRET_KEY, "auth");
	if (!token) {
		return false;
	}

	const payload = await verify(token, SECRET_KEY);

	const now = Math.floor(Date.now() / 1000);
	if (payload.exp && payload.exp < now) {
		return false;
	}

	return true;
}
