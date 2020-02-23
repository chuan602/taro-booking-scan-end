import Request from '../../utils/request';

export const queryCarListByDateService = date =>
  Request({
    url: '/carList',
    method: 'GET',
    data: {
      date
    },
  });

export const queryBookingTicketService = (carId, num, userId) =>
  Request({
    url: '/booking',
    method: 'POST',
    data: {
      id: carId,
      num,
      userId
    }
  });

