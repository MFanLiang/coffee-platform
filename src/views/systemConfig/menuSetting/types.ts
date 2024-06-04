export interface DataType {
  /** 数据唯一id */
  id?: string;
  /** 路由名称 */
  title?: string
  /** 路由地址 */
  path?: string;
  /** icon图标 */
  icon: string;
  /** 路由状态 */
  status: boolean;
  /** 路由父级id */
  parentMenuId: string | null;
  /** 排序列 */
  sort: number;
  /** 链接地址 */
  isLink?: string | null;
  /** 创建时间 */
  createTime?: string;
  /** 更新时间 */
  updateTime?: string;
  children?: DataType[];
}

export interface IMenuAddModalProps {
  addMenu: ({ }: FieldType) => void;
  editMenu: ({ }: FieldType) => void;
}

export type FieldType = {
  /** 路由名称 */
  name: string;
  /** 路由路径地址 */
  alias: string;
  /** 路由图标 */
  icon: string;
  /** 菜单排序序列 */
  sort: number;
  /** 路由状态 */
  status: boolean;
  /** 路由的父级分类的id，若为父级菜单则为null */
  parentMenuId: string | null;
}

export interface menuAddRefType {
  setIsHasParentNode: (flag: boolean) => void;
  setAdd: (value: boolean) => void;
  setForm: ({ }: Partial<FieldType>) => void;
  setIsModalOpen: () => void;
}
