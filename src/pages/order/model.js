import Taro from '@tarojs/taro';
import { queryOrderListService, queryOrderReturnService } from './service';
import { USER_INFO } from '../../utils/constants';

export default {
  namespace: 'order',
  state: {
    allOrder: []
  },
  effects: {
    *queryOrderList({ payload }, { put, call }){
      const auth = Taro.getStorageSync(USER_INFO);
      const { id } = auth;
      const res = yield call(queryOrderListService, id);
      yield put({
        type: 'queryOrderListEnd',
        payload: res.data || []
      })
    },
    *queryOrderReturn({ payload }, { put, call }){
      const res = yield call(queryOrderReturnService, payload);
      console.log('res', res);
      yield put({
        type: 'queryOrderList'
      });
    }
  },
  reducers: {
    queryOrderListEnd(state, { payload }){
      return {
        ...state,
        allOrder: payload
      }
    }
  },
};
