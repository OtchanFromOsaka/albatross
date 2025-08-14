interface ViteTypeOptions {
	strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
	readonly MODE: string;
	readonly VITE_SECRET_KEY: string;
	readonly VITE_CLOUDFLARE_ACCOUNT_HASH: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
	glob: {
		// eager: true, as: "url" の場合
		(pattern: string, options: { eager: true; as: "url" }): Record<string, string>;
		// eager: true, as: "raw" の場合  
		(pattern: string, options: { eager: true; as: "raw" }): Record<string, string>;
		// eager: true, as指定なし の場合
		(pattern: string, options: { eager: true }): Record<string, any>;
		// eager: false または未指定 の場合
		(pattern: string, options?: { eager?: false; as?: "raw" | "url" | "worker"; import?: string }): Record<string, () => Promise<any>>;
	};
}
