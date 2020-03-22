import Request from '../../utils/request';

export const queryCarListByDateService = (date) =>
  Request({
    url: '/scan/carList',
    method: 'GET',
    data: {
      date
    },
  });

export const queryScanService = (orderId, carId) =>
  Request({
    url: '/scan/qr',
    method: 'POST',
    data: {
      orderId,
      carId
    }
  });

