import Taro from '@tarojs/taro';
import { queryPasswordModifyService } from './service';
import { USER_INFO } from '../../utils/constants';

export default {
  namespace: 'password',
  state: {
    isModifyError: false,
  },
  effects: {
    *queryPasswordModify({ originPassword, newPassword }, { put, call }){
      const { id } = Taro.getStorageSync(USER_INFO);
      const res = yield call(queryPasswordModifyService, id, originPassword, newPassword);
      if (res.statusCode === 500) {
        Taro.atMessage({
          type: 'error',
          message: '服务器错误，请联系管理员'
        });
      } else if (!res.data) {
        Taro.atMessage({
          type: 'error',
          message: '原密码错误，请重新输入'
        });
        yield put({
          type: 'isModifyErrorEnd',
          payload: true
        });
      } else {
        // 修改成功
        Taro.showToast({
          title: '修改成功',
          icon: 'success'
        });
        // 重新登陆
        Taro.clearStorage();
        Taro.reLaunch({
          url: '/pages/login/index'
        });
      }
    }
  },
  reducers: {
    isModifyErrorEnd(state, { payload }){
      return { ...state, isModifyError: payload }
    }
  },
};
