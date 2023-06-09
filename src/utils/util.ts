import { RouteObject } from "react-router-dom";
/**
 * @description: 递归查询对应的路由
 * @param {String} path 当前访问地址
 * @param {Array} routes 路由数组
 * @return {array}
 */
export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
	let result: RouteObject = {};
	for (const item of routes) {
		if (item.path === path) return item;
		if (item.children) {
			const res = searchRoute(path, item.children);
			if (Object.keys(res).length) result = res;
		}
	}
	return result;
};

/**
 * @description: 获取需要展开的subMenu
 * @param {string} path 当前访问的地址
 * @return {array}
 */
export const getSubMenu = (path: string) => {
	let newStr: string = "";
	let newArr: any[] = [];
	let arr = path.split("/").map((i) => "/" + i);
	for (let i = 1; i < arr.length - 1; i++) {
		newStr += arr[i];
		newArr.push(newStr);
	}
	return newArr;
};

/**
 * @description: 递归当前路由的所有关联的路由 生成面包屑导航栏
 * @param {String} path 当前访问的地址
 * @param {Array} menuList 菜单列表
 * @return {array}
 */
export const getBreadcrumbList = (path: string, menuList: Menu.MenuOptions[]) => {
	let tempPath: any[] = [];
	try {
		const getNodePath = (node: Menu.MenuOptions) => {
			tempPath.push(node);
			// 找到符合条件的节点，通过throw终止掉递归
			if (node.path === path) {
				throw new Error("GOT IT");
			}
			if (node.children && node.children?.length > 0) {
				for (let i = 0; i < node.children.length; i++) {
					getNodePath(node.children[i]);
				}
				// 当前节点的子节点遍历完依旧没有找到，则删除路径中的该节点
				tempPath.pop();
			} else {
				// 找到叶子节点时，删除路径当中的该叶子节点
				tempPath.pop();
			}
		};
		for (let i = 0; i < menuList.length; i++) {
			getNodePath(menuList[i]);
		}
	} catch (error) {
		return tempPath.map((item) => item.title);
	}
};

/**
 * @description: 双重递归 找出所有面包屑 生成对象存储到Redux中，就不要每次都去递归查找
 * @param {array} 菜单列表
 * @return {object}
 */
export const findAllBreadcrumb = (menuList: Menu.MenuOptions[]): { [propName: string]: any } => {
	let breadcrumbList: any = {};
	const loop = (item: Menu.MenuOptions) => {
		if (item?.children?.length) item.children?.forEach((child: Menu.MenuOptions) => loop(child));
		else breadcrumbList[item.path] = getBreadcrumbList(item.path, menuList);
	};
	menuList.forEach((item: Menu.MenuOptions) => loop(item));
	console.log(breadcrumbList);
	return breadcrumbList;
};
