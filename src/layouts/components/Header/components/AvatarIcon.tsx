import { useRef } from "react";
import { Avatar, Modal, Menu, Dropdown, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import logout from '@/api/modules/logout';
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken, setUserInfo } from "@/redux/modules/global/action";
import PasswordModal from "./PasswordModal";
import InfoModal from "./InfoModal";
import defaultAvatar from "@/assets/images/avatar.png";

const AvatarIcon = (props: any) => {
	const { userInfo, setToken, setUserInfo } = props;
	const navigate = useNavigate();

	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}
	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const logoutFunc = () => {
		Modal.confirm({
			title: "温馨提示 🧡",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录？",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				logout().then((res) => {
					setToken("");
					setUserInfo(null);
					message.success("退出登录成功！");
					navigate("/login");
				})
			}
		});
	};

	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: <span className="dropdown-item">首页</span>,
					onClick: () => navigate(HOME_URL)
				},
				{
					key: "2",
					label: <span className="dropdown-item">个人信息</span>,
					onClick: () => infoRef.current!.showModal({ name: 11 })
				},
				// {
				// 	key: "3",
				// 	label: <span className="dropdown-item">修改密码</span>,
				// 	onClick: () => passRef.current!.showModal({ name: 11 })
				// },
				{
					type: "divider"
				},
				{
					key: "4",
					label: <span className="dropdown-item">退出登录</span>,
					danger: true,
					onClick: logoutFunc
				}
			]}
		></Menu>
	);
	return (
		<>
			<Dropdown overlay={menu} placement="bottom" arrow trigger={["click"]}>
				<Avatar size="large" src={userInfo.avatar || defaultAvatar} />
			</Dropdown>
			<InfoModal innerRef={infoRef} userInfoData={userInfo}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setToken, setUserInfo };
export default connect(mapStateToProps, mapDispatchToProps)(AvatarIcon);
