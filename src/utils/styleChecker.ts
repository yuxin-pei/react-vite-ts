import { isStyleSupport } from "rc-util/lib/Dom/styleChecker";
import canUseDom from "rc-util/lib/Dom/canUseDom";

export const canUseDocElement = canUseDom() && window.document.documentElement;

export { isStyleSupport };

let flexGapSupported: boolean | undefined;

export const detectFlexGapSupported = () => {
	if (!canUseDocElement) {
		return false;
	}

	if (flexGapSupported !== undefined) {
		return flexGapSupported;
	}

	const flex = document.createElement("div");
	flex.style.display = "flex";
	flex.style.flexDirection = "column";
	flex.style.rowGap = "1px";

	flex.appendChild(document.createElement("div"));
	flex.appendChild(document.createElement("div"));

	document.body.appendChild(flex);
	flexGapSupported = flex.scrollHeight === 1; // Flex容器距离行间距应该是1px
	document.body.removeChild(flex);

	return flexGapSupported;
};
