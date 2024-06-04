import React, { useState, useEffect, useRef } from 'react';
import { Space, Button, Table, Tag, message } from 'antd';
import * as Icons from "@ant-design/icons";
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { connect } from "react-redux";
import moment from "moment";
import { addNewMenu } from '@/api/modules/menu';
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import MenuAddModal from './components/menuAddModal';
import type { DataType, menuAddRefType, FieldType } from './types';
import style from './index.module.less';
import { getMenuList } from '@/api/modules/menu';

const UserSetting = (props: any) => {
  const { menuList } = props;
  const menuAddModalRef = useRef<menuAddRefType>(null);

  const columns: ColumnsType<DataType> = [
    {
      title: '路由名称',
      ellipsis: true,
      dataIndex: 'title',
      align: 'left',
      key: 'title',
      fixed: "left",
      width: 200,
    },
    {
      title: '路由地址',
      ellipsis: true,
      dataIndex: 'path',
      align: 'left',
      key: 'path',
      width: 200
    },
    {
      title: 'icon图标',
      dataIndex: 'icon',
      align: "center",
      width: 200,
      key: 'icon',
      render: (_text: string) => {
        return addIcon(_text);
      }
    },
    {
      title: '路由状态',
      dataIndex: 'status',
      align: "center",
      width: 180,
      key: 'status',
      render: (_text: boolean) => _text ? <Tag color="#0066FF">可用</Tag> : <Tag color="#FF0000">不可用</Tag>
    },
    {
      title: '路由父级id',
      dataIndex: 'parentMenuId',
      align: "center",
      ellipsis: true,
      width: 200,
      key: 'parentMenuId',
      render: (_text, record) => _text === null ? '-' : _text
    },
    {
      title: '排序列',
      dataIndex: 'sort',
      align: "center",
      width: 180,
      key: 'sort'
    },
    {
      title: '链接地址',
      dataIndex: 'isLink',
      ellipsis: true,
      align: 'left',
      width: 200,
      key: 'isLink',
      render: (_text, record) => _text === null ? '-' : <a href={_text} target='_blank'>{_text}</a>
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 200,
      render: (_text: string) => moment(_text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
      align: "center",
      render: (_text: string) => moment(_text).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      title: '操作',
      key: '',
      fixed: 'right',
      align: 'center',
      width: 260,
      render: (_, record) => (
        <Space size='middle'>
          <Button type='link' onClick={() => { alert("新增子级，等待开发中") }}>
            新增子级
          </Button>
          <Button type='link' onClick={() => { alert("编辑，等待开发中") }}>
            编辑
          </Button>
          <Button type='link' danger onClick={() => { alert("删除，等待开发中") }}>
            删除
          </Button>
        </Space>
      )
    }
  ];

  // 动态渲染 Icon 图标
  const customIcons: { [key: string]: any } = Icons;
  const addIcon = (name: string) => {
    return React.createElement(customIcons[name]);
  };

  const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>();

  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const getMenuData = async () => {
    setLoading(true);
    await getMenuList().then(({ data, message, total, pageSize }) => {
      if (!data) return;
      setPaginationConfig({
        defaultCurrent: 1,
        total: 50,
        size: "default",
        pageSize: pageSize || 0
      });
      setDataSource(data);
    }).finally(() => {
      setLoading(false);
    });
  };

  useEffect(() => {
    getMenuData();
  }, []);

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  // 当前点击的行
  const [currentRecord, setCurrentRecord] = useState<DataType | null>(null)

  /**
   * @name 弹出新增弹窗
   */
  const showMenuAddModal = (record: DataType | null) => {
    menuAddModalRef.current?.setAdd(true);
    menuAddModalRef.current?.setIsHasParentNode(false);
    menuAddModalRef.current?.setIsModalOpen();
    menuAddModalRef.current?.setForm({ status: true });
    setCurrentRecord(record);
  };

  /**
   * @name 弹出编辑弹框
   */
  // const showMenu

  /**
   * @name 添加新菜单
   */
  const addMenu = async (values: FieldType) => {
    if (!currentRecord) {
      // 新建父级菜单
      const bity: FieldType = {
        ...values,
        parentMenuId: null,
      };
      await addNewMenu(bity).then(res => {
        if (res.code === 200) {
          message.success(res.message)
        }
      });
    } else {
      // 新建子级菜单
      // currentRecord.children = currentRecord.children || []
      // currentRecord.children.push({
      //   parentId: currentRecord.id,
      //   children: null,
      //   name: null,
      //   level: currentRecord.level + 1,
      //   title: values.title,
      //   type: values.type
      // })
    }

    // setDataSource([...dataSource]);
    // setCurrentRecord(null);
  };

  /**
   * @name 编辑菜单项
   */
  const editMenu = () => { };

  return (
    <div className="card content-box">
      <Space align="center" className={style.topAction}>
        <Button
          size="middle"
          onClick={() => { alert("批量删除，后端接口暂未开发") }}
          shape="default"
          type="primary"
          icon={<DeleteOutlined />}
          disabled
          danger> 批量删除 </Button>
        <Button
          type="primary"
          shape="default"
          icon={<PlusOutlined />}
          size="middle"
          onClick={() => showMenuAddModal(null)}
        > 新建父级 </Button>
      </Space>
      <Table
        rowKey={record => record.id as string}
        bordered={true}
        scroll={{ y: 'calc(100vh - 355px)' }}
        style={{ height: '100%' }}
        columns={columns}
        loading={loading}
        indentSize={8}
        pagination={{ ...paginationConfig }}
        rowSelection={{ ...rowSelection }}
        dataSource={dataSource}
      />
      <MenuAddModal ref={menuAddModalRef} addMenu={addMenu} editMenu={editMenu} />
    </div>
  );
};

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps, null)(UserSetting);
