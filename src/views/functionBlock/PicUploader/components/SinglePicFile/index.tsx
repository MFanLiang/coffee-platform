import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { message, Space, Card, Popover } from 'antd';
import { singlePicUpload, getKoaServerPicFile } from '@/api/modules/fileList';
import type { AxiosProgressEvent } from 'axios';
import { fileToBlob } from '@/utils/FiileConversion';
import classnames from 'classnames';
import style from './index.module.less';
import PicView from './components/PicView';

const SinglePicFile = () => {
  // * 预览缩略图是否播放动画
  const [isPlay, setIsPlay] = useState(true);
  const imgViewRef = useRef<HTMLImageElement>(null);
  // * 缩略图动画控制
  const handlePlayCtl = () => {
    setIsPlay(!isPlay);
    if (imgViewRef.current) {
      imgViewRef.current.style.animationPlayState = !isPlay ? "running" : "paused";
    }
  };

  /* ------------------------------------------- */

  // * 图片上传前的处理过程逻辑
  interface IImgSourceType {
    /** blob预览地址 */
    blobUrl: string;
    /** 图片文件源信息 */
    imgFileInfo: any;
  }
  const [singleImgInfo, setSingleImgInfo] = useState<IImgSourceType[]>([]);
  const receiveFile = (evt: ChangeEvent<HTMLInputElement>) => {
    if (evt && evt.target.files?.length) {
      if (singleImgInfo.length === 0) {
        setSingleImgInfo([
          {
            blobUrl: fileToBlob(evt.target.files[0]),
            imgFileInfo: evt.target.files[0]
          }
        ])
      }
      if (singleImgInfo.length >= 1) {
        singleImgInfo.pop();
        setSingleImgInfo([
          {
            blobUrl: fileToBlob(evt.target.files[0]),
            imgFileInfo: evt.target.files[0]
          }
        ])
      }
    }
  };

  /* ------------------------------------------- */

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  /* ------------------------------------------- */

  // * 存储网络服务器的所有图片信息列表
  const [_picNetworkList, setPicNetworkList] = useState<string[]>([]);
  // * 读取服务器中所有图片在线路径地址
  const getServerAllImgUrl = async () => {
    const res = await getKoaServerPicFile();
    res && setPicNetworkList(res.data as string[]);
  };
  useEffect(() => {
    getServerAllImgUrl();
  }, []);

  /* ------------------------------------------- */

  // * 上传逻辑处理
  /** 上传进度条回调函数 */
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    console.log('progressEvent :>> ', progressEvent);
  };
  const uploadSimgleFileImg = async (fileSingleInfo: File) => {
    if (!fileSingleInfo) {
      alert('系统未检测到图片，请上传后重试！');
      return;
    }
    let formData = new FormData();
    formData.append("fileName", fileSingleInfo.name);
    formData.append("fileSize", String(fileSingleInfo.size));
    formData.append("fileType", fileSingleInfo.type);
    formData.append("pic_sin", fileSingleInfo);
    try {
      const res = await singlePicUpload(formData, uploadProgressCallback);
      if (res.code === 200) {
        message.open({
          type: 'success',
          content: '图片上传成功！',
        });
        setSingleImgInfo([]);
        getServerAllImgUrl();
      }
    } catch (err) {
      message.open({
        type: 'error',
        content: '图片上传失败，请检查网络或 Koa 服务开启状态',
      });
    }
  };

  /* ------------------------------------------- */
  const [visiable, setVisiable] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Space
        direction="vertical"
        size="middle"
        style={{ display: 'flex' }}
      >
        <Card title="图片上传区域">
          <div className={style.uploadContainer}>
            <label
              form='customPicUpload'
              className={style.change_photo_btn}
            >
              <input
                id='customPicUpload'
                className={style.change_photo_btn}
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/bmp"
                style={{ display: 'none' }}
                onChange={(evt) => receiveFile(evt)}
              />
              <span className={classnames('iconfont icon-add', style.picAdd)} />
            </label>

            <div className={style.circleBox}>
              {
                singleImgInfo && singleImgInfo.length > 0 && (
                  singleImgInfo.map((img, _index) => {
                    return (
                      <React.Fragment key={_index}>
                        <div className={style.singleViewCircle}>
                          <img
                            src={img.blobUrl}
                            alt="暂无图片"
                            ref={imgViewRef}
                            className={style.singleViewImg}
                          />
                          <div className={style.markBok}>
                            <span
                              className={classnames(`iconfont ${isPlay ? "icon-caozuo-bofang-zanting" : "icon-bofang"}`, style.iconPlay)}
                              title={isPlay ? "暂停动画" : "播放动画"}
                              onClick={handlePlayCtl}
                            />
                            <span
                              className={classnames('iconfont icon-shangchuan', style.iconUpload)}
                              title='上传图片'
                              onClick={() => uploadSimgleFileImg(img.imgFileInfo)}
                            />
                            <span className={classnames('iconfont icon-yulan', style.iconkuodaView)}
                              title='图片预览'
                              onClick={() => setVisiable(true)} />
                            <Popover
                              placement="right"
                              trigger="click"
                              title={'图片更多信息'}
                              content={content}
                            >
                              <span
                                className={classnames('iconfont icon-elipsis', style.picMoreInfo)}
                                title='图片信息'
                              />
                            </Popover>
                          </div>
                        </div>
                      </React.Fragment>
                    )
                  })
                )
              }
            </div>
          </div>
        </Card>

        <Card hoverable title="图片预览区域">

        </Card>
      </Space>
      <PicView visiable={visiable} setVisiable={setVisiable} singleImgInfo={singleImgInfo} />
    </React.Fragment>
  );
};

export default SinglePicFile;
