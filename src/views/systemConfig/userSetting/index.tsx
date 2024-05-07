import { useEffect, useState, useRef } from "react";
import { Table, Button, Input, Tag, Space, Image, message } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { getAllUserInfo, searchFuzzyquery } from '@/api/modules/user';
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import UserSettingModal from "./components/userSettingModal";
import { Login } from "@/api/interface";
import classNames from "classnames";
import type { operateTypes } from './types';
import style from './index.module.less';

const UserSetting = (props: any) => {
  const { sysDictGroup, userInfo } = props;
  const { t } = useTranslation();
  const userSettingModalRef = useRef<any>(null);
  const [userStrValue, setUserStrValue] = useState<string>('');

  const handleAdd = (operateType: operateTypes) => {
    if (userSettingModalRef.current) {
      userSettingModalRef.current.openModal(operateType);
    }
  };

  const handleEdit = (operateType: operateTypes, rowData: Login.userInfoType) => {
    if (userSettingModalRef.current) {
      userSettingModalRef.current.openModal(operateType, rowData);
    }
  };

  const handleDel = (operateType: operateTypes, rowData: Login.userInfoType) => { };

  const ruleEnum: any = {
    0: {
      value: 0,
      label: '超级管理员',
      eleReactNode: <Tag color="#5bf11b"> 超级管理员 </Tag>,
      disabled: false,
    },
    1: {
      value: 1,
      label: '系统管理员',
      eleReactNode: <Tag color="magenta"> 系统管理员 </Tag>,
      disabled: false,
    },
    2: {
      value: 2,
      label: '普通用户',
      eleReactNode: <Tag color=""> 普通用户 </Tag>,
      disabled: false,
    },
    3: {
      value: 3,
      label: '运营用户',
      eleReactNode: <Tag color="orange"> 运营用户 </Tag>,
      disabled: false,
    },
    4: {
      value: 4,
      label: '访客用户',
      eleReactNode: <Tag color="gold"> 访客用户 </Tag>,
      disabled: false,
    },
    5: {
      value: 5,
      label: '临时用户',
      eleReactNode: <Tag color="lime"> 临时用户 </Tag>,
      disabled: false,
    },
  };

  const columns: any[] = [
    {
      title: "序列",
      dataIndex: "ind",
      key: "ind",
      align: "center",
      width: 65,
      fixed: 'left',
      render: (_text: any, record: any, _index: number) => _index + 1,
    },
    {
      title: "姓名",
      dataIndex: "userName",
      key: "userName",
      width: 200,
      align: "center"
    },
    {
      title: "全名称",
      dataIndex: "userFullName",
      key: "userFullName",
      align: "center",
      width: 200,
      ellipsis: true,
    },
    {
      title: "头像",
      dataIndex: "avatar",
      key: "avatar",
      width: 160,
      align: "center",
      render: (_text: string, _record: any, _index: number) => {
        return <Image
          width={55}
          src={_text}
          fallback="data:image/png;base64,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"
        />;
      }
    },
    {
      title: "用户角色",
      dataIndex: "userRole",
      key: "userRole",
      width: 120,
      align: "center",
      render: (_text: number) => {
        return ruleEnum[_text]?.label
      }
    },
    {
      title: "手机号码",
      dataIndex: "tel",
      key: "tel",
      width: 200,
      align: "center",
    },
    {
      title: "账号状态",
      dataIndex: "status",
      key: "status",
      width: 120,
      align: "center",
      render: (_text: boolean) => {
        return _text ? <Tag color="#0066FF">激活</Tag> : <Tag color="#FF0000">注销</Tag>
      }
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
      align: "center",
      width: 200,
      render: (_text: string) => {
        return moment(_text).format("YYYY年MM月DD日 HH:mm:ss")
      }
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
      width: 200,
      align: "center",
      render: (_text: string) => {
        return moment(_text).format("YYYY年MM月DD日 HH:mm:ss")
      }
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      fixed: 'right',
      align: "center",
      render: (_: any, record: any) => {
        return (
          <Space size="middle">
            <a> <Button type="link" disabled={false} onClick={() => handleEdit("edit", record)}> 编辑 </Button> </a>
            <a> <Button type="link" disabled={record.userRole === 0} onClick={() => handleDel("del", record)}> 删除 </Button> </a>
          </Space>
        )
      },
    },
  ];

  const [paginationConfig, setPaginationConfig] = useState<{
    total: number;
    pageSize: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>();
  /**
   * @name 读取所有用户列表信息
   */
  const requestUserListInfo = async () => {
    setLoading(true);
    await getAllUserInfo().then(({ data, message, total, pageSize }) => {
      setPaginationConfig({
        total: total || 0,
        pageSize: pageSize || 0
      });
      setDataSource(data);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    })
  };

  /**
   * @name 重置搜索框
   */
  const handleUserStrReset = () => {
    setUserStrValue("");
    handleUserStrPressEnter("");
  };

  /**
   * @name 处理检索框敲入回车能力
   */
  const handleUserStrPressEnter = async (strVal: string) => {
    await searchFuzzyquery(strVal).then(res => {
      const { code, data, message: messageStr, total, pageSize } = res;
      if (code === 200) {
        setPaginationConfig({
          total: total || 0,
          pageSize: pageSize || 0
        });
        setDataSource(data);
        message.success(messageStr);
      }
    })
  };

  useEffect(() => {
    requestUserListInfo();
  }, []);

  return (
    <div className="card content-box">
      <Input.Group compact>
        <Input
          className={classNames(style.userInputSearch)}
          prefix={<span className={classNames('iconfont icon-search-people', style.prefixIcon)} />}
          placeholder={t("placeholder.inputSearch")}
          value={userStrValue}
          size="large"
          allowClear
          disabled={false}
          onChange={(e) => setUserStrValue(e.target.value)}
          onPressEnter={() => handleUserStrPressEnter(userStrValue)}
        />
        <Button
          className={classNames(style.searchBtn)}
          onClick={() => handleUserStrPressEnter(userStrValue)}
          type="primary"
          size="large"
        >
          <SearchOutlined />
        </Button>
        <Button className={classNames(style.resetBtn)} onClick={handleUserStrReset} type="primary" size="large">
          <span className={classNames("iconfont icon-Reset", style.resetIcon)} />
        </Button>
      </Input.Group>

      <div className={style.operaterBtn}>
        <Button
          type="primary"
          onClick={() => handleAdd("add")}
          shape="default"
          icon={<PlusOutlined />}
          size="middle"
        >
          新增
        </Button>
      </div>

      <Table
        rowKey={(data) => data.id}
        bordered={true}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        style={{ height: '100%', marginTop: '10px' }}
        pagination={{ ...paginationConfig }}
        scroll={{ y: 'calc(100vh - 355px)' }}
      />

      <UserSettingModal
        ref={userSettingModalRef}
        userRoleType={sysDictGroup.userRoleType}
        userInfo={userInfo}
        requestUserListInfo={requestUserListInfo}
      />
    </div>
  );
};

const mapStateToProps = (state: any) => state.global;
export default connect(mapStateToProps, null)(UserSetting);
