import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import "./index.less";

/**
 * 右键菜单
 * @returns components
 */
const RightClickMenu = () => {

  /**
   * @description 处理菜单开启或关闭能力
   * @returns void
   */
  const handleMenuOpenOrClose = () => {
    let rightMenu = document.getElementById("rightMenu") as HTMLDivElement;
    let submenu = document.getElementById("submenu") as HTMLDivElement;
    // * 鼠标右键唤起菜单栏
    window.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      let x = event.offsetX;
      let y = event.offsetY;
      let winWidth = window.innerWidth;
      let winHeight = window.innerHeight;
      let menuWidth = rightMenu.offsetWidth;

      let menuHeight = rightMenu.offsetHeight;
      x = winWidth - menuWidth >= x ? x : winWidth - menuWidth; // 这里处理菜单栏溢出现象
      y = winHeight - menuHeight >= y ? y : winHeight - menuHeight; // 这里处理菜单栏溢出现象
      rightMenu.style.left = x + "px";
      rightMenu.style.top = y + "px";
      // * 这里处理菜单栏溢出现象
      if (x > (winWidth - menuWidth - submenu.offsetWidth)) {
        submenu.style.left = '-221px';
      } else {
        submenu.style.left = '';
        submenu.style.right == '-241px';
      }
      rightMenu.classList.add("active");
    });

    // * 鼠标左键关闭菜单栏
    window.addEventListener("click", function (event) {
      event.preventDefault();
      rightMenu.classList.remove("active");
    });
  };

  /**
   * @description 处理菜单栏点击事件能力
   * @returns void
   */
  const handleMenuClickEvent = () => {
    let topMenu = document.getElementById("topMenu") as HTMLDivElement;
    let container_box = document.getElementById("container_box") as HTMLDivElement;
    let submenu = document.getElementById("submenu") as HTMLDivElement;
    let footer_expand = document.getElementById("footer_expand") as HTMLDivElement;

    topMenu.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault();
      switch ((event.target as HTMLDivElement).id) {
        case "goPrev": {
          history.back();
          break;
        }
        case "goNext": {
          history.go(1);
          break;
        }
        case "goTop": {
          console.log("返回顶部");
          break;
        }
        case "refresh": {
          location.reload();
          break;
        }
        default:
          break;
      }
    }, false);
    container_box.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault();
      switch ((event.target as HTMLDivElement).id) {
        case "program_1": {
          console.log("功能1");
          break;
        }
        case "program_2": {
          console.log("功能2");
          break;
        }
        case "program_3": {
          console.log("功能3");
          break;
        }
        case "program_4": {
          console.log("功能4");
          break;
        }
        default:
          break;
      }
    }, false);
    submenu.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault();
      switch ((event.target as HTMLDivElement).id) {
        case "program_sub_1": {
          console.log("功能4-1");
          break;
        }
        case "program_sub_2": {
          console.log("功能4-2");
          break;
        }
        case "program_sub_3": {
          console.log("功能4-3");
          break;
        }
        case "program_sub_4": {
          console.log("功能4-4");
          break;
        }
        default:
          break;
      }
    }, false);
    footer_expand.addEventListener("click", function (event: MouseEvent) {
      event.preventDefault();
      switch ((event.target as HTMLDivElement).id) {
        case "perch_1": {
          console.log("底部占位1");
          break;
        }
        case "perch_2": {
          console.log("底部占位2");
          break;
        }
        case "perch_3": {
          console.log("底部占位3");
          break;
        }
        default:
          break;
      }
    }, false);
  };

  useEffect(() => {
    handleMenuOpenOrClose();
    handleMenuClickEvent();
  });

  return ReactDOM.createPortal(
    <div id="rightMenu" className="rightMenu">
      <div className="topMenu" id="topMenu">
        <span className="iconfont icon-arrow-left" title="上一页" id="goPrev"></span>
        <span className="iconfont icon-arrow-right" title="下一页" id="goNext"></span>
        <span className="iconfont icon-arrow-up" title="返回顶部" id="goTop"></span>
        <span className="iconfont icon-Refresh" title="刷新" id="refresh"></span>
      </div>
      <div className="container_box" id="container_box">
        <div className="menu_item" id="program_1">
          <span className="iconfont icon-a-058_kafei prefixIcon"></span>
          功能1
        </div>
        <div className="menu_item" id="program_2">
          <span className="iconfont icon-a-058_miantiao prefixIcon"></span>
          功能2
        </div>
        <div className="menu_item" id="program_3">
          <span className="iconfont icon-a-058_qiepian prefixIcon"></span>
          功能3
        </div>
        <div className="menu_item" id="program_4">
          <span className="iconfont icon-a-058_shala prefixIcon"></span>
          功能4
          <span className="iconfont icon-back backIcon"></span>
          <div id="submenu" className="submenu">
            <div className="submenu__item" id="program_sub_1">
              <span className="iconfont icon-a-058_shala prefixIcon"></span>
              功能4-1
            </div>
            <div className="submenu__item" id="program_sub_2">
              <span className="iconfont icon-a-058_shala prefixIcon"></span>
              功能4-2
            </div>
            <div className="submenu__item" id="program_sub_3">
              <span className="iconfont icon-a-058_shala prefixIcon"></span>
              功能4-3
            </div>
            <div className="submenu__item" id="program_sub_4">
              <span className="iconfont icon-a-058_shala prefixIcon"></span>
              功能4-4
            </div>
          </div>
        </div>
      </div>

      <div className="driver_liner"></div>

      <div className="footer_expand" id="footer_expand">
        <div className="menu_item" id="perch_1">
          <span className="iconfont icon-a-058_reshi prefixIcon"></span>
          底部占位1
        </div>
        <div className="menu_item" id="perch_2">
          <span className="iconfont icon-a-058_tianpin prefixIcon"></span>
          底部占位2
        </div>
        <div className="menu_item" id="perch_3">
          <span className="iconfont icon-a-058_reyin prefixIcon"></span>
          底部占位3
        </div>
      </div>
    </div>,
    // 单独渲染目标的 dom 元素
    document.getElementById("customRightMenu") as any
  );
};

export default RightClickMenu;
