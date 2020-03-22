import Taro from '@tarojs/taro';
import { loginService } from '../pages/login/service';
import { USER_INFO } from '../utils/constants';

export default {
  namespace: 'global',
  state: {
    access_token: Taro.getStorageSync('access_token'),
    loginLoading: false,
    isLoginError: false,
    username: '',
    password: ''
  },

  effects: {
    *queryLogin({ payload }, { put, call }){
      try {
        yield put({
          type: 'loginLoadingEnd',
          payload: true
        });
        const res = yield call(loginService, payload);
        if (res.data) {
          //登陆验证成功
          Taro.setStorageSync(USER_INFO, res.data);
          Taro.switchTab({
            url: '/pages/home/index'
          })
        } else {
          let msg = '账号或密码错误！';
          if (Math.floor(res.statusCode/500) === 1) {
            msg = '服务器出错，请联系管理员'
          }
          // 显示出错标语
          Taro.atMessage({
            type: 'error',
            message: msg
          });
          yield put({
            type: 'isLoginErrorEnd',
            payload: true
          })
        }
      } catch (e) {
        Taro.atMessage({
          type: 'error',
          message: '系统错误！请联系管理员！'
        });
      } finally {
        yield put({
          type: 'loginLoadingEnd',
          payload: false
        });
      }
    }
  },

  reducers: {
    username(state, { username }) {
      return { ...state, username };
    },
    password(state, { password }) {
      return { ...state, password }
    },
    loginLoadingEnd(state, { payload }) {
      return { ...state, loginLoading: payload }
    },
    isLoginErrorEnd(state, { payload }) {
      return { ...state, isLoginError: payload }
    }
  },
};
