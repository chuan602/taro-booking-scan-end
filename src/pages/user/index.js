import React from "react";
import Taro, { Component } from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {AtList, AtListItem} from "taro-ui";
import { USER_INFO } from '../../utils/constants';
import modifyIcon from '../../images/user/modify-password.png';
import './index.less';

@connect(({user}) => ({
  ...user,
}))
export default class User extends Component {
  config = {
    navigationBarTitleText: '我的',
  };

  handleModalConfirm = () => {
    Taro.clearStorage();
    Taro.reLaunch({
      url: '/pages/login/index'
    })
  };

  handleLogoutClick = () => {
    Taro.showModal({
      title: '登出确认',
      content: '确定退出登陆吗'
    })
      .then(({confirm}) => {
        confirm && this.handleModalConfirm();
      });
  };

  render() {
    const { num } = Taro.getStorageSync('USER_INFO') || {};
    return (
      <View className="user-page">
        <View className="user-page-banner">
          <View className='user-info-card'>
            <View className='left-container'>
              <Text className='left-title'>
                乘务员
              </Text>
              <Text className='left-value'>{ num }</Text>
            </View>
            <Text
              className='logout'
              onClick={this.handleLogoutClick}
            >
              退出登陆
            </Text>
          </View>
        </View>
        <AtList>
          <AtListItem
            title='更改密码'
            thumb={modifyIcon}
            onClick={() => Taro.navigateTo({
              url: '/pages/password/index'
            })}
            arrow='right'
          />
        </AtList>
      </View>
    )
  }
}
