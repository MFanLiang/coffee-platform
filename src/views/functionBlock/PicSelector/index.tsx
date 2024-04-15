import React, { createRef, useState } from 'react';
import { Button, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import defaultPic from '@/assets/images/green.jpg';
import Cropper, { ReactCropperElement } from "react-cropper";
import "./cropper.less";
import './index.less';

const PicSelector = () => {
  const [image, setImage] = useState(defaultPic);
  /** 裁剪器对象实例 */
  const cropperRef = createRef<ReactCropperElement>();

  /** 存储裁减完成后的 base64 图片编码 */
  const [cropBase64Data, setCropBase64Data] = useState("#");

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const props: UploadProps = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);

      return false;
    },
    onChange(info) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as any);
      };
      reader.readAsDataURL(info.file as any);
    },
    fileList,
    showUploadList: false,
  };

  const handleIncrement = () => { };

  const handleDecrement = () => { };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropBase64Data(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <div className='card picSelect-box'>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      {/* <Button onClick={handleIncrement}> 增加0.1 </Button>
      <Button onClick={handleDecrement}> 减少0.1 </Button> */}
      <Button onClick={getCropData}> 裁减 </Button>

      <Cropper
        ref={cropperRef}
        className="cropperOperateArea"
        dragMode="move" // 裁剪器拖拽模式为移动画布
        aspectRatio={1} // 定义裁剪框的固定纵横比
        zoomTo={0.2}
        preview=".img-preview-normal"
        src={image}
        viewMode={1}
        minCropBoxHeight={10} // 裁剪框的最小宽度
        minCropBoxWidth={10} // 裁剪框的最小高度
        background={true} // 显示容器的网格背景
        responsive={true} // 调整窗口大小时重新渲染裁剪器
        autoCropArea={0.5} // 定义自动裁剪区域大小（百分比）。介于 0 和 1 之间的数字。
        checkOrientation={false} // 检查当前图像的 Exif 方向信息。请注意，只有 JPEG 图像可能包含 Exif 方向信息
        guides={true} // 显示裁剪框上方的虚线
        minContainerWidth={484} // 容器最小宽度
        minCanvasHeight={354} // 容器最小高度
      />

      <div className="img-preview-normal" />

      <div className='cropImageDisplay'>
        {cropBase64Data !== '#' ? <img className='cropImage' src={cropBase64Data} alt="cropped" /> : null}
      </div>
    </div>
  );
};

export default PicSelector;
