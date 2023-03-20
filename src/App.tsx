import React from "react";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";
import Router from "./routers";
import useTheme from "./hooks/useTheme";
import "./app.less";

function App(props: any) {
	const { language, themeConfig, assemblySize } = props;

	// 全局使用主题
	useTheme(themeConfig);

	return (
		<HashRouter>
			<ConfigProvider
				componentSize={assemblySize}
				locale={zhCN}
				theme={{
					token: {
						colorPrimary: "#00b96b",
					},
				}}
			>
				<Router />
			</ConfigProvider>
		</HashRouter>
	);
}

const mapStateToProps = (state: any) => state.global;
// const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps)(App);
