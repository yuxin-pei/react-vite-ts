import { useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { connect } from "react-redux";

const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const { themeConfig } = props.global;
	const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];
	return (
		<>
			{!themeConfig.breadcrumb && (
				<Breadcrumb>
					<Breadcrumb.Item href="#/home/index">首页</Breadcrumb.Item>
					{breadcrumbList.map((item: string) => {
						return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
					})}
				</Breadcrumb>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps)(BreadcrumbNav);
