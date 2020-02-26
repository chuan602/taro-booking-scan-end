import React from "react";
import Taro, { Component } from '@tarojs/taro';
import {View, Text, Image, ScrollView, Button} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  AtTabs, AtTabsPane
} from 'taro-ui';
import './index.less';
import Blank from "../../components/Blank";
import OrderItem from "../../components/OrderItem";

const tabList = [
  {
    title: '全部'
  },
  {
    title: '待出行'
  },
  {
    title: '已出行'
  },
  {
    title: '已退票'
  }
];

@connect(({ order }) => ({
  ...order,
}))
class Order extends Component {

  state = {
    tabCurrent: 0
  };

  config = {
    navigationBarTitleText: '我的订单',
  };

  componentDidMount = () => {
    this.queryAllOrderData();
  };

  queryAllOrderData = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/queryOrderList',
    });
  };

  handleTabClick = (current) => {
    this.setState({
      tabCurrent: current
    })
  };

  render() {
    const { tabCurrent } = this.state;
    const { allOrder } = this.props;
    console.log('allOrder', allOrder);
    const togoOrder = allOrder.filter(order => order.order_status === '0') || [];
    const expiredOrder = allOrder.filter(order => order.order_status === '1') || [];
    const returnedOrder = allOrder.filter(order => order.order_status === '2') || [];
    return (
      <View className="order">
        <AtTabs
          current={tabCurrent}
          tabList={tabList}
          onClick={this.handleTabClick}
        >
          <AtTabsPane className='order-tabPane' current={tabCurrent} index={0}>
            <View className='order-tabPane-container'>
              {
                allOrder.length ? allOrder.map(order => (
                  <OrderItem
                    statusCode={order.order_status}
                    departure={order.campus === '01' ? '海珠校区' : '白云校区'}
                    destination={order.campus === '01' ? '白云校区' : '海珠校区'}
                    orderTime={order.order_time}
                    departTime={`${order.depart_date}  ${order.depart_time}`}
                    departPlace={order.depart_place}
                    ticketNum={order.ticket_num}
                    carNum={order.car_num}
                  />
                )) : <Blank/>
              }
            </View>
          </AtTabsPane>
          <AtTabsPane className='order-tabPane' current={tabCurrent} index={1}>
            <View className='order-tabPane-container'>
              {
                togoOrder.length ? allOrder.map(order => (
                  <OrderItem
                    statusCode={order.order_status}
                    departure={order.campus === '01' ? '海珠校区' : '白云校区'}
                    destination={order.campus === '01' ? '白云校区' : '海珠校区'}
                    orderTime={order.order_time}
                    departTime={`${order.depart_date}  ${order.depart_time}`}
                    departPlace={order.depart_place}
                    ticketNum={order.ticket_num}
                    carNum={order.car_num}
                  />
                )) : <Blank/>
              }
            </View>
          </AtTabsPane>
          <AtTabsPane className='order-tabPane' current={tabCurrent} index={2}>
            <View className='order-tabPane-container'>
              {
                expiredOrder.length ? allOrder.map(order => (
                  <OrderItem
                    statusCode={order.order_status}
                    departure={order.campus === '01' ? '海珠校区' : '白云校区'}
                    destination={order.campus === '01' ? '白云校区' : '海珠校区'}
                    orderTime={order.order_time}
                    departTime={`${order.depart_date}  ${order.depart_time}`}
                    departPlace={order.depart_place}
                    ticketNum={order.ticket_num}
                    carNum={order.car_num}
                  />
                )) : <Blank/>
              }
            </View>
          </AtTabsPane>
          <AtTabsPane className='order-tabPane' current={tabCurrent} index={3}>
            <View className='order-tabPane-container'>
              {
                returnedOrder.length ? allOrder.map(order => (
                  <OrderItem
                    statusCode={order.order_status}
                    departure={order.campus === '01' ? '海珠校区' : '白云校区'}
                    destination={order.campus === '01' ? '白云校区' : '海珠校区'}
                    orderTime={order.order_time}
                    departTime={`${order.depart_date}  ${order.depart_time}`}
                    departPlace={order.depart_place}
                    ticketNum={order.ticket_num}
                    carNum={order.car_num}
                  />
                )) : <Blank/>
              }
            </View>
          </AtTabsPane>
        </AtTabs>
      </View>
    );
  }
}

export default Order;
