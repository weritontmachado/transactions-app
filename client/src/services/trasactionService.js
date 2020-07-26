import http from '../http-common';

const findPeriods = () => {
  return http.get('/api/transaction/periods/');
};

const findByPeriod = (period) => {
  return http.get(`/api/transaction/?period=${period}`);
};

const create = (data) => {
  return http.post('/api/transaction', data);
};

const update = (data) => {
  return http.put(`/api/transaction/`, data);
};

const remove = (id) => {
  return http.delete(`/api/transaction/${id}`);
};

export default {
  findPeriods,
  findByPeriod,
  create,
  update,
  remove,
};
