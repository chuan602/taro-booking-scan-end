import React from "react";
import Taro, { Component } from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {AtList, AtListItem, AtToast} from "taro-ui";
import { USER_INFO } from '../../utils/constants';
import orderIcon from '../../images/user/order.png';
import pointIcon from '../../images/user/point.png';
import modifyIcon from '../../images/user/modify-password.png';
import './index.less';

@connect(({user}) => ({
  ...user,
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  state = {
    isToastOpen: false
  };

  componentDidMount = () => {

  };

  render() {
    const { isToastOpen } = this.state;
    const { username } = Taro.getStorageSync('USER_INFO') || {};
    if (!username){

    }
    return (
      <View className="user-page">
        <View className="user-page-banner">
          <Text onClick={() => this.setState({ isToastOpen: true })}>{username}</Text>
        </View>
        <AtList>
          <AtListItem
            title='我的订单'
            thumb={orderIcon}
            onClick={() => {}}
            arrow='right'
          />
          <AtListItem
            title='我的信用分'
            thumb={pointIcon}
            onClick={() => {}}
            arrow='right'
          />
          <AtListItem
            title='修改密码'
            thumb={modifyIcon}
            onClick={() => {}}
            arrow='right'
          />
        </AtList>


        {/* Toast提醒框 */}
        <AtToast isOpened={isToastOpen} text="你还没登陆，请先登陆再操作" status="error" onClose={() => {}}></AtToast>
      </View>
    )
  }
}
