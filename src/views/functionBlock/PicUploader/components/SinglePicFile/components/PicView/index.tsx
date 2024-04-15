import MyDialogModal from '@/components/MyDialogModal';

/** 图片预览组件 */
const PicView = (props: any) => {
  const { visiable, setVisiable } = props;

  return (
    <MyDialogModal
      visiable={visiable}
      keyboard={true}
      maskClosable={false}
      mask={true}
      fullScreenPower={true}
      isFullScreen={true}
      onOk={(_e: React.MouseEvent<HTMLButtonElement>) => {
        setVisiable(false);
      }}
      onCancel={(_e: React.MouseEvent<HTMLButtonElement>) => {
        setVisiable(false);
      }}
    >
      <div>中间内容文本</div>
    </MyDialogModal>
  );
}

export default PicView;
