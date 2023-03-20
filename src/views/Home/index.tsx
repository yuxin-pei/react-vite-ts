import React, { useState } from "react";
import type { DatePickerProps } from "antd";
import { Button, ConfigProvider, DatePicker, message, Upload, Popconfirm } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ConfigContext, defaultGetPrefixCls } from "../../components/space/config-provider";
import Space from "../../components/space";
import SvgIcon from "@/components/SvgIcon";
import reactLogo from "@/assets/icon/xianxingzijiayou.svg";

const HomePage: React.FC = () => {
	const [count, setCount] = useState(0);
	const [date, setDate] = useState<any>(null);
	const handleChange = (value: any) => {
		console.log(value);
		message.info(`您选择的日期是: ${value ? value.format("YYYY年MM月DD日") : "未选择"}`);
		setDate(value);
	};
	return (
		<div>
			{/* <SvgIcon name="xianxingzijiayou" /> */}
			<h1>Home Page</h1>
			<div style={{ width: 400, margin: "100px auto" }}>
				<DatePicker onChange={handleChange} />
				<div style={{ marginTop: 16 }}>当前日期：{date ? date.format("YYYY年MM月DD日") : "未选择"}</div>
			</div>
			<ConfigContext.Provider value={{ getPrefixCls: defaultGetPrefixCls, space: { size: "large" }, direction: "rtl" }}>
				<Space
					direction="horizontal"
					align="start"
					style={{ height: "200px" }}
					split={<div style={{ width: 100, height: 100, background: "red" }}></div>}
					wrap={true}
				>
					<div style={{ width: 100, height: 100, background: "blue" }}>1</div>
					<div style={{ width: 100, height: 100, background: "blue" }}>2</div>
					<div style={{ width: 100, height: 100, background: "blue" }}>3</div>
				</Space>
				<Space
					direction="horizontal"
					align="end"
					style={{ height: "200px" }}
					split={<div style={{ width: 100, height: 100, background: "red" }}></div>}
					wrap={true}
				>
					<div style={{ width: 100, height: 100, background: "blue" }}>4</div>
					<div style={{ width: 100, height: 100, background: "blue" }}>5</div>
					<div style={{ width: 100, height: 100, background: "blue" }}>6</div>
					{/* <strong>https://github.com/HalseySpicy/Hooks-Admin/blob/master/src/layouts/index.tsx</strong>
					<p>https://juejin.cn/post/7114555646820745253</p> */}
					<p>https://jackchoumine.github.io/vue2/</p>
				</Space>
			</ConfigContext.Provider>
		</div>
	);
};

export default HomePage;
