import { PORT1 } from "@/api/config/servicePort";
import server from '@/api';

/**
 * @name 用户退出登录系统
 */
const logout = () => { 
  return server.post<any>(`${PORT1}/user/logout`);
};

export default logout;
