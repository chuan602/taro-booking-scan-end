import Request from '../../utils/request';

export const queryPasswordModifyService = (userId, originPassword, newPassword) =>
  Request({
    url: '/modify/password/' + encodeURIComponent(userId),
    method: 'POST',
    data: {
      originPassword,
      newPassword
    }
  });
