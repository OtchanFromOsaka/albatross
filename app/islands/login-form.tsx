import { useState } from "hono/jsx";

import { TextField } from "@/components/text-field";
import { Button } from "@/components/button";
import { apiClientV1 } from "@/routes/api/api-client";

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;

		try {
			const json = { username, password };
			const response = await apiClientV1.auth.login.$post({ json });

			if (response.status === 200) {
				window.location.href = "/";
			} else {
				setError("ログインに失敗しました");
			}
		} catch (error) {
			setError("ネットワークエラーが発生しました");
			console.log("Login error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form class="max-w-md mx-auto mt-8 space-y-6" onSubmit={handleSubmit}>
			{error && (
				<div class="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
			)}
			<TextField
				id="username"
				name="username"
				label="ユーザーID"
				placeholder="ユーザーIDを入力してください"
				required
			/>
			<TextField
				id="password"
				name="password"
				type="password"
				label="パスワード"
				placeholder="パスワードを入力してください"
				required
			/>
			<Button
				type="submit"
				disabled={isLoading}
				loading={isLoading}
				className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
			>
				ログイン
			</Button>
		</form>
	);
}
