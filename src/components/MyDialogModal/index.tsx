import { forwardRef, useEffect, useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import type { myDialogModalRef, IProps } from './type';
import style from './style.module.less';
// * 引入动画函数样式表
import './animation.less';

const MyDialogModal = forwardRef<myDialogModalRef, IProps>((props, _ref) => {
  const {
    title = '弹框标题',
    titlePosition = 'tl',
    children,
    visiable,
    placement = "scale",
    keyboard = false,
    maskClosable = false,
    mask = true,
    fullScreenPower = false,
    isFullScreen = false,
    width = 800,
    height = 560,
    useMove = false,
    customFooterBtn,
  } = props;

  /** 检测当前浏览器body 的 dom 是否支持动画属性 */
  function canUse() {
    const animationNode = document.getElementsByTagName("body")[0].style as any;
    if (typeof animationNode.animation !== 'undefined' || typeof animationNode.WebkitAnimation !== 'undefined') {
      return true;
    }
    return false;
  };

  /** 弹框打开前的动画函数 */
  function actionIn(dom: any, actionName: string, time: number, _speed?: number) {
    if (!canUse()) {
      alert('该浏览器不支持 css 动画');
      return;
    };
    dom.style.display = 'flex';
    dom.style.animation = `${actionName} ${time}s ease-in-out`;
  };

  /** 弹框关闭前的动画函数 */
  function actionOut(dom: any, actionName: string, time: number, _speed?: number) {
    if (!canUse()) {
      alert('该浏览器不支持 css 动画');
      return;
    };
    dom.style.animation = `${actionName} ${time}s ease-in-out`;
    let setIntObj = setInterval(function () {
      dom.style.display = 'none';
      clearInterval(setIntObj);
    }, time * 950);
  };

  /** 监听键盘事件 esc键 的关闭动作 */
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (keyboard) {
      if (modalRef.current) {
        modalRef.current.addEventListener('keydown', (e: any) => {
          if (e.keyCode === 27) {
            handleCancel(e);
          }
        })
      }
    }
  }, [modalRef.current]);

  /** 开启弹框 */
  const showModal = () => {
    if (modalRef.current) {
      if (placement === ('rotateX' || 'rotateY')) {
        actionIn(modalRef.current, placement, .8);
      } else {
        actionIn(modalRef.current, placement, .3);
      }
      // * 开启弹框后，立即将 div 获取焦点，以便后续通过键盘 ESC 键关闭弹框动作事件
      modalRef.current.focus();
    }
  };

  /** 关闭弹框 */
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (placement === ('rotateX' || 'rotateY')) {
      actionOut(modalRef.current, `${placement}Out`, .8);
    } else {
      actionOut(modalRef.current, `${placement}Out`, .3);
    }
    const { onCancel } = props;
    onCancel?.(e);
    // 当弹框关闭动画执行完毕之后，恢复弹框居中位置(left: 50%, top: 50%)
    let timer = setInterval(function () {
      if (dialogModalRef.current) {
        dialogModalRef.current.style.left = "50%";
        dialogModalRef.current.style.top = "50%";
      }
      clearInterval(timer);
    }, 0.8 * 950)
  };

  /** 单击“确定”按钮时将调用的函数 */
  const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { onOk } = props;
    onOk?.(e);
  };

  /** 监听visiable弹窗的开启状态 */
  useEffect(() => {
    // @ts-ignore
    visiable ? showModal() : handleCancel();
  }, [visiable]);

  // * 处理蒙层关闭事件
  const handleCloseMaskParent = (e: any) => {
    if (mask && maskClosable) {
      if (e.target.tabIndex === 1) {
        handleCancel(e);
      }
    }
  };

  // * 控制弹框是否以最大化显示
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => isFullScreen ? isFullScreen : false);
  const handleFullModal = () => {
    const tempIsFullscreen = !isFullscreen;
    setIsFullscreen(tempIsFullscreen);
  };

  // * 处理拖动弹窗动作
  const dialogModalRef = useRef<HTMLDivElement>(null);
  const modalHeaderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (useMove) {
      modalHeaderRef.current?.addEventListener("mousedown", function (evt) {
        if (dialogModalRef.current) {
          let x = evt.pageX - dialogModalRef.current?.offsetLeft;
          let y = evt.pageY - dialogModalRef.current?.offsetTop;
          document.addEventListener("mousemove", move);
          function move(evt: any) {
            if (dialogModalRef.current) {
              // 鼠标在页面内的坐标减去鼠标在弹框内的坐标就是弹窗距离页面边缘的距离
              dialogModalRef.current.style.left = evt.pageX - x + "px";
              dialogModalRef.current.style.top = evt.pageY - y + "px";
            }
          }
          document.addEventListener("mouseup", function () {
            document.removeEventListener("mousemove", move);
          })
        }
      });
    }
  }, [useMove, modalHeaderRef.current, dialogModalRef.current]);

  return (
    <div
      tabIndex={1}
      ref={modalRef}
      className={classnames(style.outlineBox)}
      onClick={handleCloseMaskParent}
    >
      <div
        className={classnames(style.dialogModal, isFullscreen ? style.fullDialogModal : null)}
        style={{ width, height }}
        ref={dialogModalRef}
      >
        <div
          ref={modalHeaderRef}
          className={classnames(style.dialogModalHeader, style[titlePosition])}
          style={{ cursor: isFullscreen || !useMove ? "default" : 'move' }}
        >
          <span>{title}</span>
          <span>
            {fullScreenPower ? (<span
              onClick={handleFullModal}
              style={{ marginRight: '20px', fontSize: '18px', cursor: "pointer" }}
            >
              {!isFullscreen ? <FullscreenOutlined title="最大化" /> : <FullscreenExitOutlined title="还原" />}
            </span>) : null}
            <CloseOutlined title='关闭' onClick={handleCancel} className={style.closeIcon} />
          </span>
        </div>

        <div className={style.dialogModalContent}>
          {children}
        </div>

        <div className={style.dialogModalFooter}>
          <Space size={"small"}>
            {!customFooterBtn ? (<>
              <Button type="default" onClick={handleCancel}>取消</Button>
              <Button type="primary" onClick={handleOk}>确认</Button>
            </>) : <>{customFooterBtn()}</>}
          </Space>
        </div>
      </div>
    </div>
  )
});

export default MyDialogModal;
