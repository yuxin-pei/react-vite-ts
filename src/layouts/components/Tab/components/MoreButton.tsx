import { useNavigate, useLocation } from "react-router-dom";
import { Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface Props {
	tabsList: Array<Menu.MenuOptions>;
	delTabs: (path: string) => void;
	setTabsList: (tabsList: Array<Menu.MenuOptions>) => void;
}

const MoreButton: React.FC<Props> = (props) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const closeMultipleTab = (path?: string) => {
		const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === path || item.path === "/home/index";
		});
		console.log(handleTabsList);
		props.setTabsList(handleTabsList);
		path ?? navigate("/home/index");
	};
	const items = [
		{
			key: "1",
			// label: <span>{t("tabs.closeCurrent")}</span>,
			label: <span>关闭当前</span>,
			onClick: () => props.delTabs(pathname),
		},
		{
			key: "2",
			// label: <span>{t("tabs.closeOther")}</span>,
			label: <span>关闭其它</span>,
			onClick: () => closeMultipleTab(pathname),
		},
		{
			key: "3",
			// label: <span>{t("tabs.closeAll")}</span>,
			label: <span>关闭全部</span>,
			onClick: () => closeMultipleTab(),
		},
	];
	return (
		<Dropdown menu={{ items }} placement="bottom" trigger={["click"]} arrow={{ pointAtCenter: true }}>
			<Button className="more-button" type="primary" size="small">
				{/* t("tabs.more") */}更多 <DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default MoreButton;
