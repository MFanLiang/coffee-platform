// * 请求响应参数(不包含data)
export interface Result {
	/** http状态码 */
	code: number;
	/** 响应消息 */
	message: string;
	/** 总页数 */
	total?: number;
	/** 每页数量 */
	pageSize?: number;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	data: T[];
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
		userName: string;
		/** 密码 */
		passWord: string;
	}
	export interface userInfoType {
		/** 用户头像 */
		avatar: string;
		/** 创建时间 */
		createTime: string;
		/** 用户唯一id */
		id: string;
		/** 用户状态 */
		status: boolean;
		/** 手机号码 */
		tel: string;
		/** 更新时间 */
		updateTime: string;
		/** 用户全名 */
		userFullName: string;
		/** 用户名称 */
		userName: string;
		/** 用户权限 */
		userRole: number;
	}
	export interface ResLogin {
		/** 访问令牌 */
		accessToken: string;
		/** 令牌有效期 */
		expiresIn: string;
		/** 令牌类型 */
		tokenType: string;
		/** 当前登录用户信息 */
		userInfo: userInfoType
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
