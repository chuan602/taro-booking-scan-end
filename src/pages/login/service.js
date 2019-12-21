import Request from '../../utils/request';

//登陆并获取用户信息
export const loginService = ({ username, password }) => (
  Request({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  })
)
  

