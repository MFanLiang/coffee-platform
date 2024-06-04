export type operateTypes = "add" | "edit" | "del";

export interface DataType {
  /** 数据唯一id */
  id: string;
  /** 数据序列 */
  ind: number;
  /** 用户名 */
  userName: string;
  /** 用户全名 */
  userFullName: string;
  /** 用户头像 */
  avatar: string;
  /** 用户角色 */
  userRole: number;
  /** 用户手机号码 */
  tel: string;
  /** 用户状态 */
  status: boolean;
  /** 创建时间 */
  createTime: string;
  /** 更新时间 */
  updateTime: string;
}
