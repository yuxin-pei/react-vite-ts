import defaultTheme from "@/styles/theme/theme-default.less?inline";
import darkTheme from "@/styles/theme/theme-dark.less?inline";
import { ThemeConfigProp } from "@/redux/interface";

/* 全局主题设置 */

const useTheme = (themeConfig: ThemeConfigProp) => {
	const { weakOrGray, isDark } = themeConfig;

	const initTheme = () => {
		// 灰色和弱色切换
		const body = document.documentElement as HTMLElement;
		if (!weakOrGray) body.setAttribute("style", "");
		if (weakOrGray === "gray") body.setAttribute("style", "filter: grayscale(1)");
		if (weakOrGray === "weak") body.setAttribute("style", "filter: invert(80%)");

		// 切换黑暗模式
		const head = document.getElementsByTagName("head")[0];
		const getStyle = head.getElementsByTagName("style");
		if (getStyle.length > 0) {
			for (let i = 0; i < getStyle.length; i++) {
				if (getStyle[i].getAttribute("data-type") === "dark") getStyle[i].remove();
			}
		}
		let styleDom = document.createElement("style");
		styleDom.dataset.type = "dark";
		styleDom.innerHTML = isDark ? darkTheme : defaultTheme;
		head.appendChild(styleDom);
	};
	initTheme();

	return {
		initTheme,
	};
};

export default useTheme;
