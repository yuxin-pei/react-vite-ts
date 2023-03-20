// 将所有环境变量配置文件读取到process.env
export function wrapperEnv(envConf: RecordAbele): ImportMetaEnv {
	const ret: any = {};
	for (const envKey of Object.keys(envConf)) {
		let envValue = envConf[envKey]?.replace(/\\n/g, "\n");
		envValue = envValue === "true" ? true : envValue === "false" ? false : envValue;
		if (envKey === "VITE_PORT") {
			envValue = Number(envValue);
		}
		ret[envKey] = envValue;
		process.env[envKey] = envValue;
	}
	return ret;
}
