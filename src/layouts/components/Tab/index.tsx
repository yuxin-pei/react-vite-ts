import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Tabs } from "antd";
import { HomeFilled } from "@ant-design/icons";
import { setTabsList } from "@/redux/modules/tabs/action";
import { searchRoute } from "@/utils/util";
import MoreButton from "./components/MoreButton";
import "./index.less";

const LayoutTabs = (props: any) => {
	// console.log(props);
	const { tabsList } = props.tabs;
	const { themeConfig } = props.global;
	const { menuList } = props.menu;
	const { setTabsList } = props;
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState<string>(pathname);
	const clickTabs = (path: string) => {
		navigate(path);
	};
	const delTabs = (path: string) => {
		if (path === "/home/index") return;
		if (pathname === path) {
			console.log(path);
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (pathname !== item.path) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== path));
	};
	const items = useMemo(() => {
		return tabsList.map((item: Menu.MenuOptions) => {
			return {
				key: item.path,
				label: (
					<span>
						{item.path == "/home/index" ? <HomeFilled /> : ""}
						{item.title}
					</span>
				),
				closeable: item.path !== "/home/index",
			};
		});
	}, [tabsList]);

	const addTabs = () => {
		const route = searchRoute(pathname, menuList);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.title, path: route.path });
		}
		setTabsList(newTabsList);
		setActiveValue(pathname);
	};
	useEffect(() => {
		addTabs();
	}, [pathname]);
	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						hideAdd
						type="editable-card"
						onChange={clickTabs}
						onEdit={(path) => delTabs(path as string)}
						items={items}
					/>
					<MoreButton delTabs={delTabs} tabsList={tabsList} setTabsList={setTabsList} />
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
	setTabsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutTabs);
