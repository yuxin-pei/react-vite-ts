import { Dropdown, Menu } from "antd";
import { setLanguage } from "@/redux/modules/global/action";
import { connect } from "react-redux";

const Language = (props: any) => {
	const { language, setLanguage } = props;
	const onClick = (e: any) => setLanguage(e.key);
	const items = [
		{ key: "zh", disabled: language === "zh", label: "简体中文" },
		{ key: "en", disabled: language === "en", label: "English" },
	];
	return (
		<Dropdown menu={{ items, onClick }} placement="bottom" arrow={true}>
			<i className="icon-style iconfont icon-zhongyingwen"></i>
		</Dropdown>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = {
	setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
