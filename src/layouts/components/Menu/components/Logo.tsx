import { connect } from "react-redux";
import logo from "@/assets/images/logo.jpg";

const Logo = (props: any) => {
	const { isCollapse } = props;
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">React Admin</h2> : null}
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;

export default connect(mapStateToProps)(Logo);
