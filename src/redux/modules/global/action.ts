import * as types from "../../mutation-types";
import { ThemeConfigProp } from "@/redux/interface";

// SET_TOKEN
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token,
});

// SET_ASSEMBLY_SIZE
export const setAssemblySize = (assemblySize: number) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize,
});

//SET_LANGUAGE
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language,
});

// SET_THEME_CONFIG
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig,
});
