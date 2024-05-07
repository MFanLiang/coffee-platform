import server from "@/api";
import { PORT1 } from "../config/servicePort";

/**
 * @name 查询系统所有字典数据
 */
const getAllDictRequest = () => {
  return server.get(`${PORT1}/getAllDict`, {}, {
    headers: {
      // * 控制当前请求不显示 loading
      noLoading: true,
    }
  })
};


export { getAllDictRequest };
