import Taro from '@tarojs/taro';
import { baseUrl } from '../config';

export default ({ url, ...rest }) => {
  return Taro.request({
    url: baseUrl + url,
    ...rest
  })
}
