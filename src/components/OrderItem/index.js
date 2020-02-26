import Taro, { Component } from '@tarojs/taro';
import {Text, View, Button} from "@tarojs/components";
import 'taro-ui/dist/style/index.scss';
import './index.less';

import iconTogo from '../../images/order/order_togo.png';
import iconHaveWent from '../../images/order/order_already.png';
import iconReturn from '../../images/order/order_return.png';

export default class OrderItem extends Component{
  processStatusCode = (togo, haveWent, haveReturn) => {
    const { statusCode } = this.props;
    return statusCode === 0 ? togo : statusCode === 1 ? haveWent : haveReturn
  };

  render() {
    const {
      departure,
      destination,
      orderTime,
      departTime,
      departPlace,
      ticketNum,
      carNum,
      statusCode
    } = this.props;
    const btnGroup = (
      <View className='btn-group-container'>
        <Button
          className='btn btn-show-qr'
          size='mini'
        >
          查看二维码
        </Button>
        <Button
            className='btn btn-return-ticket'
          size='mini'
        >
          退票
        </Button>
      </View>
    );
    return (
      <View
        className='order-container'
      >
        <View className='title-container'>
          <View className='title-left'>
            <Image
              src={
                this.processStatusCode(iconTogo, iconHaveWent, iconReturn)
              }
              className='title-icon'
            />
            <Text>
              {departure}
              <Text style={{ color: '#ccc', padding: '0 10px' }}>至</Text>
              {destination}
            </Text>
          </View>
          <Text className='title-right'>
            {
              this.processStatusCode('待出行','已出行', '已退票')
            }
          </Text>
        </View>
        <View className='content'>
          <View className='content-item'>
            发车时间：{ departTime }
          </View>
          <View className='content-item'>
            上车地点：{ departPlace }
          </View>
          <View className='content-item'>
            订票时间：{ orderTime }
          </View>
          <View className='content-item'>
            车牌号码：{ carNum }
          </View>
          <View className='content-item'>
            订票数量：{ ticketNum }
          </View>
        </View>
        {
          statusCode === 0 ? btnGroup : ''
        }
      </View>
    )
  }
}


