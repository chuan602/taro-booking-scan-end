import Taro from '@tarojs/taro';
import dayjs from "dayjs";
import {
  queryBookingTicketService,
  queryCarListByDateService
} from './service';
const pickerDataColumn1 = [
  {
    id: 0,
    name: '海珠校区'
  },
  {
    id: 1,
    name: '白云校区'
  }
];

export default {
  namespace: 'home',
  state: {
    ticketList: [],
    h_ticket: [],
    b_ticket: [],
    pickerSourceData: [],
    pickerValue: [0, 0]
  },
  effects: {
    *queryTicketListByDate({}, { put, call }){
      try {
        Taro.showLoading({
          title: 'loading',
          mask: true
        });
        const date = dayjs().format('YYYY-MM-DD');
        const res = yield call(queryCarListByDateService, date);
        yield put({
          type: 'queryTicketListEnd',
          payload: res.data || []
        })
      } finally {
        Taro.hideLoading();
        Taro.stopPullDownRefresh();
      }
    }
  },
  reducers: {
    queryTicketListEnd(state, { payload }){
      const h_ticket = payload.filter(item => item.campus === '01').map((item => {
        return {
          id: item.id,
          name: `${item.depart_time} | ${item.car_num}`
        }
      }));
      const b_ticket = payload.filter(item => item.campus === '02').map((item => {
        return {
          id: item.id,
          name: `${item.depart_time} | ${item.car_num}`
        }
      }));
      if (!h_ticket.length) h_ticket[0] = {name: '暂无班车信息'};
      return { ...state, ticketList: payload, h_ticket, b_ticket, pickerSourceData: [pickerDataColumn1, h_ticket]};
    },
    columnOneChangeEnd(state, { payload }){
      const { h_ticket, b_ticket } = state;
      const columnTwoData = payload === 0 ? h_ticket : b_ticket;
      return {
        ...state,
        pickerValue: [0, 0],
        pickerSourceData: [pickerDataColumn1, columnTwoData.length ? columnTwoData : [{name: '暂无班车信息'}]]
      }
    },
    columnTwoChangeEnd(state, { payload }){
      const { pickerValue } = state;
      return {
        ...state,
        pickerValue: [pickerValue[0], payload]
      }
    },
    pickerValueEnd(state, { payload }){
      return {
        ...state,
        pickerValue: payload
      }
    }
  },
};
