import { PORT1 } from "@/api/config/servicePort";
import server from '@/api';

/**
 * @name 获取所有用户的基本信息
 * @returns Promise
 */
const getAllUserInfo = () => {
  return server.get(`${PORT1}/user/user-all-info`, {}, { headers: { noLoading: true } })
};

/**
 * @name 更新指定用户的信息
 * @returns Promise
 */
const updateUserInfo = (params: any) => {
  return server.put(`${PORT1}/user`, { ...params }, { headers: { noLoading: true } })
};

/**
 * @name 模糊搜索某个用户
 * @returns Promise
 */
const searchFuzzyquery = (search: string) => { 
  return server.post(`${PORT1}/user/fuzzyquery`, { search }, { headers: { noLoading: false } })
};

export {
  getAllUserInfo,
  updateUserInfo,
  searchFuzzyquery
};
