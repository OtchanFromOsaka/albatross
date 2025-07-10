import { useState } from "hono/jsx";

import { apiClient } from "@/routes/api/api-client";

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
			const response = await apiClient.auth.login.$post({ json });

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
			<div class="text-left">
				<label
					for="username"
					class="block text-sm font-medium text-gray-700 mb-2"
				>
					ユーザーID
				</label>
				<input
					type="text"
					id="username"
					name="username"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="ユーザーIDを入力してください"
				/>
			</div>
			<div class="text-left">
				<label
					for="password"
					class="block text-sm font-medium text-gray-700 mb-2"
				>
					パスワード
				</label>
				<input
					type="password"
					id="password"
					name="password"
					required
					class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="パスワードを入力してください"
				/>
			</div>
			<button
				type="submit"
				disabled={isLoading}
				class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 disabled:opacity-50"
			>
				{isLoading ? "ログイン中..." : "ログイン"}
			</button>
		</form>
	);
}
