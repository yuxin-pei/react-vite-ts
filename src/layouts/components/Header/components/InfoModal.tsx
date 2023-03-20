import { Ref, useState, useImperativeHandle } from "react";
import { Modal } from "antd";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
}
const InfoModal = (props: Props) => {
	const [visible, setVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal,
	}));
	const showModal = (params: { name: number }) => {
		console.log(params);
		setVisible(true);
	};

	const handleOk = () => {
		setVisible(false);
	};
	const handleCancel = () => {
		setVisible(false);
	};
	return (
		<Modal title="个人信息" open={visible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			<p>user info</p>
			<p>user info</p>
			<p>user info</p>
		</Modal>
	);
};

export default InfoModal;
