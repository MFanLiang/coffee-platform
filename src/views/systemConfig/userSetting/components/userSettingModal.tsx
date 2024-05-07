import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Row, Col, Form, Input, Select } from "antd";
import type { operateTypes } from '../types';
import { updateUserInfo } from "@/api/modules/user";
import { Login } from "@/api/interface";

const UserSettingModal = (props: any, ref: any) => {
  const { userRoleType, userInfo, requestUserListInfo } = props;
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [operateType, setOperateType] = useState<operateTypes>("add");
  const [curRowData, setCurRowData] = useState<any>(null);

  function addDisabledPropertiesToUserRoleEnum(uerRoleEnum: any) {
    // 若登录的用户为超级管理员，则不做任何下拉选项的禁用
    if (userInfo.userRole === 0) return uerRoleEnum;
    return uerRoleEnum.map((item: any, i: number) => ({
      ...item,
      disabled: item.value === 0 ? true : false
    }));
  }

  const openModal = (operateTypeParam: operateTypes, currentRowData?: Login.userInfoType) => {
    setOpen(true);
    setOperateType(operateTypeParam);
    if (currentRowData) setCurRowData(currentRowData);
    switch (operateTypeParam) {
      case "add": {
        break;
      }
      case "edit": {
        if (currentRowData) {
          form.setFieldsValue({
            ...currentRowData
          })
        }
        break;
      }
      case "del": {
        break;
      }
      default:
        break;
    }
  };

  useImperativeHandle(ref, () => ({
    openModal
  }));

  const onOkSubmitData = async () => {
    const values = await form.validateFields();
    const queryData = { ...values, id: curRowData.id }
    const res = await updateUserInfo(queryData);
    if (res.code === 200) {
      // 刷新表格重新获取用户列表数据
      requestUserListInfo();
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <Modal
      title={"用户信息"}
      width={850}
      visible={open}
      maskClosable={false}
      okText={"提交"}
      onOk={onOkSubmitData}
      onCancel={() => {
        form.resetFields();
        setOpen(false)
      }}
    >
      <Form form={form}>
        <Row gutter={18}>
          <Col span={12}>
            <Form.Item label="姓  名" name="userName" rules={[
              {
                required: true,
                message: '请输入您的姓名'
              }
            ]}>
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="全  称" name="userFullName" rules={[
              {
                required: true,
                message: '请输入您的全名称'
              }
            ]}>
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>

          {operateType === "add" && (
            <>
              <Col span={12}>
                <Form.Item
                  label="密码"
                  name="passWord"
                  rules={[
                    {
                      required: true,
                      message: '请输入您的密码'
                    }
                  ]}
                >
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  dependencies={['passWord']}
                  hasFeedback
                  label="确认密码"
                  name="confirmPassWord"
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('passWord') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="请输入确认密码" />
                </Form.Item>
              </Col>
            </>
          )}

          <Col span={12}>
            <Form.Item label="用户角色" name="userRole" rules={[{ required: true, message: '请选择用户角色' }]}>
              <Select placeholder="请选择用户角色" options={addDisabledPropertiesToUserRoleEnum(userRoleType)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="手机号码" name="tel">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="用户状态" name="status">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="用户头像" name="avatar">
              <Input placeholder="input placeholder" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(UserSettingModal);
