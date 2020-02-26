import Taro, { Component } from '@tarojs/taro';
import {Text, View} from "@tarojs/components";
import 'taro-ui/dist/style/index.scss';
import './index.less';

const disabledStyle = {
  color: '#999'
};

export default class ListItem extends Component{
  render() {
    const {
      key,
      departTime,
      restTicket,
      departure,
      carNum,
      disabled,
      onClick=()=>{}
    } = this.props;
    return (
      <View
        className='ticket-list-item'
        style={disabled ? disabledStyle : {}}
        key={key}
        onClick={disabled ? () => null : onClick}
      >
        <View className='item-main at-row'>
          <View className='main-left at-col'>
            <Text className='departure-time-title'>发车时间</Text>
            <Text
              className='departure-time'
              style={disabled ? {fontSize: '24PX', color: '#ccc'} : {}}
            >
              { departTime }
            </Text>
          </View>
          <View className='main-right at-col'>
            <Text className='rest-ticket-title'>余票</Text>
            <Text
              className='rest-ticket'
              style={disabled ? {fontSize: '24PX', color: '#ccc'} : {}}
            >
              { restTicket === 0 ? '空' : restTicket }
            </Text>
          </View>
        </View>
        <View className='item-footer at-row at-row__justify--between'>
          <Text>{ departure }</Text>
          <Text>{ carNum }</Text>
        </View>
      </View>
    )
  }
}

