import React from "react";
import Taro, { Component } from '@tarojs/taro';
import {Text, View} from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {AtList, AtListItem, AtModal, AtToast} from "taro-ui";
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
    isModalOpen: false
  };

  componentDidMount = () => {

  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false
    })
  };

  handleModalCancel = () => {
    this.setState({
      isModalOpen: false
    })
  };

  handleModalConfirm = () => {
    Taro.clearStorage();
    Taro.reLaunch({
      url: '/pages/login/index'
    })
  };

  handleLogoutClick = () => {
    this.setState({
      isModalOpen: true
    })
  };

  render() {
    const { isModalOpen } = this.state;
    const { authority, num } = Taro.getStorageSync('USER_INFO') || {};
    return (
      <View className="user-page">
        <View className="user-page-banner">
          <View className='user-info-card'>
            <View className='left-container'>
              <Text className='left-title'>
                {
                  authority === 1 ? '学号' : authority === 2 ? '工号' : '管理员'
                }
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
            title='我的订单'
            thumb={orderIcon}
            onClick={() => Taro.navigateTo({
              url: '/pages/order/index'
            })}
            arrow='right'
          />
          <AtListItem
            title='我的信用分'
            thumb={pointIcon}
            onClick={() => {}}
            arrow='right'
          />
          <AtListItem
            title='更改密码'
            thumb={modifyIcon}
            onClick={() => Taro.navigateTo({
              url: '/pages/password/index'
            })}
            arrow='right'
          />
        </AtList>
        <AtModal
          isOpened={isModalOpen}
          title='登出确认'
          cancelText='取消'
          confirmText='确认'
          onClose={ this.handleModalClose }
          onCancel={ this.handleModalCancel }
          onConfirm={ this.handleModalConfirm }
          content='确定退出登陆吗？'
        />
      </View>
    )
  }
}
