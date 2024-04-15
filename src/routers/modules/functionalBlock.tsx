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
      }
    ]
  }
];

// {
//   "icon": "FilePdfOutlined",
//     "path": "/functionalBlock/pdfView",
//       "title": "pdf 预览器"
// },
// {
//   "icon": "BgColorsOutlined",
//     "path": "/functionalBlock/webide",
//       "title": "WebIDE 编辑器"
// },
// {
//   "icon": "AndroidOutlined",
//     "path": "/functionalBlock/dialog",
//       "title": "原生弹窗"
// },
// {
//   "icon": "UploadOutlined",
//     "path": "/functionalBlock/pic-uploader",
//       "title": "图片文件上传器"
// },
// {
//   "icon": "PictureOutlined",
//     "path": "/functionalBlock/pic-selector",
//       "title": "图片选择器"
// },
// {
//   "icon": "DragOutlined",
//     "path": "/functionalBlock/drag-controler",
//       "title": "拖拽控制器"
// },
// {
//   "icon": "ArrowRightOutlined",
//     "path": "/functionalBlock/copy",
//       "title": "copy-to-clipboard"
// }

export default functionalBlock;
