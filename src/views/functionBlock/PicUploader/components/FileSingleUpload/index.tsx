import { UploadOutlined } from '@ant-design/icons';
import { Table, Button, message, Upload, Space } from 'antd';
import type { UploadProps } from 'antd/es/upload/interface';
import { connect } from "react-redux";
import moment from "moment";
import { useState, useEffect } from 'react';
import { getAllfilesList, viewFileById } from "@/api/modules/fileList";
import { singleFileUpload } from '@/api/modules/fileList';

const FileSingleUpload = (props: any) => {
  const { userInfo } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>();
  const [fileInfo, setFileInfo] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const formData = new FormData();
    if (fileInfo !== null) {
      formData.append("fileName", fileInfo.name);
      formData.append("fileSize", String(fileInfo.size));
      formData.append("fileType", fileInfo.type);
      formData.append("file", fileInfo);
      formData.append("description", "备注信息");
      formData.append("uploader", userInfo.userName);
    };
    setUploading(true);
    singleFileUpload(formData, function () {
      console.log('进度条的回调函数，可以在这里展示文件上传的进度')
    }).then(res => {
      if (res.code === 200) {
        setUploading(true);
        FilesListQuery();
        setFileInfo(null);
        message.success('upload successfully.');
      }
    }).catch(() => {
      message.error('upload failed.')
      setUploading(false);
    }).finally(() => {
      setUploading(false);
    })
  };

  const uploadProps: UploadProps = {
    maxCount: 1,// 限制每次仅上传一张图片
    onRemove: file => setFileInfo(null),
    beforeUpload: file => {
      setFileInfo(file);
      return false;
    },
    accept: ".doc,.docx",
  };

  const viewFile = async (rowData: any, type: 'download' | 'view') => {
    await viewFileById(rowData.id).then((res) => {
      if (type === 'download') {
        const downloadUrl = URL.createObjectURL(res as any);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = rowData.originalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(downloadUrl);
      }
    })
  };

  const columns: any[] = [
    {
      title: "序列",
      dataIndex: "ind",
      key: "ind",
      align: "center",
      width: 65,
      fixed: 'left',
      render: (_text: any, record: any, _index: number) => _index + 1,
    },
    {
      title: "文件名称",
      dataIndex: "originalFileName",
      key: "originalFileName",
      width: 200,
      ellipsis: { showTitle: true },
      align: "center",
    },
    {
      title: "备注信息",
      dataIndex: "description",
      key: "description",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 200,
      render: (_text: string) => moment(_text).format("YYYY年MM月DD日 HH:mm:ss")
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
      align: "center",
      render: (_text: string) => moment(_text).format("YYYY年MM月DD日 HH:mm:ss")
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      // fixed: 'right',
      align: "center",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <a> <Button type="link" onClick={() => viewFile(record, 'view')}> 查看 </Button> </a>
            <a> <Button type="link" disabled={false} onClick={() => viewFile(record, "download")}> 下载 </Button> </a>
            <a> <Button type="link" disabled={true} onClick={() => { }}> 删除 </Button> </a>
          </Space>
        )
      },
    },
  ];

  const FilesListQuery = async () => {
    setLoading(true);
    await getAllfilesList().then(response => {
      if (response.code == 200) {
        setDataSource(response.data);
        setLoading(false);
      }
    }).finally(() => {
      setLoading(false);
    })
  };

  useEffect(() => { FilesListQuery() }, []);

  return (
    <div>
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileInfo === null}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
      <hr />
      <Table
        rowKey={(data) => data.id}
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        style={{ height: '100%', marginTop: '10px' }}
        // pagination={{ ...paginationConfig }}
        scroll={{ y: 'calc(100vh - 455px)' }}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps, null)(FileSingleUpload);
