import { useState, useRef, useEffect } from 'react';
import LoginForm from "./components/LoginForm";
import SwitchDark from "@/components/SwitchDark";
import loginLeft from "@/assets/images/login_left.png";
import logo from "@/assets/images/logo.png";
import "./index.less";
import RegistryForm from './components/RegistryForm';

const Login = () => {
	const loginFormRef = useRef<any>(null);
	const registryFormRef = useRef<any>(null);

	const [flag, setFlag] = useState<boolean>(false);
	const handleCardSwitch = () => {
		setFlag(true);
	};

	const goBackLogin = () => {
		setFlag(false);
	};

	useEffect(() => {
		if (flag) {
			loginFormRef.current.style.transform = 'rotateY(-180deg)';
			registryFormRef.current.style.transform = 'rotateY(0)';
		} else {
			loginFormRef.current.style.transform = 'rotateY(0)';
			registryFormRef.current.style.transform = 'rotateY(180deg)';
		}
	}, [flag]);

	return (
		<div className="login-container">
			<SwitchDark />
			<div className="login-box" >
				<div className="login-left">
					<img src={loginLeft} alt="login" />
				</div>
				<div className="loginControl-box">
					<div className="login-form" ref={loginFormRef}>
						<div className="login-logo">
							<img className="login-icon" src={logo} alt="logo" title="可爱的小狗狗" onClick={handleCardSwitch} />
							<span className="logo-text"> Coffee-Platform </span>
						</div>
						<LoginForm />
					</div>

					<div className="registry-form" ref={registryFormRef}>
						<div className="login-logo">
							<img className="login-icon" src={logo} alt="logo" title="可爱的小狗狗" onClick={goBackLogin} />
							<span className="logo-text"> Coffee-Platform </span>
						</div>
						<RegistryForm />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
