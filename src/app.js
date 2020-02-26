import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import { Provider } from '@tarojs/redux';
import Home from './pages/home';
import dva from './utils/dva';

import models from './models';
// import './styles/base.less';

const dvaApp = dva.createApp({
  initialState: {},
  models: models,
});
const store = dvaApp.getStore();

class App extends Component {
  config = {
    pages: [
      'pages/login/index',
      'pages/home/index',
      'pages/user/index',
      'pages/order/index',
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#6190E8',
      navigationBarTitleText: 'bus booking',
      navigationBarTextStyle: 'white',
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/home/index',
          text: '首页',
          iconPath: './images/tab/home.png',
          selectedIconPath: './images/tab/home-active.png',
        },
        {
          pagePath: 'pages/user/index',
          text: '我的',
          iconPath: './images/tab/user.png',
          selectedIconPath: './images/tab/user-active.png',
        },
      ],
      color: '#333',
      selectedColor: '#333',
      backgroundColor: '#fff',
      borderStyle: 'white',
    },
  };

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
