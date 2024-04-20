import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  isCancel
} from "axios";
import { message } from 'antd';
import NProgress from "@/config/nprogress";
import { store } from '@/redux';
import { ResultData } from "@/api/interface";
import { setToken } from "@/redux/modules/global/action";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { ResultEnum } from "@/enums/httpEnum";
import { AxiosCanceler } from "./helper/axiosCancel";
import { checkStatus } from "./helper/checkStatus";

const axiosCanceler = new AxiosCanceler();

const config = {
  // 默认地址请求地址，可在 .env 开头文件中修改
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  // 设置超时时间（10s）
  timeout: 5000,
  // 跨域时候允许携带凭证
  withCredentials: true
};

class RequestNetworkHttp {
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    /** 创建 axios 网路请求实例 */
    this.service = axios.create(config);

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * 处理一些 开始进度条，请求头携带公共参数等场景
     * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // * 进度条插件执行开始
        NProgress.start();
        // * 获取系统的 token 信息
        const sysToken: string = store.getState().global.token;
        // * 将当前请求添加到 pending 中
        // axiosCanceler.addPending(config);

        // * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading，参见reqLogin请求体
        config.headers!.noLoading || showFullScreenLoading();
        if (!config.headers.noCarryAuth) {
          config!.headers['Authorization'] = sysToken;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    /**
     * @description 响应拦截器
     *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     * 响应拦截器，处理一些 进度条结束，简化服务器返回的数据，处理 http 网络请求错误等场景
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data, config } = response;

        // * 进度条插件执行结束
        NProgress.done();
        // * 在请求结束后，移除本次请求(关闭loading)
        // axiosCanceler.removePending(config);
        tryHideFullScreenLoading();

        // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }

        // 全局拦截掉 401 token 已过期的处理
        if (data.code === ResultEnum.OVERDUE) {
          store.dispatch(setToken(""));
          message.error("您当前登录已失效，请重新登录")
          window.location.hash = "/login";
          return Promise.reject(data.message);
        }
        return data;
      },
      async (error: AxiosError) => {
        const { response } = error;

        // * 进度条插件执行结束
        NProgress.done();
        tryHideFullScreenLoading();
        // * 请求时，若响应状态码 response.status 为 401，则默认处理登录失效
        // * 登录失效（code == 401）
        if (response) {
          if (response.status == ResultEnum.OVERDUE) {
            store.dispatch(setToken(""));
            message.error("您当前登录已失效，请重新登录")
            window.location.hash = "/login";
            return Promise.reject(response.data);
          }
        }

        // 请求超时单独判断，请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) message.error("请求超时，请稍后再试");
        // 根据响应的错误状态码，做不同的处理
        if (response) checkStatus(response.status);
        // 服务器结果都没有返回(可能服务器错误可能客户端断网) 断网处理:可以跳转到断网页面
        if (!window.navigator.onLine) window.location.hash = "/500";
        // 通过 CanelToken 取消的请求不做任何处理
        if (isCancel(error)) return Promise.reject(error);
        return Promise.reject(error);
      }
    )
  }

  // * 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object });
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object);
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, params, _object);
  }
  delete<T>(url: string, params?: any, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object });
  }
};

const server = new RequestNetworkHttp(config);
export default server;
