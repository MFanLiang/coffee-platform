import React from "react";
import lazyLoad from "../utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// 系统配置模块
const systemConfigRouter: Array<RouteObject> = [
  {
    element: < LayoutIndex />,
    path: "/systemConfig",
    meta: {
      title: "系统配置"
    },
    children: [
      {
        path: "/systemConfig/menuSetting",
        element: lazyLoad(React.lazy(() => import("@/views/systemConfig/menuSetting/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单设置",
          key: "menuSetting"
        }
      },
      {
        path: "/systemConfig/userSetting",
        element: lazyLoad(React.lazy(() => import("@/views/systemConfig/userSetting/index"))),
        meta: {
          requiresAuth: true,
          title: "用户设置",
          key: "userSetting"
        }
      }
    ]
  }
];

export default systemConfigRouter;
