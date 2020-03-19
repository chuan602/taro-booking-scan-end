import Taro from '@tarojs/taro';
import {
  queryBookingTicketService,
  queryCarListByDateService
} from './service';

export default {
  namespace: 'home',
  state: {
    carList: [],
    h_ticket: [],
    b_ticket: [],
    tmp_orderId: '',
    isShowQr: false
  },
  effects: {
    *queryCarListByDate({payload}, { put, call }){
      try {
        const res = yield call(queryCarListByDateService, payload);
        yield put({
          type: 'queryCarListEnd',
          payload: res.data || []
        })
      } finally {
        Taro.hideLoading();
        Taro.stopPullDownRefresh();
      }
    },
    *queryBookingTicket({carId, num, userId}, { put, call }){
      Taro.showLoading({
        title: '',
        mask: true
      });
      const res = yield call(queryBookingTicketService, carId, num, userId);
      Taro.hideLoading();
      if (res.data) {
        yield put({
          type: 'queryBookingTicketEnd',
          payload: res.data
        });
        yield put({
          type: 'isShowQrEnd',
          payload: true
        })
      } else {
        Taro.showModal({
          title: '订票失败',
          content: '抱歉，您已订此班车票，不能重复订票',
          showCancel: false
        });
      }
    }
  },
  reducers: {
    queryCarListEnd(state, { payload }){
      const h_ticket = payload.filter(item => item.campus === '01');
      const b_ticket = payload.filter(item => item.campus === '02');
      return { ...state, carList: payload, h_ticket, b_ticket};
    },
    queryBookingTicketEnd(state, { payload, clear }){
      return {
        ...state,
        tmp_orderId: clear ? '' : payload
      }
    },
    isShowQrEnd(state, { payload }){
      return {
        ...state,
        isShowQr: payload
      }
    }
  },
};
