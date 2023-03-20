import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, storePersist } from "@/redux";
import "antd/dist/reset.css";
import "@/assets/iconfont/iconfont.less";
import "virtual:svg-icons-register";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={storePersist}>
				<App />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
