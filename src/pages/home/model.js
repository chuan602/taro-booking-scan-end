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
  },
  effects: {
    *queryCarListByDate({payload}, { put, call }){
      const res = yield call(queryCarListByDateService, payload);
      yield put({
        type: 'queryCarListEnd',
        payload: res.data || []
      })
    },
    *queryBookingTicket({carId, num, userId}, { put, call }){
      const res = yield call(queryBookingTicketService, carId, num, userId);
      console.log('orderId', res);
    }
  },
  reducers: {
    queryCarListEnd(state, { payload }){
      const h_ticket = payload.filter(item => item.campus === '01');
      const b_ticket = payload.filter(item => item.campus === '02');
      return { ...state, carList: payload, h_ticket, b_ticket};
    }
  },
};
