import ReactDOM from "react-dom/client";
import Loading from "@/components/Loading";

let needLoadingRequestCount = 0;

export const showFullScreenLoading = () => {
	if (needLoadingRequestCount === 0) {
		let div = document.createElement("div");
		div.setAttribute("id", "loading");
		document.body.appendChild(div);
		ReactDOM.createRoot(div).render(<Loading />);
	}
	needLoadingRequestCount++;
};

export const tryHideFullScreenLoading = () => {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) {
		document.body.removeChild(document.getElementById("loading") as HTMLElement);
	}
};
