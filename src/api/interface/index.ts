// * 请求响应参数(不包含data)
export interface Result {
	code: number;

	message: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		/** 用户名 */
		username: string;
		/** 密码 */
		password: string;
	}
	export interface userInfoType { 
		/** 用户头像 */
		avatar: string;
		/** 创建时间 */
		createdAt: string;
		/** 用户唯一id */
		id: string;
		/** 用户状态 */
		status: boolean;
		/** 手机号码 */
		tel: string;
		/** 更新时间 */
		updateAt: string;
		/** 用户全名 */
		user_full_name: string;
		/** 用户权限 */
		user_role: number;
		/** 用户名称 */
		username: string;
	}
	export interface ResLogin {
		access_token: string;
		expires_in: string;
		refresh_token: string;
		token_type: string;
		userInfo: userInfoType
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
