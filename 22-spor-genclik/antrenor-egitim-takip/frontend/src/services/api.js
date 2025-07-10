import axios from 'axios';

const API_BASE_URL = 'https://localhost:6935/api';

// Axios instance oluştur
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekle
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - hata yönetimi
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/Auth/login', credentials),
  register: (userData) => api.post('/Auth/register', userData),
  getCurrentUser: () => api.get('/Auth/me'),
  changePassword: (passwordData) => api.post('/Auth/change-password', passwordData),
  logout: () => api.post('/Auth/logout'),
  validateToken: () => api.get('/Auth/validate-token'),
};

// Antrenör API
export const antrenorAPI = {
  getAll: () => api.get('/Antrenor'),
  getAktif: () => api.get('/Antrenor/aktif'),
  getById: (id) => api.get(`/Antrenor/${id}`),
  getCurrent: () => api.get('/Antrenor/me'),
  create: (antrenor) => api.post('/Antrenor', antrenor),
  update: (id, antrenor) => api.put(`/Antrenor/${id}`, antrenor),
  delete: (id) => api.delete(`/Antrenor/${id}`),
  activate: (id) => api.post(`/Antrenor/${id}/activate`),
  deactivate: (id) => api.post(`/Antrenor/${id}/deactivate`),
  search: (query) => api.get(`/Antrenor/search?q=${query}`),
  
  // Antrenör bilgileri
  getBilgi: (id) => api.get(`/Antrenor/${id}/bilgi`),
  updateBilgi: (id, bilgi) => api.put(`/Antrenor/${id}/bilgi`, bilgi),
  
  // Deneyimler
  getDeneyimler: (id) => api.get(`/Antrenor/${id}/deneyimler`),
  addDeneyim: (id, deneyim) => api.post(`/Antrenor/${id}/deneyimler`, deneyim),
  deleteDeneyim: (deneyimId) => api.delete(`/Antrenor/deneyimler/${deneyimId}`),
  
  // Uzmanlıklar
  getAllUzmanliklar: () => api.get('/Antrenor/uzmanliklar'),
  getUzmanliklar: (id) => api.get(`/Antrenor/${id}/uzmanliklar`),
  addUzmanlik: (id, uzmanlikId, seviye) => 
    api.post(`/Antrenor/${id}/uzmanliklar/${uzmanlikId}?seviye=${seviye || ''}`),
  removeUzmanlik: (id, uzmanlikId) => 
    api.delete(`/Antrenor/${id}/uzmanliklar/${uzmanlikId}`),
};

// Eğitim API (gelecekte eklenecek)
export const egitimAPI = {
  getAll: () => api.get('/Egitim'),
  getById: (id) => api.get(`/Egitim/${id}`),
  create: (egitim) => api.post('/Egitim', egitim),
  update: (id, egitim) => api.put(`/Egitim/${id}`, egitim),
  delete: (id) => api.delete(`/Egitim/${id}`),
  getKayitlar: (id) => api.get(`/Egitim/${id}/kayitlar`),
  addKayit: (id, kayit) => api.post(`/Egitim/${id}/kayitlar`, kayit),
};

// Sertifika API (gelecekte eklenecek)
export const sertifikaAPI = {
  getAll: () => api.get('/Sertifika'),
  getById: (id) => api.get(`/Sertifika/${id}`),
  create: (sertifika) => api.post('/Sertifika', sertifika),
  update: (id, sertifika) => api.put(`/Sertifika/${id}`, sertifika),
  delete: (id) => api.delete(`/Sertifika/${id}`),
  getByAntrenor: (antrenorId) => api.get(`/Sertifika/antrenor/${antrenorId}`),
};

// Performans API (gelecekte eklenecek)
export const performansAPI = {
  getAll: () => api.get('/Performans'),
  getById: (id) => api.get(`/Performans/${id}`),
  create: (performans) => api.post('/Performans', performans),
  update: (id, performans) => api.put(`/Performans/${id}`, performans),
  delete: (id) => api.delete(`/Performans/${id}`),
  getByAntrenor: (antrenorId) => api.get(`/Performans/antrenor/${antrenorId}`),
};

// Sporcu API (gelecekte eklenecek)
export const sporcuAPI = {
  getAll: () => api.get('/Sporcu'),
  getById: (id) => api.get(`/Sporcu/${id}`),
  create: (sporcu) => api.post('/Sporcu', sporcu),
  update: (id, sporcu) => api.put(`/Sporcu/${id}`, sporcu),
  delete: (id) => api.delete(`/Sporcu/${id}`),
  getByAntrenor: (antrenorId) => api.get(`/Sporcu/antrenor/${antrenorId}`),
};

export default api; 