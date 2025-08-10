import { createRoute } from "honox/factory";

import { checkAuthToken } from "@/utils/auth/check";
import AppBar from "@/islands/app-bar";
import MasonryGallery from "@/islands/masonry-gallery";

export default createRoute(async (c) => {
	const isAuthenticated = await checkAuthToken(c);
	if (!isAuthenticated) {
		return c.redirect("/login");
	}

	return c.render(
		<>
			<AppBar />
			<MasonryGallery />
		</>,
	);
});
