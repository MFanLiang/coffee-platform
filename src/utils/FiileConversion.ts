// 文件转换工具方法
// 常见的文件类型有：Blob, File, Base64, ArrayBuffer

/**
 * base64格式文件 => blob格式文件
 * @param dataURI base64格式文件
 * @returns blob
 */
const dataURItoBlob = (dataURI: string) => {
  var byteString = atob(dataURI.split(',')[1]);
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

/** 
 * file格式文件 => base64格式文件
 * @param file file格式的文件
 * @returns base64File
 */
const fileToBase64 = (file: File) => {
  let reads = new FileReader();
  reads.readAsDataURL(file);
  reads.onload = function (evt) {
    if (evt.target) {
      return evt.target.result;
    }
  };
  // 1、FileReader.onabort：该事件是中止读取的时候触发。
  // 2、FileReader.onerror：该事件是读取发生错误的时候触发。
  // 3、FileReader.onload：该事件是读取完成的时候触发。
  // 4、FileReader.onloadstart：该事件是读取操作刚开始的时候触发。
  // 5、FileReader.onloadend：该事件是读取结束的时候触发（失败和成功的时候都会触发）。
  // 6、FileReader.onprogress：该事件在读取的时候触发。
};

/** 
 * file格式文件 => blob格式文件
 * @param file file格式的文件
 * @returns blob
 */
const fileToBlob = (file: Blob) => {
  let blob = new Blob([file], { type: file.type });
  let blobUrl = URL.createObjectURL(blob);
  // https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL_static
  // URL.revokeObjectURL(blobUrl);
  return blobUrl;
}

export { dataURItoBlob, fileToBase64, fileToBlob };
