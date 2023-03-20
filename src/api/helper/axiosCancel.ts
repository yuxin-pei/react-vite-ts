import axios, { AxiosRequestConfig, Canceler } from "axios";
import qs from "qs";
import { isFunction } from "@/utils/is";

const CancelToken = axios.CancelToken;

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>();

// 序列号参数
export const getPendingUrl = (config: AxiosRequestConfig) =>
	[config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler {
	/**
	 * @description: 添加请求
	 * @param {AxiosRequestConfig} config
	 */
	addPending(config: AxiosRequestConfig) {
		// 请求开始之前，对之前的请求做检查取消操作
		console.log(config, config.cancelToken, getPendingUrl(config));
		this.removePending(config);
		const url = getPendingUrl(config);
		// config.cancelToken =
		// 	config.cancelToken ||
		// 	new CancelToken((cancel) => {
		// 		if (!pendingMap.has(url)) {
		// 			// 如果pending中不存在 就添加进去
		// 			pendingMap.set(url, cancel);
		// 		}
		// 	});
	}

	/**
	 * @description: 移除请求
	 * @param {AxiosRequestConfig} config
	 */
	removePending(config: AxiosRequestConfig) {
		const url = getPendingUrl(config);

		if (pendingMap.has(url)) {
			// 如果在pending中存在当前请求标识，需要取消当前请求，并且移除
			const cancel = pendingMap.get(url);
			cancel && cancel();
			pendingMap.delete(url);
		}
	}
	/**
	 * @description: 清空所有pending
	 */
	removeAllPending() {
		pendingMap.forEach((cancel) => cancel && isFunction(cancel) && cancel());
		pendingMap.clear();
	}

	/**
	 * @description: 重置
	 */
	reset(): void {
		pendingMap = new Map<string, Canceler>();
	}
}
