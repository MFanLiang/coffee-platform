import React from 'react';
import lazyLoad from '../utils/lazyLoad';
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 功能区块 模块
const functionalBlock: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "功能区块"
    },
    children: [
      {
        path: "/functionalBlock/pic-selector",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/PicSelector/index"))),
        meta: {
          requiresAuth: true,
          title: "图片选择器",
          key: "pic-selector"
        }
      },
      {
        path: "/functionalBlock/pdfView",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/pdfView/index"))),
        meta: {
          requiresAuth: true,
          title: "pdf 预览器",
          key: "pdfView"
        }
      },
      {
        path: "/functionalBlock/webide",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/webIDE/index"))),
        meta: {
          requiresAuth: true,
          title: "WebIDE 编辑器",
          key: "webide"
        }
      },
      {
        path: "/functionalBlock/dialog",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/MyDialog/index"))),
        meta: {
          requiresAuth: true,
          title: "原生弹窗",
          key: "dialog"
        }
      },
      {
        path: "/functionalBlock/pic-uploader",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/PicUploader/index"))),
        meta: {
          requiresAuth: true,
          title: "图片文件上传器",
          key: "picUploader"
        }
      },
      {
        path: "/functionalBlock/drag-controler",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/DragControler/index"))),
        meta: {
          requiresAuth: true,
          title: "拖拽控制器",
          key: "DragControler"
        }
      },
      {
        path: "/functionalBlock/copy",
        element: lazyLoad(React.lazy(() => import("@/views/functionBlock/CopyComp/index"))),
        meta: {
          requiresAuth: true,
          title: "copy-to-clipboard",
          key: "copyToClipboard"
        }
      }
    ]
  }
];

export default functionalBlock;
