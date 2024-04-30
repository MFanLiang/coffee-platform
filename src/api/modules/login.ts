import { Login } from "@/api/interface/index";
import { PORT1 } from "@/api/config/servicePort";
import server from '@/api';
import type { loginFormType } from '../interface/loginTypes';

/**
 * @name 获取公钥接口
 */
const getPublicKey = () => {
	return server.get(`${PORT1}/security/publicKey`, {}, { headers: { noLoading: false, noCarryAuth: true } });
};

/**
 * @name 用户登录接口
 */
const reqLogin = (data: loginFormType) => {
	return server.post<Login.ResLogin>(`${PORT1}/user/login`, data, { headers: { noLoading: false, noCarryAuth: true } });
	// return http.post<Login.ResLogin>(PORT1 + `/login`, params);
	// return http.post<Login.ResLogin>(PORT1 + `/user/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	// return http.post<Login.ResLogin>(PORT1 + `/user/login`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	// return http.post<Login.ResLogin>(PORT1 + `/user/login`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
	// return http.post<Login.ResLogin>(PORT1 + `/user/login`, params, { headers: { noCarryAuth: true } }); // 控制当前请求不携带 Authorization 字段
};

/**
* @name 获取按钮权限
*/
const getAuthorButtons = () => {
	return server.get<Login.ResAuthButtons>(`${PORT1}/auth/buttons`, {}, { headers: { noLoading: true } });
};

/**
* @name 获取菜单列表
*/
const getMenuList = (userRole: number) => {
	return server.get<any>(`${PORT1}/menu/list`, {userRole}, { headers: { noLoading: true } });
};

export {
	getPublicKey,
	reqLogin,
	getAuthorButtons,
	getMenuList
};
