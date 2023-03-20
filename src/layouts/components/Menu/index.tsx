import { useEffect, useState, createElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, MenuProps, Spin } from "antd";
import * as Icons from "@ant-design/icons";
import { setMenuList, updateCollapse } from "@/redux/modules/menu/action";
import { setBreadcrumbList } from "@/redux/modules/breadcrumb/action";
import { getMenuList } from "@/api/modules/login";
import { searchRoute, getSubMenu, findAllBreadcrumb } from "@/utils/util";
import Logo from "./components/Logo";

import "./index.less";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem {
	return {
		key,
		label,
		icon,
		children,
		type,
	} as MenuItem;
}

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const { isCollapse, setMenuList: setMenuListAction, setBreadcrumbList } = props;
	const [menuList, setMenuList] = useState<MenuItem[]>([]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [loading, setLoading] = useState<boolean>(false);
	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await getMenuList();
			if (!data) return;
			setMenuList(deepLoopFloat(data));
			setBreadcrumbList(findAllBreadcrumb(data));
			setMenuListAction(data);
		} finally {
			setLoading(false);
		}
	};
	const customIcons: { [key: string]: any } = Icons;
	const addIcon = (name: string) => {
		return createElement(customIcons[name]);
	};

	// 处理后台返回菜单 key 值为 antd 菜单需要的 key 值
	const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
		menuList?.forEach((item: Menu.MenuOptions) => {
			if (!item?.children?.length) return newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item?.children, [])));
		});
		return newArr;
	};

	// 点击当前菜单跳转
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		console.log(key);
		// if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	// 设置当前展开的subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};
	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getSubMenu(pathname));
	}, [pathname, isCollapse]);

	useEffect(() => {
		getMenuData();
	}, []);
	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo />
				<Menu
					theme="dark"
					mode="inline"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuList}
					triggerSubMenuAction="click"
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				/>
			</Spin>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = {
	setMenuList,
	setBreadcrumbList,
};
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
