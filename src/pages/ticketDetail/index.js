import Taro, { Component } from '@tarojs/taro';
import { View, Text, AtIcon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.less';

const mockData = [
  {
    time: '14:00',
    restTicket: 25,
    departure: '海珠北区正门',
    carNum: 'H93241'
  },
  {
    time: '14:40',
    restTicket: 37,
    departure: '海珠北区正门',
    carNum: 'H11041'
  },
  {
    time: '16:00',
    restTicket: 43,
    departure: '海珠北区正门',
    carNum: 'H12551'
  }
];

@connect(({ ticketDetail }) => ({
  ...ticketDetail,
}))
class Index extends Component {

  state = {
  };

  config = {
    navigationBarTitleText: '详情',
  };

  componentDidMount = () => {

  };

  render() {
    return (
      <View className="home">
      </View>
    );
  }
}

export default Index;
