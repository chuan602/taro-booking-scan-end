import React from "react";
import Taro, {Component} from '@tarojs/taro';
import {View, Text} from '@tarojs/components';
import {connect} from '@tarojs/redux';
import './index.less';
import {AtButton, AtForm, AtInput, AtMessage} from "taro-ui";

@connect(({password}) => ({
  ...password,
}))
class Password extends Component {

  state = {
    originPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  config = {
    navigationBarTitleText: '更改密码',
  };

  handleOriginPasswordChange = (val) => {
    this.setState({
      originPassword: val
    })
  };

  handleNewPasswordChange = (val) => {
    this.setState({
      newPassword: val
    })
  };

  handleConfirmPasswordChange = (val) => {
    this.setState({
      confirmPassword: val
    })
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { originPassword, newPassword, confirmPassword } = this.state;
    if (originPassword === newPassword) {
      Taro.atMessage({
        message: '原密码与新密码不能相同',
        type: 'error',
        duration: 2000
      });
      return;
    }
    if (confirmPassword !== newPassword) {
      Taro.atMessage({
        message: '确认密码与新密码需要相同',
        type: 'error',
        duration: 2000
      });
      return;
    }
    Taro.showModal({
      title: '修改密码确认',
      content: '您确定修改密码吗？'
    })
      .then(({confirm}) => {
        confirm && dispatch({
          type: 'password/queryPasswordModify',
          originPassword,
          newPassword
        });
      });
  };

  render() {
    const { originPassword, newPassword, confirmPassword } = this.state;
    const { dispatch, isModifyError } = this.props;
    return (
      <View className="password">
        <AtForm>
          <AtInput
            clear
            autoFocus
            className='origin-password'
            title='原密码'
            name='originPassword'
            placeholder='请输入原密码'
            type='password'
            maxLength={16}
            value={ originPassword }
            error={ isModifyError }
            onChange={ this.handleOriginPasswordChange }
            onFocus={ () => dispatch({
              type: 'password/isModifyErrorEnd',
              payload: false
            }) }
          />
          <AtInput
            clear
            className='new-password'
            name='newPassword'
            placeholder='请输入新密码'
            title='新密码'
            type='password'
            maxLength={16}
            value={ newPassword }
            error={ isModifyError }
            onChange={ this.handleNewPasswordChange }
            onFocus={ () => dispatch({
              type: 'password/isModifyErrorEnd',
              payload: false
            }) }
          />
          <AtInput
            clear
            className='confirm-password'
            name='confirmPassword'
            placeholder='请再次输入新密码'
            title='确认新密码'
            type='password'
            maxLength={16}
            value={ confirmPassword }
            error={ isModifyError }
            onChange={ this.handleConfirmPasswordChange }
            onFocus={ () => dispatch({
              type: 'password/isModifyErrorEnd',
              payload: false
            }) }
          />
          <AtButton
            type='primary'
            className='modify-btn'
            onClick={this.handleSubmit}
          >
            确认更改
          </AtButton>
        </AtForm>
        <AtMessage />
      </View>
    );
  }
}

export default Password;
