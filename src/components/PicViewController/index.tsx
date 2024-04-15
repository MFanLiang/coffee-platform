import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import styles from './index.module.less';

interface IImgSourceType {
  /** blob预览地址 */
  blobUrl: string;
  /** 图片文件源信息 */
  imgFileInfo: File;
}

interface IProps {
  openVisible: boolean;
  setOpenVisible: React.Dispatch<React.SetStateAction<boolean>>;
  simgleImgSrc: IImgSourceType[];
}

/** 图片预览控制器 */
const PicViewController: React.FC<IProps> = (props) => {
  const { openVisible, setOpenVisible, simgleImgSrc } = props;
  const picAnimationRef = useRef<any>();
  const picDivRef = useRef<any>();
  const imgBoxRef = useRef<any>();
  const imgMoveDomRef = useRef<any>();
  const [animationVis, setAnimationVis] = useState(false);
  const [heightProportion, setHeightProportion] = useState<number>(0);

  /** 监听键盘事件 esc键 的关闭动作 */
  useEffect(() => {
    if (picDivRef.current) {
      picDivRef.current.focus();
      picDivRef.current.addEventListener('keydown', (e: any) => {
        if (e.keyCode === 27) {
          markCloseAction();
        }
      })
    }
  }, [picDivRef]);

  /** 监听弹窗，执行弹窗开启关闭动画 */
  useEffect(() => {
    openVisible ? setAnimationVis(true) : setAnimationVis(false);
  }, [openVisible]);

  useEffect(() => {
    // 获取图片原始高度
    if (simgleImgSrc) {
      var temImg = new Image();
      temImg.src = simgleImgSrc[0].blobUrl;
      temImg.onload = () => {
        setHeightProportion(Number(Math.floor(temImg.height * 0.1).toFixed(0)));
      }
    };
    return () => {
      clearInterval(picAnimationRef.current);
    }
  }, []);

  const limitBorder = (innerDOM: any, outerDOM: any, moveX: number, moveY: number, multiple: number) => {
    let { clientWidth: innerWidth, clientHeight: innerHeight, offsetLeft: innerLeft, offsetTop: innerTop } = innerDOM
    let { clientWidth: outerWidth, clientHeight: outerHeight } = outerDOM
    let transX
    let transY
    // 放大的图片超出box时 图片最多拖动到与边框对齐
    if (innerWidth * multiple > outerWidth || innerHeight * multiple > outerHeight) {
      if (innerWidth * multiple > outerWidth && innerWidth * multiple > outerHeight) {
        transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
        transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
      } else if (innerWidth * multiple > outerWidth && !(innerWidth * multiple > outerHeight)) {
        transX = Math.min(Math.max(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
        transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
      } else if (!(innerWidth * multiple > outerWidth) && innerWidth * multiple > outerHeight) {
        transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
        transY = Math.min(Math.max(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
      }
    }
    // 图片小于box大小时 图片不能拖出边框
    else {
      transX = Math.max(Math.min(moveX, outerWidth - innerWidth * (multiple + 1) / 2 - innerLeft), -innerLeft + innerWidth * (multiple - 1) / 2)
      transY = Math.max(Math.min(moveY, outerHeight - innerHeight * (multiple + 1) / 2 - innerTop), -innerTop + innerHeight * (multiple - 1) / 2)
    }
    return { transX, transY }
  };

  useEffect(() => {
    if (imgMoveDomRef.current) {
      imgMoveDomRef.current.addEventListener("load", () => {
        imgMoveDomRef.current.addEventListener('wheel', (evt: any) => {
          let transf = getTransform(imgMoveDomRef.current);
          if (evt.deltaY > 0) {
            if (Number(transf.multiple.toFixed(2)) <= 0.5) {
              transf.multiple = 0.5;
              return null;
            }
            transf.multiple /= 1.5;
          } else {
            if (Number(transf.multiple.toFixed(2)) >= 10) {
              transf.multiple = 10;
              return null;
            }
            transf.multiple *= 1.5;
          }
          let newTransf = limitBorder(imgMoveDomRef.current, imgBoxRef.current, transf.transX, transf.transY, transf.multiple);
          imgMoveDomRef.current.style.transform = `matrix(${transf.multiple}, 0, 0, ${transf.multiple}, ${newTransf.transX}, ${newTransf.transY})`
        })
      })
    }
  }, [imgMoveDomRef]);

  /** 弹窗蒙层关闭处理 */
  const markCloseAction = () => {
    setAnimationVis(false);
    picAnimationRef.current = setInterval(() => {
      setOpenVisible(false);
      setAnimationVis(false);
    }, 300);
  };

  const getTransform = (DOM: HTMLDivElement) => {
    let arr = getComputedStyle(DOM).transform.split(',')
    return {
      transX: isNaN(+arr[arr.length - 2]) ? 0 : +arr[arr.length - 2], // 获取translateX
      transY: isNaN(+arr[arr.length - 1].split(')')[0]) ? 0 : +arr[arr.length - 1].split(')')[0], // 获取translateY
      multiple: +arr[3] // 获取图片缩放比例
    }
  };

  const handleImgMove = (evt: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    evt.preventDefault();
    if (imgMoveDomRef.current && imgBoxRef.current) {
      imgMoveDomRef.current.style.cursor = "grabbing";
      let xxx = evt.clientX - imgMoveDomRef.current.offsetLeft;
      let yyy = evt.clientY - imgMoveDomRef.current.offsetTop;
      imgBoxRef.current.onmousemove = (e: any) => {
        let moveX = e.clientX - xxx;
        let moveY = e.clientY - yyy;

        // 图形移动的边界判断
        // if ((imgBoxRef.current.offsetWidth >= imgMoveDomRef.current.offsetWidth) && (imgBoxRef.current.offsetHeight >= imgMoveDomRef.current.offsetHeight)) {
        //   // 控制图片移动过程中，图片左边缘到上层父容器左边缘的边界
        //   moveX = moveX <= 0 ? 0 : moveX;
        //   // 控制图片移动过程中，图片右边缘到上层父容器右边缘的边界
        //   moveX = moveX >= imgBoxRef.current.offsetWidth - imgMoveDomRef.current.offsetWidth ? imgBoxRef.current.offsetWidth - imgMoveDomRef.current.offsetWidth : moveX;
        //   // 控制图片移动过程中，图片上边缘到上层父容器上边缘的边界
        //   moveY = moveY <= 0 ? 0 : moveY;
        //   // 控制图片移动过程中，图片下边缘到上层父容器下边缘的边界
        //   moveY = moveY >= imgBoxRef.current.offsetHeight - imgMoveDomRef.current.offsetHeight ? imgBoxRef.current.offsetHeight - imgMoveDomRef.current.offsetHeight : moveY;
        // }

        imgMoveDomRef.current.style.left = moveX + 'px';
        imgMoveDomRef.current.style.top = moveY + 'px';
      }

      imgBoxRef.current.onmouseup = () => {
        imgMoveDomRef.current.style.cursor = "grab";
        imgBoxRef.current.onmousemove = null;
      }
    }
  };

  return (
    <div
      tabIndex={1}
      ref={picDivRef}
      className={classnames(styles.picViewMark, animationVis ? styles.open : styles.close)}
    >
      <div className={styles.header}>
        <span>图片预览器</span>
        <span className={classnames('iconfont icon-quxiao', styles.iconClose)} onClick={markCloseAction} />
      </div>
      <div className={styles.contant}>
        <div className={styles.dragContainer}>
          <div className={styles.imgBox} ref={imgBoxRef}>
            {simgleImgSrc && simgleImgSrc.map((item, index) => {
              return (
                <img
                  key={index}
                  className={styles.imgItem}
                  src={item.blobUrl}
                  alt=""
                  ref={imgMoveDomRef}
                  onMouseDown={(evt) => handleImgMove(evt)}
                  style={{ height: heightProportion }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.bottomAction}>

        </div>
      </div>
    </div>
  )
}

export default PicViewController;
