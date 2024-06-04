import React, { useRef, useState, useEffect } from 'react';
import { message, Card } from 'antd';
import classnames from 'classnames';
import { fileToBlob } from '@/utils/FiileConversion';
import { singlePicUpload, getKoaServerPicFile } from '@/api/modules/fileList';
import { AxiosProgressEvent } from 'axios';
import styles from './index.module.less';
import PicViewController from '@/components/PicViewController';

interface IImgSourceType {
  /** blob预览地址 */
  blobUrl: string;
  /** 图片文件源信息 */
  imgFileInfo: any;
}

const SinglePicFile = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const imgViewRef = useRef<HTMLImageElement>(null);
  // 单张图片源 数据
  const [simgleImgSrc, setSimgleImgSrc] = useState<IImgSourceType[]>([]);
  // 预览缩略图是否播放动画
  const [isPlay, setIsPlay] = useState(true);
  // 图片预览选择器弹窗状态
  const [openVisible, setOpenVisible] = useState(false);
  // 在线图片集合
  const [netUrl, setNetUrl] = useState<string[]>([]);

  /** 解析图片文件 */
  const receiveFile = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt && evt.target.files?.length) {
      // 获取单张图片信息
      setSimgleImgSrc([
        {
          blobUrl: fileToBlob(evt.target.files[0]),
          imgFileInfo: evt.target.files[0]
        }
      ]);
    }
  };

  /** 缩略图动画控制 */
  const handlePlay = () => {
    setIsPlay(!isPlay);
    if (imgViewRef.current) {
      imgViewRef.current.style.animationPlayState = !isPlay ? 'running' : 'paused';
    }
  };

  /** 上传进度条回调函数 */
  const uploadProgressCallback = (progressEvent: AxiosProgressEvent) => {
    console.log('progressEvent :>> ', progressEvent);
  }

  /** 单张图片上传处理 */
  const uploadSimgleFileImg = async (fileSimgle: File) => {
    if (!fileSimgle) {
      alert('系统未检测到图片，请上传后重试！');
      return;
    }
    let formData = new FormData();
    formData.append("fileName", fileSimgle.name);
    formData.append("fileSize", String(fileSimgle.size));
    formData.append("fileType", fileSimgle.type);
    formData.append("file", fileSimgle);
    try {
      const res = await singlePicUpload(formData, uploadProgressCallback);
      if (res.code === 200) {
        messageApi.open({
          type: 'success',
          content: '图片上传成功！',
        });
        setSimgleImgSrc([]);
        getServerAllImgUrl();
      }
    } catch (err) {
      messageApi.open({
        type: 'error',
        content: '图片上传失败，请检查网络或 Koa 服务开启状态',
      });
    }
  };

  // 读取服务器中所有图片在线路径地址
  const getServerAllImgUrl = async () => {
    await getKoaServerPicFile().then(response => {
      console.log('response :>> ', response);
    })
  };

  useEffect(() => {
    getServerAllImgUrl();
  }, []);

  return (
    <React.Fragment>
      <Card>
        <div className={styles.uploadContainer}>
          {/* 单一图片文件上传 */}

          <div className={styles.simgleBody}>
            {/* 文件选择器 */}
            <label className={styles.change_photo_btn} form="customeFile" title='上传文件'>
              <input
                id='customeFile'
                className={styles.change_photo_btn}
                type="file"
                accept="image/jpg,image/png,image/jpeg,image/bmp"
                style={{ display: 'none' }}
                onChange={(evt) => receiveFile(evt)}
              />
              <span className={classnames('iconfont icon-quxiao', styles.increment)} />
            </label>

            {/* 图片预览缩略图 */}
            <div className={styles.simgleViewCircle}>
              {simgleImgSrc && simgleImgSrc.length > 0 ? (
                simgleImgSrc.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <img src={item.blobUrl} className={styles.simgleViewImg} ref={imgViewRef} alt="" />
                      <div className={styles.mark}>
                        <span
                          className={classnames(`iconfont ${isPlay ? "icon-tingzhi" : "icon-bofang"}`, styles.iconPlay)}
                          title={isPlay ? "暂停动画" : "播放动画"}
                          onClick={handlePlay}
                        />
                        <span
                          className={classnames('iconfont icon-shangyi', styles.iconUpload)}
                          title='上传图片'
                          onClick={() => uploadSimgleFileImg(item.imgFileInfo)}
                        />
                        <span
                          className={classnames('iconfont icon-chakan', styles.iconkuodaView)}
                          title='图片预览'
                          onClick={() => setOpenVisible(true)}
                        />
                      </div>
                    </React.Fragment>
                  );
                })
              ) : (<div className={styles.noImg}>暂无图片</div>)}
            </div>

            {/* 图片详细信息 */}
            <div className={styles.imgViewInfo}>
              {simgleImgSrc && simgleImgSrc.length > 0 ? simgleImgSrc.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <p className={styles.itemdesc}>图片名称：{item.imgFileInfo.name}</p>
                    <p className={styles.itemdesc}>图片类型：{item.imgFileInfo.type}</p>
                    <p className={styles.itemdesc}>图片大小：{item.imgFileInfo.size}</p>
                  </React.Fragment>
                );
              }) : (<div className={styles.noInfo}>暂无图片信息</div>)}
            </div>
          </div>

          <div className={styles.article}>
            {netUrl && netUrl.length > 0 && netUrl.map((item, index) => {
              return (
                <div key={index} className={styles.darImgCon}>
                  <img src={item} rel="noreferrer" className={styles.imgshili} alt="" />
                  <div className={styles.mark}>
                    <span
                      className={classnames('iconfont icon-chakan', styles.iconkuodaView)}
                      title='图片预览'
                      onClick={() => {
                        setOpenVisible(true);
                        setSimgleImgSrc([
                          {
                            blobUrl: item,
                            imgFileInfo: ''
                          }
                        ]);
                      }}
                    />
                  </div>
                </div>
              );
            })}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
              return <i style={{ width: '130px' }} key={item}></i>
            })}
          </div>

          {contextHolder}
          {openVisible && <PicViewController
            openVisible={openVisible}
            setOpenVisible={setOpenVisible}
            simgleImgSrc={simgleImgSrc}
          />}
        </div>
      </Card>

    </React.Fragment>
  )
};

export default SinglePicFile;
