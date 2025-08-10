import { useState } from "hono/jsx";

export default function AppBar() {
	const [query, setQuery] = useState("");

	return (
		<div class="w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-2 bg-white shadow">
			{/* Left: Title image */}
			<div class="flex items-center gap-2 flex-shrink-0">
				<img src="/favicon.ico" alt="Title" class="h-8 w-auto" />
				<div>title</div>
			</div>

			{/* Center: Search bar */}
			<form
				class="justify-self-center w-full max-w-[500px]"
				onSubmit={(e) => {
					e.preventDefault();
					// placeholder: handle search submit
					console.log("search:", query);
				}}
			>
				<input
					type="text"
					class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
					placeholder="検索..."
					value={query}
					onInput={(e) => setQuery((e.target as HTMLInputElement).value)}
				/>
			</form>

			{/* Right: Account icon button */}
			<button
				type="button"
				class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
				aria-label="Account"
				onClick={() => console.log("account clicked")}
			>
				{/* Simple placeholder icon */}
				<svg
					class="w-6 h-6 text-gray-600"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					role="img"
				>
					<title>Account</title>
					<circle cx="12" cy="8" r="4" />
					<path d="M4 20c1.5-4 6.5-6 8-6s6.5 2 8 6" />
				</svg>
			</button>
		</div>
	);
}
