import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import { ResultEnum } from "@/enums/httpEnum";
import { store } from "@/redux";
import { setToken } from "@/redux/modules/global/action";
import { ResultData } from "./interface";
import { checkStatus } from "./helper/checkStatus";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import NProgress from "@/config/nprogress";

const axiosCanceler = new AxiosCanceler();

const config = {
	baseURL: import.meta.env.VITE_API_URL, // 默认请求地址，可在env文件中修改
	timeout: 10000, // 请求超时时间(10s)
	withCredentials: true, // 是否允许带cookie
};

class RequestHttp {
	service: AxiosInstance;
	public constructor(config: AxiosRequestConfig) {
		// 实例化axios
		this.service = axios.create(config);

		/**
		 * @description:请求拦截器
		 * 客户端发送请求 -> 请求拦截器 -> 服务器
		 * token校验(JWT):接收服务器返回的token，存储到redux/本地存储当中
		 */

		this.service.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				NProgress.start();
				axiosCanceler.addPending(config);
				// * 如果当前请求不需要显示 loading,在api服务中通过指定的第三个参数: { headers: { noLoading: true } }来控制不显示loading
				config.headers!.noLoading || showFullScreenLoading();
				const token: string = store.getState().global.token;
				if (token && config.headers) {
					config.headers.set("x-access-token", token);
				}
				return config;
			},
			(err: AxiosError) => Promise.reject(err)
		);

		/**
		 * @description: 响应拦截器
		 * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data, config } = response;
				NProgress.done();
				// axiosCanceler.removePending(config);
				tryHideFullScreenLoading();
				// 登录失效
				if (data.code === ResultEnum.OVERDUE) {
					store.dispatch(setToken(""));
					message.error(data.msg);
					window.location.href = "/login";
					return Promise.reject(data);
				}
				//  全局错误信息拦截（防止下载文件的时候返回数据流，没有code，直接报错）
				if (data.code && data.code !== ResultEnum.SUCCESS) {
					message.error(data.msg);
					return Promise.reject(data);
				}
				// * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
				return data;
			},
			(err: AxiosError) => {
				const { response } = err;
				NProgress.done();
				tryHideFullScreenLoading();
				// 请求超时，没有response
				if (err.message.indexOf("timeout") !== -1) {
					message.error("请求超时, 请稍后再试");
				}
				// 根据响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器响应没有返回（可能服务器错误或者客户端断网）断网处理跳转到断网页面
				if (!window.navigator.onLine) {
					window.location.hash = "/500";
				}
				return Promise.reject(err);
			}
		);
	}

	// 请求方法封装
	get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.get(url, { params, ..._object });
	}
	post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.post(url, params, _object);
	}
	put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.put(url, params, _object);
	}
	delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.delete(url, { params, ..._object });
	}
	patch<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
		return this.service.patch(url, { params, ..._object });
	}
}

export default new RequestHttp(config);
