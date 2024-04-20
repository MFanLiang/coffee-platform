import { mergeConfig } from 'vite';
import baseConfig from "./vite.config.base";
import { wrapperEnv } from "../src/utils/getEnv";
import { loadEnv } from 'vite';

// https://vitejs.dev/config/
const devConfiguration = (mode: any) => {
  /** 获取环境变量 env */
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return mergeConfig(
    {
      // 根据当前工作目录中的 'mode'配置选项 加载项目根目录下的 .env.devlopment 文件
      mode: 'development', // 当前项目工作模式为开发模式

      // 开发模式环境下的服务配置设置 -- [server config]
      server: {
        host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
        port: viteEnv.VITE_PORT,
        open: viteEnv.VITE_OPEN,
        cors: true,
        fs: {
          strict: true,
        },
        proxy: {
          '/api': {
            target: 'http://192.168.10.208:5050/', // 本地 windows 系统后端服务
            // target: 'http://116.63.42.17/api/', // 华为云服务器
            changeOrigin: true,
            rewrite: (path: any) => path.replace(/^\/api/, ''),
          }
        },

        // 预热文件已降低启动期间的初始页面加载时长
        // 预热的客户端文件：首页、views、components
        warmup: {
          clientFiles: ['../index.html', '../src/{views,components}/*'],
        },
      },
    },
    baseConfig(mode),
  );
};

export default devConfiguration;
