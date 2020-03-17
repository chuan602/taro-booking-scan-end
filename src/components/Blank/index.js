import Taro, { Component } from '@tarojs/taro';
import {Image, Text, View} from "@tarojs/components";
import 'taro-ui/dist/style/index.scss';
import './index.less';

import orderIcon from '../../images/icon/order.png';

export default class Blank extends Component{
  render() {
    const {
      content='暂无订单',
      icon=orderIcon
    } = this.props;
    return (
      <View
        className='container'
      >
        <Image
          className='img'
          src={icon}
        />
        <Text className='content'>{content}</Text>
      </View>
    )
  }
}
