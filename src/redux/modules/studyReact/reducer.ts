import { AnyAction } from 'redux';
import { StudyReactState } from '@/redux/interface';
import { produce } from 'immer';
import * as types from "@/redux/mutation-types";

const studyReact: StudyReactState = {
  tabsActiveKey: '',
  picUploadType: 'picSingle',
}

// 定义reducer
const study = (state: StudyReactState = studyReact, action: AnyAction) => {
  return produce(state, draftState => {
    switch (action.type) {
      case types.SET_TABS_ACTIVE_KEY:
        draftState.tabsActiveKey = action.tabsActiveKey;
        break;
      case types.SET_PIC_UPLOAD_TYPE:
        draftState.picUploadType = action.picUploadType;
        break;
      default:
        return draftState;
    }
  })
};

export default study;
