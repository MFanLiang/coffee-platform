/**
 * 使用方式示例
 * import * as utils from "@/utils/index";
 * utils.localGet() // 使用获取 localStorage 的工具函数
 */
import { RouteObject } from "@/routers/interface";

/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 * @return string
 */
export const localGet = (key: string) => {
	const value = window.localStorage.getItem(key);
	try {
		return JSON.parse(window.localStorage.getItem(key) as string);
	} catch (error) {
		return value;
	}
};

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 * @return void
 */
export const localSet = (key: string, value: any) => {
	window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 * @return void
 */
export const localRemove = (key: string) => {
	window.localStorage.removeItem(key);
};

/**
 * @description 清除所有localStorage
 * @return void
 */
export const localClear = () => {
	window.localStorage.clear();
};

/**
 * @description 获取浏览器默认语言
 * @return string
 */
export const getBrowserLang = () => {
	let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
	let defaultBrowserLang = "";
	if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
		defaultBrowserLang = "zh";
	} else {
		defaultBrowserLang = "en";
	}
	return defaultBrowserLang;
};

/**
 * @description 获取需要展开的 subMenu
 * @param {String} path 当前访问地址
 * @returns array
 */
export const getOpenKeys = (path: string) => {
	let newStr: string = "";
	let newArr: any[] = [];
	let arr = path.split("/").map(i => "/" + i);
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i];
		newArr.push(newStr);
	}
	return newArr;
};

/**
 * @description 获取 dom 元素节点
 * @param {String} domById id所在的dom节点
 * @returns elementNode | null
 */
export function getDomElement(domById: string) {
	return typeof domById === "string" ? document.getElementById(domById) : null;
}

/**
 * @description 数组去重方法01
 * @param arr 要去重的数组
 * @returns []
 */
export function unique1(arr: []) {
	return [...new Set(arr)];
}

/**
 * @description 数组去重方法02
 * @param arr 要去重的数组
 * @returns []
 */
export function unique2(arr: []) {
	var obj: any = {};
	return arr.filter(ele => {
		if (!obj[ele]) {
			obj[ele] = true;
			return true;
		}
	})
}

/**
 * @description 数组去重方法03
 * @param arr 要去重的数组
 * @returns []
 */
export function unique3(arr: []) {
	var result: any = [];
	arr.forEach(ele => {
		if (result.indexOf(ele) == -1) {
			result.push(ele)
		}
	})
	return result;
}

/**
 * @description 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由列表
 * @returns array
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	for (let item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};

/**
 * @description 递归当前路由的 所有 关联的路由，生成面包屑导航栏
 * @param {String} path 当前访问地址
 * @param {Array} menuList 菜单列表
 * @returns array
 */
export const getBreadcrumbList = (path: string, menuList: Menu.MenuOptions[]) => {
	let tempPath: any[] = [];
	try {
		const getNodePath = (node: Menu.MenuOptions) => {
			tempPath.push(node);
			// 找到符合条件的节点，通过throw终止掉递归
			if (node.path === path) {
				throw new Error("GOT IT!");
			}
			if (node.children && node.children.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					getNodePath(node.children[i]);
				}
				// 当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
				tempPath.pop();
			} else {
				// 找到叶子节点时，删除路径当中的该叶子节点
				tempPath.pop();
			}
		};
		for (let i = 0; i < menuList.length; i++) {
			getNodePath(menuList[i]);
		}
	} catch (e) {
		return tempPath.map(item => item.title);
	}
};

/**
 * @description 双重递归 找出所有 面包屑 生成对象存到 redux 中，就不用每次都去递归查找了
 * @param {String} menuList 当前菜单列表
 * @returns object
 */
export const findAllBreadcrumb = (menuList: Menu.MenuOptions[]): { [key: string]: any } => {
	let handleBreadcrumbList: any = {};
	const loop = (menuItem: Menu.MenuOptions) => {
		// 下面判断代码解释 *** !item?.children?.length   ==>   (item.children && item.children.length > 0)
		if (menuItem?.children?.length) menuItem.children.forEach(item => loop(item));
		else handleBreadcrumbList[menuItem.path] = getBreadcrumbList(menuItem.path, menuList);
	};
	menuList.forEach(item => loop(item));
	return handleBreadcrumbList;
};

/**
 * @description 使用递归处理路由菜单，生成一维数组，做菜单权限判断
 * @param {Array} routerList 所有菜单列表
 * @param {Array} newArr 菜单的一维数组
 * @return array
 */
export function handleRouter(routerList: Menu.MenuOptions[], newArr: string[] = []) {
	routerList.forEach((item: Menu.MenuOptions) => {
		typeof item === "object" && item.path && newArr.push(item.path);
		item.children && item.children.length && handleRouter(item.children, newArr);
	});
	return newArr;
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 * @return string
 */
export const isType = (val: any) => {
	if (val === null) return "null";
	if (typeof val !== "object") return typeof val;
	else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};

/**
 * @description 对象数组深克隆
 * @param {Object} obj 源对象
 * @return object
 */
export const deepCopy = <T>(obj: any): T => {
	let newObj: any;
	try {
		newObj = obj.push ? [] : {};
	} catch (error) {
		newObj = {};
	}
	for (let attr in obj) {
		if (typeof obj[attr] === "object") {
			newObj[attr] = deepCopy(obj[attr]);
		} else {
			newObj[attr] = obj[attr];
		}
	}
	return newObj;
};

/**
 * @description 生成随机数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 * @return number
 */
export function randomNum(min: number, max: number): number {
	let num = Math.floor(Math.random() * (min - max) + max);
	return num;
}

/**
 * 利用闭包，用封闭的环境保存一个缓存的返回值，以及一个是否执行过的状态，控制传入的函数只执行一次
 * @param func 用于控制执行的函数
 * @returns () = viod
 */
export function once(func: any) {
	let result: any;
	return function () {
		if (func) {
			// @ts-ignore
			result = func.apply(this, arguments);
			func = null;
		}
		return result;
	}
}

/**
	 * 解析 token 工具方法
	 * @param token token 加密口令
	 * @returns "{exp: number, iat: number, id: string, username: string}"
	 */
export function decodeToken(token: any) {
	try {
		const tokenPayload = token.split('.')[1];
		const decodedPayload = JSON.parse(atob(tokenPayload));
		return decodedPayload;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
}

/**
 * @description 返回当前的时间（1970年01月01日）
 * @returns 1970年01月01日23时59分59秒
 */
export function getDateTime() {
	const zeroFill = (i: any) => i < 10 ? i = "0" + i : i;
	let date = new Date();
	let year = date.getFullYear();
	let month = zeroFill(date.getMonth() + 1);
	let day = zeroFill(date.getDate());
	let hour = zeroFill(date.getHours());
	let minute = zeroFill(date.getMinutes());
	let second = zeroFill(date.getSeconds());
	return "" + year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒";
}

/**
 * @description 时间戳转换为年月日时分秒格式
 * @param timestamp 时间戳 【为10位需*1000，为13位不需*1000】
 * @returns string
 */
export function timestampToTime(timestamp: number) {
	let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	let Y = date.getFullYear() + '/';
	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
	let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
	let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
	let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
	return Y + M + D + h + m + s;
}
