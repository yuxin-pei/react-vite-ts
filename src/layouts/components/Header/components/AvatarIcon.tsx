import { useRef } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal, Avatar, Dropdown, message, MenuProps } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { setToken } from "@/redux/modules/global/action";
import avatar from "@/assets/images/avatar.png";
import InfoModal from "./InfoModal";
import PasswordModal from "./passwordModal";

interface ModalProps {
	showModal: (params: { name: number }) => void;
}
const AvatarIcon = (props: any) => {
	const { setToken } = props;
	const navigate = useNavigate();
	const infoRef = useRef<ModalProps>(null);
	const passRef = useRef<ModalProps>(null);

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				setToken("");
				message.success("退出登录成功！");
				navigate("/login");
			},
		});
	};
	const items: MenuProps["items"] = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate("/home/index"),
		},
		{
			key: "2",
			label: <span className="dropdown-item">个人信息</span>,
			onClick: () => infoRef.current!.showModal({ name: 11 }),
		},
		{
			key: "3",
			label: <span className="dropdown-item">修改密码</span>,
			onClick: () => passRef.current!.showModal({ name: 11 }),
		},
		{
			type: "divider",
		},
		{
			key: "4",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout,
		},
	];
	return (
		<>
			<Dropdown menu={{ items }} placement="bottom" arrow={true}>
				<Avatar size="large" src={avatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef} />
      <PasswordModal innerRef={passRef} />
		</>
	);
};

const mapDispatchToProps = {
	setToken,
};
export default connect(null, mapDispatchToProps)(AvatarIcon);
