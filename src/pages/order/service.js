import Request from '../../utils/request';

export const queryOrderListService = (userId) =>
  Request({
    url: '/order/list/' + encodeURIComponent(userId),
    method: 'GET'
  });

export const queryOrderReturnService = (orderId) =>
  Request({
    url: '/order/return',
    method: 'POST',
    data: {
      orderId
    }
  });
