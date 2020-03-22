import React from "react";
import Taro, {Component} from '@tarojs/taro';
import {View, Text, Image, Picker, Button} from '@tarojs/components';
import dayjs from 'dayjs';
import {connect} from '@tarojs/redux';
import './index.less';
import {AtButton} from "taro-ui";

@connect(({home}) => ({
  ...home,
}))
class Index extends Component {

  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true
  };

  state = {
    isPickerActive: false,
    scanContent: ''
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
  };

  handleScannerClick = () => {
    Taro.scanCode({
      onlyFromCamera: true
    })
      .then(({result}) => {
        this.setState({
          scanContent: result
        })
      });
  };

  render() {
    const { isPickerActive, scanContent } = this.state;
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
            className='picker'
          >
            <View
              className='picker-content'
            >
              <Text
                className='picker-title'
              >
                当前班次：
              </Text>
              <Text
                className='picker-value'
              >
                {
                  isPickerActive
                    ? `${pickerSourceData[0][pickerValue[0]]['name']} ${pickerSourceData[1][pickerValue[1]]['name']}`
                    : '请选择班车信息'
                }
              </Text>
            </View>
          </Picker>
        </View>
        <View>
          {
            scanContent
          }
        </View>
        <View className='scanner-container'>
          <AtButton
            full
            type='primary'
            disabled={!isPickerActive}
            className='scanner'
            onClick={this.handleScannerClick}
          >
            开始扫码
          </AtButton>
        </View>
      </View>
    );
  }
}

export default Index;
