import type { SizeType } from "antd/lib/config-provider/SizeContext";

/* themeConfigProp */
export interface ThemeConfigProp {
	primary: string;
	isDark: boolean;
	weakOrGray: string;
	breadcrumb: boolean;
	tabs: boolean;
	footer: boolean;
}

/** userInfoState */
export interface userInfoType {
	/** 用户唯一标识ID */
	id: string;
	/** 用户头像地址 */
	avatar: string;
	/** 用户名称 */
	username: string;
	/** 用户全名 */
	userFullName: string;
	/** 用户手机号码 */
	tel: string;
	/** 用户角色 */
	userRole: number;
	/** 用户状态[激活，注销] */
	status: boolean;
}

/* GlobalState */
export interface GlobalState {
	token: string;
	userInfo: null | userInfoType;
	assemblySize: SizeType;
	language: string;
	themeConfig: ThemeConfigProp;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
}

/* TabsState */
export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}
