import { createRoute } from "honox/factory";
import { getSignedCookie } from "hono/cookie";
import { verify } from "hono/jwt";

import Counter from "../islands/counter";

export default createRoute(async (c) => {
	const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

	const token = await getSignedCookie(c, SECRET_KEY, "auth");
	if (!token) {
		return c.redirect("/login");
	}

	const payload = await verify(token, SECRET_KEY);

	const now = Math.floor(Date.now() / 1000);
	if (payload.exp && payload.exp < now) {
		return c.redirect("/login");
	}

	const name = c.req.query("name") ?? "Hono";

	return c.render(
		<div class="py-8 text-center">
			<title>{name}</title>
			<h1 class="text-3xl font-bold">Hello, {name}!</h1>
			<p class="text-sm text-gray-600 mb-4">ログイン中: {payload.sub}</p>
			<Counter />
		</div>,
	);
});
