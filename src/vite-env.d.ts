/// <reference types="vite/client" />
declare interface ImportMetaEnv {
	readonly VITE_GLOB_APP_TITLE: string;
	readonly VITE_PORT: number;
	readonly VITE_OPEN_BROWSER: boolean;
	readonly VITE_REPORT: boolean;
	readonly VITE_BUILD_VITE_BUILD_GZIP: boolean;
	readonly VITE_DROP_CONSOLE: boolean;
	readonly VITE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
