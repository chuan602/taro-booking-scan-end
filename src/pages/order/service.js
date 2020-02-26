import Request from '../../utils/request';

export const queryOrderListService = (userId) =>
  Request({
    url: '/order/' + encodeURIComponent(userId),
    method: 'GET'
  });

