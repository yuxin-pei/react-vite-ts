// 请求响应参数(不包含data)
export interface Result {
	code: number | string;
	msg: string | number;
}

export interface ResultData<T = any> extends Result {
	data?: T;
}

export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		access_token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}
