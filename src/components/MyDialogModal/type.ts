export type myDialogModalRef = HTMLDivElement;

export interface IProps {
  children: React.ReactNode;
  /** 弹框是否开启 */
  visiable: boolean;
  /** 标题 */
  title?: string;
  /** 弹框宽度 default: 800 */
  width?: number;
  /** 弹框高度 default: 560 */
  height?: number;
  /** 标题显示位置 [tl: titleLeft缩写] [tc：titleCenter缩写] */
  titlePosition?: 'tl' | 'tc';
  /** 动画执行方向 */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'rotateX' | 'rotateY' | 'scale';
  /** 是否支持键盘 esc 关闭 */
  keyboard?: boolean;
  /** 点击蒙层是否允许关闭 */
  maskClosable?: boolean;
  /** 是否展示遮罩 */
  mask?: boolean;
  /** 是否启用弹框全屏按钮能力 */
  fullScreenPower?: boolean;
  /** 是否显示全屏显示 */
  isFullScreen?: boolean;
  /** 是否启用弹框拖拽移动 */
  useMove?: boolean;
  /** 自定义底部按钮 */
  customFooterBtn?: () => JSX.Element;
  /** 指定用户单击“确定”按钮时将调用的函数 */
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 指定当用户单击屏蔽、右上方的关闭按钮或取消按钮时将调用的函数 */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
