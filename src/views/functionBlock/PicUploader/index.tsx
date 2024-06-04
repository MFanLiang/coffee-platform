import { useState } from 'react';
import { Tabs } from 'antd';
import SinglePicFile from './components/SinglePicFile';
import MultiplePicFile from './components/MultiplePicFile';
import { connect } from 'react-redux';
import { setPicUploadType } from '@/redux/modules/studyReact/action';
import FileSingleUpload from './components/FileSingleUpload';
import FileMultipleUpload from './components/FileMultipleUpload';
import classNames from 'classnames';
import style from './index.module.less';

const PicUploader = (props: any) => {
  const { picUploadType, setPicUploadType: setPicUploadTypeAction } = props;

  const [picUploadTypeKey, setPicUploadTypeKey] = useState<string>(picUploadType || 'picSingle');
  const handleOnTabClick = (key: string) => {
    setPicUploadTypeAction(key);
    setPicUploadTypeKey(key);
  };

  const tabList = [
    {
      key: 'picSingle',
      tab: '单一图片文件上传',
      eleReactNode: <SinglePicFile />
    },
    {
      key: 'picMultiple',
      tab: '多个图片文件上传',
      eleReactNode: <MultiplePicFile />
    },
    {
      key: 'fileSingle',
      tab: '单个文件上传',
      eleReactNode: <FileSingleUpload />
    },
    {
      key: 'fileMultiple',
      tab: '多个文件上传',
      eleReactNode: <FileMultipleUpload />
    }
  ];

  return (
    <div className={classNames('card', style.picUploaderBox)}>

      <Tabs type="card" defaultActiveKey={picUploadTypeKey} onTabClick={handleOnTabClick}>
        {tabList.map(item => {
          return (
            <Tabs.TabPane tab={item.tab} key={item.key}>
              {item.eleReactNode}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

const mapStateToProps = (state: any) => state.studyReact;
const mapDispatchToProps = { setPicUploadType };
export default connect(mapStateToProps, mapDispatchToProps)(PicUploader);
