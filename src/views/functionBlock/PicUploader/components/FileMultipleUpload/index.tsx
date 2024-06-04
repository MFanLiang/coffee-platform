import { useState } from "react";
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload } from 'antd';
import type { UploadProps, UploadFile } from 'antd/es/upload/interface';

const FileMultipleUpload = () => {
  const onFinish = (values: any) => {
    const fileGroupList = values.fileGroup.map((item: any) => ({
      ...item,
      file: item.file.file,
    }));
    console.log('fileGroupList :>> ', fileGroupList);
  };

  // const [fileList, setFileList] = useState<UploadFile[]>([]);

  // const handleChange: UploadProps['onChange'] = info => {
  //   let newFileList = [...info.fileList];
  //   newFileList = newFileList.slice(-2);
  //   newFileList = newFileList.map(file => {
  //     if (file.response) {
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });
  //   setFileList(newFileList);
  // };

  const uploadProps: UploadProps = {
    maxCount: 1,// 限制每次仅上传一张图片
    // onRemove: file => setFileList([]),
    beforeUpload: file => {
      return false;
    },
    accept: ".doc,.docx",
    // onChange: handleChange,
  };

  return (
    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
      <Form.List name="fileGroup" initialValue={[{}]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8, alignItems: "center" }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'file']}
                  rules={[{ required: true, message: 'file not select!' }]}
                >
                  <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                  </Upload>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  rules={[{ required: false }]}
                >
                  <Input.TextArea rows={5} placeholder="description" maxLength={500} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                disabled={fields.length >= 3}
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FileMultipleUpload;
