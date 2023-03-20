import React from "react";
import loginLeft from "@/assets/images/login_left.png";
import reactLogo from "@/assets/images/logo.png";
import LoginForm from "./component/LoginForm";

import "./index.less";

const Login = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="login-left">
					<img src={loginLeft} alt="login-bg" />
				</div>
				<div className="login-form">
					<div className="login-logo">
						<img src={reactLogo} alt="logo" />
						<span>React管理系统</span>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};
export default Login;
