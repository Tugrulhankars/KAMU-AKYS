import API from './axios';

export const getReports = async () => {
  const response = await API.get('/reports');
  return response.data;
};

export const downloadReport = async (reportId) => {
  const response = await API.get(`/reports/${reportId}/download`, { responseType: 'blob' });
  return response.data;
};

export const createReport = async (data) => {
  const response = await API.post('/reports', data);
  return response.data;
}; 