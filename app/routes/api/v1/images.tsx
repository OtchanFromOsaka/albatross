import { Hono } from "hono";

import { checkAuthToken } from "@/utils/auth/check";
import type { Image } from "@/config";

const app = new Hono();

export const route = app.post("/", async (c) => {
	const isAuthenticated = await checkAuthToken(c);
	if (!isAuthenticated) {
		return c.json({ error: "Unauthorized" }, 401);
	}

	// TODO: Cloudflare D1 (開発環境はSQLite) から画像を取得するロジック
	const images: Array<Image> = [
		{
			"id": "image-0",
			"src": "dev-images/20250621-A1_02458.jpg",
			"alt": "Image 0",
			"width": 3840,
			"height": 2160
		},
		{
			"id": "image-1",
			"src": "dev-images/20250621-A1_02468.jpg",
			"alt": "Image 1",
			"width": 3840,
			"height": 2160
		},
	]

	return c.json(images, 200);
});

export default app;
