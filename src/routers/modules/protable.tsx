import React from "react";
import { RouteObject } from "react-router-dom";
import Layouts from "@/layouts";
import lazyLoad from "../utils/lazyLoad";

const proTableRouter: RouteObject[] = [
	{
		element: <Layouts />,
		children: [
			{
				path: "/proTable/useHooks",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useHooks"))),
				id: "useHooks",
			},
			{
				path: "/proTable/useComponent",
				element: lazyLoad(React.lazy(() => import("@/views/proTable/useComponent"))),
				id: "useComponent",
			},
		],
	},
];

export default proTableRouter;
