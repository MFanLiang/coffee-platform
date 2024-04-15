import * as types from '@/redux/mutation-types';

/** 设置 tabsActiveKey */
export const setActvieKey = (tabsActiveKey: string) => ({
  type: types.SET_TABS_ACTIVE_KEY,
  tabsActiveKey
});

/** 设置 picUploadType */
export const setPicUploadType = (picUploadType: 'single' | 'multiple') => ({
  type: types.SET_PIC_UPLOAD_TYPE,
  picUploadType
});
