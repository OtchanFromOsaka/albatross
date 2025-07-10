import { createRoute } from "honox/factory";

import { PROJECT_NAME } from "@/config";
import LoginForm from "@/islands/login-form";

export default createRoute((c) => {
	return c.render(
		<div class="py-8 text-center">
			<title>ログイン | {PROJECT_NAME}</title>
			<h1 class="text-3xl font-bold">ログイン</h1>
			<LoginForm />
		</div>,
	);
});
