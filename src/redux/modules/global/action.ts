import * as types from "@/redux/mutation-types";
import { ThemeConfigProp, userInfoType } from "@/redux/interface/index";

// * setToken
export const setToken = (token: string) => ({
	type: types.SET_TOKEN,
	token
});

// * setAssemblySize
export const setAssemblySize = (assemblySize: string) => ({
	type: types.SET_ASSEMBLY_SIZE,
	assemblySize
});

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	language
});

// * setThemeConfig
export const setThemeConfig = (themeConfig: ThemeConfigProp) => ({
	type: types.SET_THEME_CONFIG,
	themeConfig
});

// * setUserInfo
export const setUserInfo = (userInfo: userInfoType | null) => ({
	type: types.SET_USER_INFO,
	userInfo
});
