# :gem: coffee-platform :gem:

### 介绍 :blue_book:

:rose: :rose: :rose: coffee-platform，是基于 React18、React-Router v6、React-Hooks、Redux、TypeScript、Vite2、Ant-Design 实现的一套开源的后台管理平台(提供自己学习使用的:joy::joy::joy:)。

### 项目相关文档 :bookmark:

- 文件资源目录：点击[这里](./markdown/treer.md)跳转查看 :whale:

- 项目现阶段出现的问题: [BUGSLOG.md](BUGSLOG.md) :whale:

### 一、在线预览地址 :eyes:

> :sound: 请注意：
> 需要在电脑端访问

- Link：https://xiaomenglovecoffee.top/coffee-platform/

### 二、Git 仓库地址 (欢迎 Star⭐)

- GitHub：https://github.com/MFanLiang/coffee-platform

### 三、:meat_on_bone: 项目功能

- :coffee: 采用以下技术找开发：React18、React-Router v6、React-Hooks、TypeScript V5、Vite V5、Antd V4.22.2
- :fried_shrimp: 采用 Vite2 作为项目开发、打包工具（配置了 Gzip 打包、跨域代理、打包预览工具…）
- :hamburger: 项目集成了 TypeScript写法，虽然还在学习中
- :apple: 使用 redux 做状态管理，集成 immer、react-redux 开发
- :green_apple: 使用 TypeScript 对 Axios 二次封装 （错误拦截、常用请求封装、全局请求 Loading、取消重复请求…）
- :strawberry: 支持 Antd 组件大小切换、暗黑 && 灰色 && 色弱模式、i18n 国际化的简单使用
- :lollipop: 使用 自定义高阶组件 进行路由权限拦截（403 页面）、页面按钮权限配置
- :cherries: 使用了 React-Router v6 路由懒加载配置、菜单手风琴模式、无限级菜单、多标签页、面包屑导航
- :grapes: 使用 Prettier 统一格式化代码，集成 Eslint、Stylelint 代码校验规范

### 四、安装使用步骤 :page_facing_up:

- **Clone：**

```shell{.line-numbers}
# GitHub
git clone https://github.com/MFanLiang/coffee-platform.git
```

- **Install：**

```shell{.line-numbers}
npm install
pnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```shell{.line-numbers}
npm run dev
npm run serve
```

- **Build：**

```shell{.line-numbers}
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```shell{.line-numbers}
# eslint 检测代码
npm run lint:eslint

# prettier 格式化代码
npm run lint:prettier

# stylelint 格式化样式
lint:stylelint
```

<!-- ### 五、项目截图

#### 1、登录页：

![hooks-login-light](https://i.imgtg.com/2023/04/18/ubMWb.png)

![hooks-login-dark](https://i.imgtg.com/2023/04/18/ubOyl.png)

#### 2、首页：

![hooks-home-light](https://i.imgtg.com/2023/04/18/ubasg.png)

![hooks-home-dark](https://i.imgtg.com/2023/04/18/ubqoB.png) -->

### 五、浏览器支持 :basketball:

- 本地开发推荐使用 Chrome 最新版浏览器 [Download](https://www.google.com/intl/zh-CN/chrome/)。
- 生产环境支持现代浏览器，不再支持 IE 浏览器，更多浏览器可以查看 [Can I Use Es Module](https://caniuse.com/?search=ESModule)。

| ![IE](https://i.imgtg.com/2023/04/11/8z7ot.png) | ![Edge](https://i.imgtg.com/2023/04/11/8zr3p.png) | ![Firefox](https://i.imgtg.com/2023/04/11/8zKiU.png) | ![Chrome](https://i.imgtg.com/2023/04/11/8zNrx.png) | ![Safari](https://i.imgtg.com/2023/04/11/8zeGj.png) |
| :---------------------------------------------: | :-----------------------------------------------: | :--------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------------: |
|                   not support                   |                  last 2 versions                  |                   last 2 versions                    |                   last 2 versions                   |                   last 2 versions                   |

### 六、项目后台接口 🧩

项目后台接口完全采用 nodejs 接口数据：

- Koa-server：https://github.com/MFanLiang/EspressoKoaServer
- Swagger UI：https://xiaomenglovecoffee.top/swagger-ui/

- **Clone：**

```shell{.line-numbers}
# GitHub
git clone https://github.com/MFanLiang/EspressoKoaServer.git
```

- **Install：**

```shell{.line-numbers}
npm install
pnpm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```
