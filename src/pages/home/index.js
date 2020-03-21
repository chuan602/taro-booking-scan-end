import React from "react";
import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image, Picker, Button} from '@tarojs/components';
import dayjs from 'dayjs';
import {connect} from '@tarojs/redux';
import './index.less';

@connect(({home}) => ({
  ...home,
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  };

  state = {
    isPickerActive: false
  };

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/queryTicketListByDate'
    })
  }

  handlePickerValueChange = (e) => {
    const { dispatch } = this.props;
    this.setState({
      isPickerActive: true
    });
    dispatch({
      type: 'home/pickerValueEnd',
      payload: e.detail.value
    });
    console.log('change e', e);
  };

  handlePickerColumnChange = (e) => {
    const { dispatch } = this.props;
    const { column, value } = e.detail;
    // 当 校区 列改变时，改变 班车 列信息
    if (column === 0) {
      dispatch({
        type: 'home/columnOneChangeEnd',
        payload: value
      });
    }
    // if (column === 1) {
    //   dispatch({
    //     type: 'home/columnTwoChangeEnd',
    //     payload: value
    //   })
    // }
    console.log('column change e', e);
  };

  render() {
    const { isPickerActive } = this.state;
    const { pickerSourceData, pickerValue } = this.props;
    console.log('pickerSourceData', pickerSourceData);
    return (
      <View className="home">
        <View className='bus-picker-container'>
          <Picker
            mode='multiSelector'
            value={pickerValue}
            onChange={this.handlePickerValueChange}
            onColumnChange={this.handlePickerColumnChange}
            range={pickerSourceData}
            rangeKey='name'
          >
            <View
              className='picker-content'
            >
              当前班次：
              {
                isPickerActive
                  ? `${pickerSourceData[0][pickerValue[0]]['name']} ${pickerSourceData[1][pickerValue[1]]['name']}`
                  : '请选择班车信息'
              }
            </View>
          </Picker>
        </View>
      </View>
    );
  }
}

export default Index;
