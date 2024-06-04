import type { SizeType } from "antd/lib/config-provider/SizeContext";

/* themeConfigProp */
export interface ThemeConfigProp {
	/** 系统主题颜色，默认值 天蓝色 */
	primary: string;
	/** 系统是否为深色模式 */
	isDark: boolean;
	/** 色弱模式(weak) || 灰色模式(gray) */
	weakOrGray: string;
	/** 是否启用面包屑导航 */
	breadcrumb: boolean;
	/** 是否启用 tabs 标签栏 */
	tabs: boolean;
	/** 是否启用底部系统版权信息 */
	footer: boolean;
}

/** global State Types */
export interface GlobalState {
	/** 用户鉴权 token 值 */
	token: string;
	/** 用户基本信息 */
	userInfo: any;
	/** 系统字典数据(全部) */
	sysDictGroup: any;
	/** 系统尺寸 */
	assemblySize: SizeType;
	/** 系统语言 */
	language: string;
	/** 系统主题配置 */
	themeConfig: ThemeConfigProp;
}

/** userInfo Types */
export interface userInfoType {
	userName: string;
	id: string;
	status: boolean;
	avatar: string;
	tel: string;
}

/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: Menu.MenuOptions[];
	currentClickKey?: string;
	submenu?: string[];
}

/* TabsState */
export interface TabsState {
	tabsActive: string;
	tabsList: Menu.MenuOptions[];
}

/* AuthState */
export interface AuthState {
	authButtons: {
		[propName: string]: any;
	};
	authRouter: string[];
}

/* BreadcrumbState */
export interface BreadcrumbState {
	breadcrumbList: {
		[propName: string]: any;
	};
}

/* studyReact */
export interface StudyReactState {
	/** tabs 激活的项 */
	tabsActiveKey: string;

	/**
	 * @name 图片上传类型
	 * @property picSingle 单一图片文件
	 * @property picMultiple 多个图片文件
	 * @property fileSingle
	 * @property fileMultiple
	*/
	picUploadType: 'picSingle' | 'multiple' | 'fileSingle' | 'fileMultiple';
}

/* picSelector */
export interface PicStateType {
	/** 页面是否为首次加载，true:页面刷新; false:首次加载 */
	isOnload: boolean;
	/** 文本编辑器值 */
	editorValue: string,
	/** 文本大小调节 */
	textSize: string;
	/** 文本颜色色值 */
	textColorValue: string;
}
