import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "react-router-dom";
import Login from "@/views/login";
import Layouts from "@/layouts";

// 导入全部路由文件
const allRouters = import.meta.glob("./modules/*.tsx", { eager: true, import: "default" });

// 处理路由
export const routerArr: RouteObject[] = [];
Object.keys(allRouters).forEach((item: string) => {
	routerArr.push(...(allRouters[item] as Array<any>));
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />,

		// element: <Layouts />,
		// children: routerArr
	},
	{
		path: "/login",
		element: <Login />,
	},
	...routerArr,
	{
		path: "*",
		element: <Navigate to="/404" />,
	},
];
console.log(rootRouter);
const Router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default Router;
