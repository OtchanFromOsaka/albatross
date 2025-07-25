import { createRoute } from "honox/factory";

import Counter from "../islands/counter";
import { checkAuthToken } from "@/utils/auth/check";

export default createRoute(async (c) => {
	const isAuthenticated = await checkAuthToken(c);
	if (!isAuthenticated) {
		return c.redirect("/login");
	}

	const name = c.req.query("name") ?? "Hono";

	return c.render(
		<div class="py-8 text-center">
			<title>{name}</title>
			<h1 class="text-3xl font-bold">Hello, {name}!</h1>
			<Counter />
		</div>,
	);
});
