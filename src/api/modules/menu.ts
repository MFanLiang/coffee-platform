import { PORT1 } from "@/api/config/servicePort";
import server from '@/api';
import { FieldType } from '@/views/systemConfig/menuSetting/types';

/**
* @name 获取菜单列表
*/
const getMenuList = () => {
  return server.get<any>(`${PORT1}/menu/list`, {}, { headers: { noLoading: true } });
};

/**
 * @name 新增菜单
 */
const addNewMenu = (params: FieldType) => {
  return server.post<any>(`${PORT1}/menu/create`, { ...params }, { headers: { noLoading: true } })
}

export {
  getMenuList,
  addNewMenu
};
