import { useState, forwardRef, useImperativeHandle } from "react";
import { Modal, Row, Col, Form, Input, Select, Switch } from "antd";
import type { FormProps } from 'antd'
import type { FieldType, IMenuAddModalProps } from '../types';

const MenuAddModal = (props: IMenuAddModalProps, ref: any) => {
  const { addMenu, editMenu } = props;
  const [form] = Form.useForm();
  // * 是否含有父级节点
  const [isHasParentNode, setIsHasParentNode] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAdd, setIsAdd] = useState<boolean>(true);

  const onOkSubmitData = () => {
    form.submit();
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onReset();
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        setIsHasParentNode: (flag: boolean) => setIsHasParentNode(flag),
        setIsModalOpen: () => setIsModalOpen(pre => !pre),
        setAdd: (flag: boolean) => setIsAdd(flag),
        setForm: ({ name, icon, status }: FieldType) => {
          form.setFieldsValue({ name, icon, status })
        }
      }
    },
    []
  );

  const genertorNumSelect = () => {
    let temp = [];
    for (let i = 1; i <= 50; i++) {
      temp.push({
        value: i,
        label: `${i}`
      })
    }
    return temp;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values: FieldType) => {
    setIsModalOpen(false);
    isAdd ? addMenu(values) : editMenu(values);
    onReset();
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  };

  return (
    <Modal
      title={"新建父级"}
      width={850}
      visible={isModalOpen}
      maskClosable={false}
      okText={"提交"}
      onOk={onOkSubmitData}
      onCancel={handleCancel}
    >
      <Form form={form}
        initialValues={{ status: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        <Row gutter={18}>
          {isHasParentNode &&
            <Col span={24}>
              <Form.Item label="父级路由名称" name="parentName">
                <Input disabled />
              </Form.Item>
            </Col>
          }
          <Col span={12}>
            <Form.Item label="路由名称" name="name" rules={[
              {
                required: true,
                message: '请输入路由名称'
              }
            ]}>
              <Input placeholder="请输入路由名称" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路由地址" name="alias" rules={[
              {
                required: true,
                message: '请输入路由地址'
              }
            ]}>
              <Input placeholder="请输入路由地址" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路由图标" name="icon" rules={[
              {
                required: true,
                message: '请选择路由图标'
              }
            ]}>
              <Input placeholder="请选择路由图标" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路由排序" name="sort" rules={[
              {
                required: true,
                message: '请选择路由排序'
              }
            ]}>
              <Select
                placeholder="请选择路由排序"
                style={{ width: '100%' }}
                options={genertorNumSelect()}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="路由状态" name="status" valuePropName="checked" >
              <Switch checkedChildren="开启" unCheckedChildren="关闭" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(MenuAddModal);
