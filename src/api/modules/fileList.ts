import server from "@/api";
import { PORT1 } from "@/api/config/servicePort";
import { AxiosProgressEvent } from 'axios';

interface responseType {
  /** 自定义的状态码 */
  code: number;
  results: any;
  imgUrl?: string[];
  len?: number;
  total?: number;
  msg?: string;
}

/** 获取 koa 服务后台所有图片文件 */
const getKoaServerPicFile = () => {
  return server.get(`${PORT1}/readimgsurl`)
};

/** 上传单图片文件 */
const simgleFileUpload = (formDataFile: FormData, uploadProgressCallback: (progressEvent: AxiosProgressEvent) => void) => {
  return server.service<any, responseType>({
    url: `${PORT1}/upload/simgle`,
    method: 'POST',
    // url传参方法
    // params: { },
    // body 内传参方法
    data: formDataFile,
    // 响应的数据格式
    // responseType: 'stream',
    // transformResponse: [function (data) {
    //   console.log('请求后的数据处理 data', data)
    //   return data;
    // }],
    // 监听上传进度
    onUploadProgress(progressEvent) {
      uploadProgressCallback(progressEvent);
    },
    // 监听下载进度
    // onDownloadProgress(progressEvent) { },
  })
};

export {
  simgleFileUpload,
  getKoaServerPicFile
};
