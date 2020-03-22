import Taro from '@tarojs/taro';
import dayjs from "dayjs";
import {
  queryScanService,
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
    pickerValue: [0, 0],
    passengerMsg: {}
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
    },
    *queryScan({ orderId, carId }, { put, call }){
      try {
        const res = yield call(queryScanService, orderId, carId);
        if (res.statusCode === 500) {
          Taro.atMessage({
            type: 'error',
            message: '服务器出错，请联系管理员'
          });
          return;
        }
        if(!res.data){
          Taro.showModal({
            title: '警告',
            content: '该二维码凭证与当前班车信息不符，请注意查看票务班车信息',
            showCancel: false
          })
        } else {
          // 扫码乘车成功
          const { authority, num, ticket_num } = res.data;
          const jobName = authority === 1 ? '学生' : authority === 2 ? '教师' : '管理员';
          const numName = authority === 1 ? '学号' : '工号';
          Taro.showModal({
            title: '乘车成功',
            content: `职称： ${jobName}\n ${numName}： ${num}\n 票数： ${ticket_num}`,
            showCancel: false
          })
        }
      } finally {

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
