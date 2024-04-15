import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from 'vite';
import viteCompression from "vite-plugin-compression";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { wrapperEnv } from "../src/utils/getEnv";

// * @see: https://vitejs.dev/config/
const baseConfig = (mode: any) => {
  /** 获取环境变量 env */
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return defineConfig({
    // * alias config
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, '../src'),
        },
        {
          find: 'assets',
          replacement: resolve(__dirname, '../src/assets'),
        },
      ],
      // 指定引入资源时省略的扩展名
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    // * 注册插件
    plugins: [
      react(),
      // * 使用 svg 图标
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "../src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      // * EsLint 报错信息显示在浏览器界面上（开发环境下生效，生产环境下失效）
      // 目前先把EsLint 语法检查注释关闭掉
      // viteEnv.VITE_USER_NODE_ENV === 'development' && eslintPlugin(),
      // * 是否生成包预览
      // @ts-ignore
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress 【gZip 压缩】
      viteEnv.VITE_BUILD_GZIP &&
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: viteEnv.VITE_COMPRESS as any,
        ext: ".gz"
      })
    ],

    // * 配置项目全局可用变量的样式
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "@/styles/var.less";`
        }
      }
    },
  });
};

export default baseConfig;
