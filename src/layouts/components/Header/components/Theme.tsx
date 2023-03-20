import { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Switch } from "antd";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import { setThemeConfig } from "@/redux/modules/global/action";
import { updateCollapse } from "@/redux/modules/menu/action";
import SwitchDark from "@/components/SwitchDark";

const Theme = (props: any) => {
	const { setThemeConfig, updateCollapse } = props;
	const { isCollapse } = props.menu;
	const { themeConfig } = props.global;
	const [visible, setVisible] = useState<boolean>(false);
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;
	const setWeakOrGray = (checked: boolean, theme: string) => {
		if (checked) return setThemeConfig({ ...themeConfig, weakOrGray: theme });
		setThemeConfig({ ...themeConfig, weakOrGray: null });
	};
	const onChange = (checked: boolean, key: string) => {
		setThemeConfig({ ...themeConfig, [key]: !checked });
	};
	return (
		<>
			<i className="icon-style iconfont icon-zhuti" onClick={() => setVisible(true)}></i>
			<Drawer title="布局设置" closable={false} onClose={() => setVisible(false)} open={visible} width={320}>
				<Divider>
					<FireOutlined />
					全局主题
				</Divider>
				<div className="theme-item">
					<span>暗黑模式</span>
					<SwitchDark />
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch checked={weakOrGray === "gray"} onChange={(e) => setWeakOrGray(e, "gray")} />
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch checked={weakOrGray === "weak"} onChange={(e) => setWeakOrGray(e, "weak")} />
				</div>
				<br />
				<Divider>
					<SettingOutlined />
					界面设置
				</Divider>
				<div className="theme-item">
					<span>折叠菜单</span>
					<Switch checked={isCollapse} onChange={(e) => updateCollapse(e)} />
				</div>
				<div className="theme-item">
					<span>面包屑导航</span>
					<Switch checked={!breadcrumb} onChange={(e) => onChange(e, "breadcrumb")} />
				</div>
				<div className="theme-item">
					<span>标签栏</span>
					<Switch checked={!tabs} onChange={(e) => onChange(e, "tabs")} />
				</div>
				<div className="theme-item">
					<span>页脚</span>
					<Switch checked={!footer} onChange={(e) => onChange(e, "footer")} />
				</div>
			</Drawer>
		</>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = {
	setThemeConfig,
	updateCollapse,
};

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
