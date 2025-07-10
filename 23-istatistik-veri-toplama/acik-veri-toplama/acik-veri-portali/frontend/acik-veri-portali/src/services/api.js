// Auth API
export const authAPI = {
  login: (credentials) => api.post('/Auth/login', credentials),
  register: (userData) => api.post('/Auth/register', userData),
  refreshToken: () => api.post('/Auth/refresh-token'),
  forgotPassword: (email) => api.post('/Auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post('/Auth/reset-password', { token, password }),
  changePassword: (passwords) => api.post('/Auth/change-password', passwords),
  getProfile: () => api.get('/Auth/profile'),
  updateProfile: (profileData) => api.put('/Auth/profile', profileData),
};

// User API
export const userAPI = {
  getAll: (params) => api.get('/Users', { params }),
  getById: (id) => api.get(`/Users/${id}`),
  create: (userData) => api.post('/Users', userData),
  update: (id, userData) => api.put(`/Users/${id}`, userData),
  delete: (id) => api.delete(`/Users/${id}`),
  getStats: () => api.get('/Users/stats'),
};

// Category API
export const categoryAPI = {
  getAll: (params) => api.get('/Categories', { params }),
  getById: (id) => api.get(`/Categories/${id}`),
  create: (categoryData) => api.post('/Categories', categoryData),
  update: (id, categoryData) => api.put(`/Categories/${id}`, categoryData),
  delete: (id) => api.delete(`/Categories/${id}`),
  getStats: () => api.get('/Categories/stats'),
};

// DataSet API
export const dataSetAPI = {
  getAll: (params) => api.get('/Datasets', { params }),
  getById: (id) => api.get(`/Datasets/${id}`),
  create: (dataSetData) => api.post('/Datasets', dataSetData),
  update: (id, dataSetData) => api.put(`/Datasets/${id}`, dataSetData),
  delete: (id) => api.delete(`/Datasets/${id}`),
  search: (query) => api.get('/Datasets/search', { params: { q: query } }),
  getPopular: () => api.get('/Datasets/popular'),
  getRecent: () => api.get('/Datasets/recent'),
  getStats: (id) => api.get(`/Datasets/${id}/stats`),
  download: (id) => api.get(`/Datasets/${id}/download`),
  view: (id) => api.post(`/Datasets/${id}/view`),
  subscribe: (id) => api.post(`/Datasets/${id}/subscribe`),
  unsubscribe: (id) => api.delete(`/Datasets/${id}/subscribe`),
  addComment: (id, comment) => api.post(`/Datasets/${id}/comments`, comment),
  getComments: (id) => api.get(`/Datasets/${id}/comments`),
  addTag: (id, tag) => api.post(`/Datasets/${id}/tags`, tag),
  removeTag: (id, tagId) => api.delete(`/Datasets/${id}/tags/${tagId}`),
  export: (id, format) => api.get(`/Datasets/${id}/export`, { params: { format } }),
  getVersions: (id) => api.get(`/Datasets/${id}/versions`),
  getSchema: (id) => api.get(`/Datasets/${id}/schema`),
  getMetadata: (id) => api.get(`/Datasets/${id}/metadata`),
  validateQuality: (id) => api.post(`/Datasets/${id}/validate-quality`),
};

// File API
export const fileAPI = {
  upload: (file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return api.post('/Files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        }
      },
    });
  },
  download: (id) => api.get(`/Files/${id}/download`),
  delete: (id) => api.delete(`/Files/${id}`),
  getInfo: (id) => api.get(`/Files/${id}`),
};

// Dashboard API
export const dashboardAPI = {
  getDashboard: () => api.get('/Dashboard'),
  getPopular: () => api.get('/Dashboard/popular'),
  getCategories: () => api.get('/Dashboard/categories'),
  getEngagement: () => api.get('/Dashboard/engagement'),
  getPortal: (date) => api.get('/Dashboard/portal', { params: { date } }),
  getPortalRange: (startDate, endDate) => api.get('/Dashboard/portal/range', { params: { startDate, endDate } }),
  getDataSet: (dataSetId, date) => api.get(`/Dashboard/dataset/${dataSetId}`, { params: { date } }),
  getDataSetRange: (dataSetId, startDate, endDate) => api.get(`/Dashboard/dataset/${dataSetId}/range`, { params: { startDate, endDate } }),
  getUserActivities: (userId, startDate, endDate) => api.get(`/Dashboard/user/${userId}/activities`, { params: { startDate, endDate } }),
  generateDaily: () => api.post('/Dashboard/generate-daily'),
  generateDataSet: (dataSetId) => api.post(`/Dashboard/dataset/${dataSetId}/generate`),
};

// Search API
export const searchAPI = {
  search: (query, filters) => api.post('/Search', { query, filters }),
  getSuggestions: (query) => api.get('/Search/suggestions', { params: { q: query } }),
  getFilters: () => api.get('/Search/filters'),
  getTrending: () => api.get('/Search/trending'),
};

// Notification API
export const notificationAPI = {
  getAll: (params) => api.get('/Notifications', { params }),
  getUnread: () => api.get('/Notifications/unread'),
  markAsRead: (id) => api.put(`/Notifications/${id}/read`),
  markAllAsRead: () => api.put('/Notifications/read-all'),
  delete: (id) => api.delete(`/Notifications/${id}`),
  getSettings: () => api.get('/Notifications/settings'),
  updateSettings: (settings) => api.put('/Notifications/settings', settings),
};

// Webhook API
export const webhookAPI = {
  getAll: () => api.get('/Webhooks'),
  create: (webhookData) => api.post('/Webhooks', webhookData),
  update: (id, webhookData) => api.put(`/Webhooks/${id}`, webhookData),
  delete: (id) => api.delete(`/Webhooks/${id}`),
  test: (id) => api.post(`/Webhooks/${id}/test`),
  getLogs: (id) => api.get(`/Webhooks/${id}/logs`),
};

// Data Quality API
export const dataQualityAPI = {
  validate: (data) => api.post('/Data-quality/validate', data),
  getReport: (id) => api.get(`/Data-quality/reports/${id}`),
  getAllReports: (params) => api.get('/Data-quality/reports', { params }),
  getQualityMetrics: () => api.get('/Data-quality/metrics'),
};

// Statistics API
export const statisticsAPI = {
  getPortalStats: () => api.get('/Statistics/portal'),
  getDataSetStats: (id) => api.get(`/Statistics/datasets/${id}`),
  getUserStats: (id) => api.get(`/Statistics/users/${id}`),
  getCategoryStats: (id) => api.get(`/Statistics/categories/${id}`),
  getDownloadStats: (params) => api.get('/Statistics/downloads', { params }),
  getViewStats: (params) => api.get('/Statistics/views', { params }),
  getExportStats: (params) => api.get('/Statistics/exports', { params }),
  getQualityStats: () => api.get('/Statistics/quality'),
  getActivityStats: (params) => api.get('/Statistics/activity', { params }),
}; 