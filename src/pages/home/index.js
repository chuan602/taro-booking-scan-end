import Taro, { Component } from '@tarojs/taro';
import { View, Text, AtIcon } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtTabs, AtTabsPane  } from 'taro-ui';
import './index.less';

const tabList = [
  {
    title: '标签页1'
  },
  {
    title: '标签页2'
  },
  {
    title: '标签页3'
  },
  {
    title: '标签页4'
  },
  {
    title: '标签页5'
  },
  {
    title: '标签页6'
  }
]

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
]

@connect(({ home }) => ({
  ...home,
}))
class Index extends Component {

  state = {
    tabCurrent: 0
  }

  config = {
    navigationBarTitleText: '首页',
  };

  componentDidMount = () => {
    
  };

  handleTabClick = (current) => {
    this.setState({
      tabCurrent: current
    })
  }

  renderDestCard = () => {
    return (
      <View className='at-row at-row__align--center inner'>
        <View className='at-col at-col-5 home-location departure'>
          <Text className='departure-label'>出发地</Text>
          <Text className='departure-name'>海珠校区</Text>
        </View>
        <View className='at-col at-col-2 home-location-exchange'>
          <AtIcon value='repeat-play' color='#6190E8' size='32' />
        </View>
        <View className='at-col at-col-5 home-location destination'>
          <Text className='destination-label'>目的地</Text>
          <Text className='destination-name'>白云校区</Text>
        </View>
      </View>
    )
  }

  renderTicketList = () => {

    const list = mockData.map((item, index) => (
      <View className='ticket-list-item' key={index}>
        <View className='item-main at-row'>
          <View className='main-left at-col'>
            <Text className='departure-time-title'>发车时间</Text>
            <Text className='departure-time'>{ item.time }</Text>
          </View>
          <View className='main-right at-col'>
            <Text className='rest-ticket-title'>余票</Text>
            <Text className='rest-ticket'>{ item.restTicket }</Text>
          </View>
        </View>
        <View className='item-footer at-row at-row__justify--between'>
          <Text>{ item.departure }</Text>
          <Text>{ item.carNum }</Text>
        </View>
      </View>
    ))

    return (<View className='ticket-list'>{ list }</View>);
  }

  render() {
    const { tabCurrent } = this.state;
    return (
      <View className="home">
        <AtTabs
          current={this.state.tabCurrent}
          scroll
          tabList={tabList}
          onClick={this.handleTabClick.bind(this)}
        >
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={0}>
            <View className='home-tabPane-container'>
              { this.renderDestCard() }
              { this.renderTicketList() }
            </View>
          </AtTabsPane>
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={1}>TabsPane2</AtTabsPane>
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={2}>TabsPane3</AtTabsPane>
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={3}>TabsPane4</AtTabsPane>
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={4}>TabsPane5</AtTabsPane>
          <AtTabsPane className='home-tabPane' current={tabCurrent} index={5}>TabsPane6</AtTabsPane> 
        </AtTabs>
      </View>
    );
  }
}

export default Index;
