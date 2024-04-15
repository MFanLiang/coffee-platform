import { useState } from 'react';
import { Button } from 'antd';
import MyDialogModal from '@/components/MyDialogModal';
import './index.less';

const MyDialog = () => {
  const [visiable, setVisiable] = useState<boolean>(false);

  return (
    <div>
      <Button type="primary" onClick={() => {
        setVisiable(true);
      }}>
        Open Modal
      </Button>
      <MyDialogModal
        visiable={visiable}
        keyboard={true}
        maskClosable={false}
        mask={true}
        fullScreenPower={false}
        isFullScreen={false}
        onOk={(_e: React.MouseEvent<HTMLButtonElement>) => {
          setVisiable(false);
        }}
        onCancel={(_e: React.MouseEvent<HTMLButtonElement>) => {
          setVisiable(false);
        }}
      >
        <div>中间内容文本</div>
      </MyDialogModal>
    </div>
  );
};

export default MyDialog;
