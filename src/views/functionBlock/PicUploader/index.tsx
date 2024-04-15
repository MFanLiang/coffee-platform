import { useState } from 'react';
import { Card } from 'antd';
import SinglePicFile from './components/SinglePicFile';
import MultiplePicFile from './components/MultiplePicFile';
import { connect } from 'react-redux';
import { setPicUploadType } from '@/redux/modules/studyReact/action';

const PicUploader = (props: any) => {
  const { picUploadType, setPicUploadType: setPicUploadTypeAction} = props;

  const tabList = [
    {
      key: 'single',
      tab: '单一图片文件上传',
    },
    {
      key: 'multiple',
      tab: '多个图片文件上传',
    }
  ];

  const contentList: Record<string, React.ReactNode> = {
    single: <SinglePicFile />,
    multiple: <MultiplePicFile />,
  };

  const [picUploadTypeKey, setPicUploadTypeKey] = useState<string>(picUploadType || 'single');
  const onTabChange = (key: string) => {
    setPicUploadTypeAction(key);
    setPicUploadTypeKey(key);
  };

  return (
    <Card
      title="图片文件上传"
      style={{ width: '100%', height: "100%" }}
      tabList={tabList}
      activeTabKey={picUploadTypeKey}
      onTabChange={onTabChange}
    >
      {contentList[picUploadTypeKey]}
    </Card>
  );
}

const mapStateToProps = (state: any) => state.studyReact;
const mapDispatchToProps = { setPicUploadType };
export default connect(mapStateToProps, mapDispatchToProps)(PicUploader);
