// 请求枚举配置
/**
 * @description: 请求配置
 */
export enum ResultEnum {
	SUCCESS = 200,
	ERROR = 500,
	OVERDUE = 599,
	timeout = 10000,
	TYPE = "success",
}

/**
 * @description: 请求方法
 */
export enum MethodEnum {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	PATCH = "PATCH",
	DELETE = "DELETE",
}

/**
 * @description: 常用的contentType类型
 */
export enum ContentTypeEnum {
	// json
	JSON = "application/json;charset=utf-8",
	// text
	TEXT = "text/plain;charset=utf-8",
	// form-data 配合 qs使用
	FORM_URLENCODED = "application/x-www-form-urlencoded;charset=utf-8",
	// form-data 上传
	FORM_DATA = "application/form-data;charset=utf-8",
}
