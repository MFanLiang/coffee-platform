import server from "@/api";
import { PORT1 } from "@/api/config/servicePort";
import { AxiosProgressEvent } from 'axios';
import { ResultData } from "../interface";

/** 获取 koa 服务后台所有图片文件 */
const getKoaServerPicFile = () => {
  // return server.get(`${PORT1}/readimgsurl`)
  return server.service<any, ResultData>({
    url: `${PORT1}/readimgsurl`,
    method: "get",
    responseEncoding: "utf-8",
    responseType: "blob",
  })
};

/** 上传单图片文件 */
const singlePicUpload = (formDataFile: FormData, uploadProgressCallback: (progressEvent: AxiosProgressEvent) => void) => {
  return server.service<any, ResultData>({
    url: `${PORT1}/upload/singlePic`,
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

/**
 * @name 上传单个文件
 */
const singleFileUpload = (formDataFile: FormData, uploadProgressCallback: (progressEvent: AxiosProgressEvent) => void) => {
  return server.service<any, ResultData>({
    url: `${PORT1}/upload/singleFile`,
    method: 'POST',
    data: formDataFile,
    onUploadProgress(progressEvent) {
      uploadProgressCallback(progressEvent);
    },
  });
};

/**
 * @name 获取所有文件
 */
const getAllfilesList = () => {
  return server.get(`${PORT1}/allFilesList`, {}, { headers: { noLoading: true } });
};

/**
 * @name 查看文件
 */
const viewFileById = (id: string) => {
  return server.get(
    `${PORT1}/readFile`,
    { id },
    { headers: { noLoading: true }, responseType: "blob" });
};

export {
  singlePicUpload,
  singleFileUpload,
  getKoaServerPicFile,
  getAllfilesList,
  viewFileById
};
