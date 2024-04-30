import { PORT1 } from "@/api/config/servicePort";
import server from '@/api';

const getAllUserInfo = () => {
  return server.get(`${PORT1}/user/user-all-info`, {}, { headers: { noLoading: true } })
};

export {
  getAllUserInfo
};
