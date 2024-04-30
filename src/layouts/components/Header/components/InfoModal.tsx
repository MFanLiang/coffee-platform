import { useState, useImperativeHandle, Ref } from "react";
import { Modal, message, Badge, Descriptions, Avatar, Tag } from "antd";
import defaultAvatar from "@/assets/images/avatar.png";

interface Props {
	innerRef: Ref<{ showModal: (params: any) => void } | undefined>;
	userInfoData: any;
}

const InfoModal = (props: Props) => {
	const { userInfoData } = props;

	const [modalVisible, setModalVisible] = useState(false);

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const showModal = (params: { name: number }) => {
		console.log(params);
		setModalVisible(true);
	};

	const handleOk = () => {
		setModalVisible(false);
		// message.success("修改用户信息成功 🎉🎉🎉");
	};

	const handleCancel = () => {
		setModalVisible(false);
	};

	const ruleEnum: any = {
		0: {
			value: 0,
			label: '超级管理员',
			eleReactNode: <Tag color="#5bf11b"> 超级管理员 </Tag>,
			disabled: false,
		},
		1: {
			value: 1,
			label: '系统管理员',
			eleReactNode: <Tag color="magenta"> 系统管理员 </Tag>,
			disabled: false,
		},
		2: {
			value: 2,
			label: '普通用户',
			eleReactNode: <Tag color=""> 普通用户 </Tag>,
			disabled: false,
		},
		3: {
			value: 3,
			label: '运营用户',
			eleReactNode: <Tag color="orange"> 运营用户 </Tag>,
			disabled: false,
		},
		4: {
			value: 4,
			label: '访客用户',
			eleReactNode: <Tag color="gold"> 访客用户 </Tag>,
			disabled: false,
		},
		5: {
			value: 5,
			label: '临时用户',
			eleReactNode: <Tag color="lime"> 临时用户 </Tag>,
			disabled: false,
		},
	};

	return (
		<Modal title="个人信息" visible={modalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose={true}>
			{userInfoData === null ? <div>暂无用户信息</div> : (
				<Descriptions title={null} bordered layout="vertical">
					<Descriptions.Item label="姓  名" span={1}> {userInfoData.userName} </Descriptions.Item>
					<Descriptions.Item label="全  名" span={1}> {userInfoData.userFullName} </Descriptions.Item>
					<Descriptions.Item label="手机号码" span={1}>
						{userInfoData.tel}
					</Descriptions.Item>
					<Descriptions.Item label="状  态" span={3}>
						<Badge status="success" text="激活" />
					</Descriptions.Item>
					<Descriptions.Item label="角  色">{ruleEnum[userInfoData.userRole]?.eleReactNode}</Descriptions.Item>
					<Descriptions.Item label="头像缩略图" span={2}>
						<Avatar size="large" src={userInfoData.avatar || defaultAvatar} />
					</Descriptions.Item>
				</Descriptions>
			)}
		</Modal>
	);
};

export default InfoModal;
