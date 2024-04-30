import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { getPublicKey, reqLogin } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import useSessionStorage from '@/hooks/useSessionStorage';
import JSEncrypt from 'jsencrypt';
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const { setToken, setUserInfo, setTabsList } = props;
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// * 用户登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			setLoading(true);
			// 获取公钥
			getPublicKey().then(async (res) => {
				if (res.code === 200) {
					const { setSessionStorage } = useSessionStorage('publicKey');
					setSessionStorage(res.data);
					const encrypt = new JSEncrypt();
					encrypt.setPublicKey(res.data);
					// 使用服务端提供的公钥来加密 密码
					const encryptedPass = encrypt.encrypt(loginForm.passWord);
					// 使用加密后的密码请求 reqLogin 登录接口
					const response = await reqLogin({ userName: loginForm.userName, passWord: encryptedPass })
					if (response.code !== 200) {
						setTabsList([]);
						message.error(response.message || '账号或密码错误');
					} else {
						setLoading(false);
						setToken(response.data?.accessToken);
						setUserInfo(response.data?.userInfo);
						setTabsList([]);
						message.success("登录成功，希望你能玩的开心哦！");
						navigate(HOME_URL);
					}
				}
			});
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="userName" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名：admin" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="passWord" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => form.resetFields()}
					icon={<CloseCircleOutlined />}
				>
					{t("login.reset")}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{t("login.confirm")}
				</Button>
			</Form.Item>
		</Form>
	);
};

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setToken, setUserInfo, setTabsList };
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
