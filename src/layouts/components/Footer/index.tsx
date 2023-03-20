import { connect } from "react-redux";

const LayoutFooter = (props: any) => {
	const { themeConfig } = props;
	return (
		<>
			{!themeConfig.footer && (
				<div
					className="footer"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: 30,
						borderTop: "1px solid #e4e7ed",
					}}
				>
					react + vite + ts + hooks
				</div>
			)}
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps)(LayoutFooter);
