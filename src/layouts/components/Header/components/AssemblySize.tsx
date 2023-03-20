import { Dropdown } from "antd";
import { setAssemblySize } from "@/redux/modules/global/action";
import { connect } from "react-redux";

const AssemblySize = (props: any) => {
	const { assemblySize, setAssemblySize } = props;
	const onClick = (e: any) => setAssemblySize(e.key);
	const items = [
		{ key: "middle", disabled: assemblySize === "middle", label: "默认" },
		{ key: "large", disabled: assemblySize === "large", label: "大型" },
		{ key: "small", disabled: assemblySize === "small", label: "小型" },
	];
	return (
		<Dropdown menu={{ items, onClick }} placement="bottom" arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = {
	setAssemblySize,
};

export default connect(mapStateToProps, mapDispatchToProps)(AssemblySize);
