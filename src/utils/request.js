import Taro from '@tarojs/taro';
import { baseUrl } from '../config';
import {USER_INFO} from "./constants";

export default ({ url, header, ...rest }) => {
  const auth = Taro.getStorageSync(USER_INFO);
  return Taro.request({
    url: baseUrl + url,
    header: Object.assign({}, header, {
      'scanner': true
    }),
    ...rest
  })
}
