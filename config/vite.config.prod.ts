import { mergeConfig } from 'vite';
import baseConfig from "./vite.config.base";
import { wrapperEnv } from "../src/utils/getEnv";
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
const prodConfiguration = (mode: any) => {
  /** 获取环境变量 env */
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return mergeConfig(
    {
      // 根据当前工作目录中的 'mode'配置选项 加载项目根目录下的 .env.production 文件
      mode: 'production', // 当前项目工作模式为生产模式
      esbuild: {
        pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
      },
      // * build configure
      build: {
        // 浏览器兼容目标
        target: 'es2015',
        // 指定生成静态资源的存放路径
        asssetsDir: 'dist',
        // 构建后将会生成 .vite/manifest.json 文件，可为一些服务器框架渲染时提供正确的资源引入链接
        manifest: true,
        // esbuild 打包更快，但是不能去除 console.log；去除 console 使用 terser 模式(当设置为 'terser' 时须先安装 Terser [npm install terser --save-dev])
        minify: "esbuild",
        // minify: "terser",
        // terserOptions: {
        // 	compress: {
        // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
        // 		drop_debugger: true
        // 	}
        // },

        // 资源分包配置
        // 目前的分包配置有问题，所以暂时注释掉，等待找到问题的解决方案后处理优化，详情可以看 "../CHANGELOG.md" 文档中的第一条问题
        // rollupOptions: {
        //   input: {
        //     index: resolve(__dirname, '../index.html')
        //   },
        //   output: {
        //     entryFileNames: "assets/js/[name]-[hash].js",
        //     chunkFileNames: "assets/js/[name]-[hash].js",
        //     assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        //     compact: true,
        //   }
        // },

        // chunk 大小警告的限制
        chunkSizeWarningLimit: 2000,
      },
    },
    baseConfig(mode),
  );
};

export default prodConfiguration;
