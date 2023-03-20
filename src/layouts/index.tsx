import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import { Layout } from "antd";
import { updateCollapse } from "@/redux/modules/menu/action";
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tab";
import LayoutFooter from "./components/Footer";
import "./index.less";

const { Sider, Content } = Layout;

const LayoutIndex = (props: any) => {
	return (
		<section className="container">
			<Sider trigger={null} collapsed={props.isCollapse} width="220" theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader />
				<LayoutTabs />
				<Content>
					<div className="card outlet-content-box">
						<Outlet />
					</div>
				</Content>
				<LayoutFooter />
			</Layout>
		</section>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };

export default connect(mapStateToProps, mapDispatchToProps)(LayoutIndex);
