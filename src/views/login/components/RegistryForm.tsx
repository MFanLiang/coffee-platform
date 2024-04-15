import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const RegistryForm = (props: any) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  // * 用户注册
  const onFinish = async (registryForm: any) => {
    try {
      setLoading(true);
      console.log('registryForm :>> ', registryForm);
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
      <Form.Item name="username" rules={[{ required: true, message:  t("placeholder.username")  }]}>
        <Input placeholder={t("placeholder.username")} prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: t("placeholder.password") }]}>
        <Input.Password autoComplete="new-password" placeholder={t("placeholder.password")} prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item className="login-btn">
        <Button
          onClick={() => {
            form.resetFields();
          }}
          icon={<CloseCircleOutlined />}
        >
          {t("login.reset")}
        </Button>
        <Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
          {t("login.registry")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistryForm;
