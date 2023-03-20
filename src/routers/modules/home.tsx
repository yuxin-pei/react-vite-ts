import { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";
import Home from "@/views/Home";

const homeRouter: RouteObject[] = [
	{
		element: <Layouts />,
		children: [
			{
				path: "/home/index",
				element: <Home />,
			},
		],
	},
];

export default homeRouter;
