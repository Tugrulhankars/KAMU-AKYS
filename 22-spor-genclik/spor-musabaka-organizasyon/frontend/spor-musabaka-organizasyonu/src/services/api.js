import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - token ekleme
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - token yenileme
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh?refreshToken=${refreshToken}`);
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }
    }
    
    return Promise.reject(error);
  }
);

// Authentication API'leri
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { accessToken, refreshToken, username, role } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      
      toast.success('Giriş başarılı!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Giriş başarısız';
      toast.error(message);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { accessToken, refreshToken, username, role } = response.data;
      
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);
      localStorage.setItem('role', role);
      
      toast.success('Kayıt başarılı!');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Kayıt başarısız';
      toast.error(message);
      throw error;
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.post(`/auth/logout?refreshToken=${refreshToken}`);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      toast.success('Çıkış yapıldı');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('accessToken');
  }
};

// Müsabaka API'leri
export const competitionAPI = {
  getAll: () => api.get('/competitions'),
  getById: (id) => api.get(`/competitions/${id}`),
  getBySportType: (sportType) => api.get(`/competitions/sport-type/${sportType}`),
  getByStatus: (status) => api.get(`/competitions/status/${status}`),
  getByOrganizer: (organizerId) => api.get(`/competitions/organizer/${organizerId}`),
  getByVenue: (venueId) => api.get(`/competitions/venue/${venueId}`),
  getUpcoming: () => api.get('/competitions/upcoming'),
  getOpenRegistrations: () => api.get('/competitions/open-registrations'),
  search: (keyword) => api.get(`/competitions/search?keyword=${keyword}`),
  create: (data) => api.post('/competitions', data),
  update: (id, data) => api.put(`/competitions/${id}`, data),
  delete: (id) => api.delete(`/competitions/${id}`),
  changeStatus: (id, status) => api.patch(`/competitions/${id}/status?status=${status}`),
};

// Kullanıcı API'leri
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByUsername: (username) => api.get(`/users/username/${username}`),
  getByEmail: (email) => api.get(`/users/email/${email}`),
  getByRole: (role) => api.get(`/users/role/${role}`),
  getByStatus: (status) => api.get(`/users/status/${status}`),
  search: (keyword) => api.get(`/users/search?keyword=${keyword}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  changeStatus: (id, status) => api.patch(`/users/${id}/status?status=${status}`),
};

// Katılımcı API'leri
export const participantAPI = {
  getAll: () => api.get('/participants'),
  getById: (id) => api.get(`/participants/${id}`),
  getByCompetition: (competitionId) => api.get(`/participants/competition/${competitionId}`),
  getByUser: (userId) => api.get(`/participants/user/${userId}`),
  getByStatus: (status) => api.get(`/participants/status/${status}`),
  getByGender: (gender) => api.get(`/participants/gender/${gender}`),
  getByClub: (clubName) => api.get(`/participants/club/${clubName}`),
  getByPaymentStatus: (paymentStatus) => api.get(`/participants/payment/${paymentStatus}`),
  getByMedicalCertificate: (medicalCertificate) => api.get(`/participants/medical/${medicalCertificate}`),
  getByInsuranceStatus: (insuranceStatus) => api.get(`/participants/insurance/${insuranceStatus}`),
  getByCompetitionAndStatus: (competitionId, status) => api.get(`/participants/competition-status?competitionId=${competitionId}&status=${status}`),
  getByCompetitionAndPaymentStatus: (competitionId, paymentStatus) => api.get(`/participants/competition-payment?competitionId=${competitionId}&paymentStatus=${paymentStatus}`),
  getByDateOfBirthRange: (startDate, endDate) => api.get(`/participants/date-of-birth-range?startDate=${startDate}&endDate=${endDate}`),
  search: (keyword) => api.get(`/participants/search?keyword=${keyword}`),
  getCountByCompetition: (competitionId) => api.get(`/participants/competition/${competitionId}/count`),
  getByCompetitionAndGender: (competitionId, gender) => api.get(`/participants/competition-gender?competitionId=${competitionId}&gender=${gender}`),
  create: (data) => api.post('/participants', data),
  update: (id, data) => api.put(`/participants/${id}`, data),
  delete: (id) => api.delete(`/participants/${id}`),
  changeStatus: (id, status) => api.patch(`/participants/${id}/status?status=${status}`),
  updatePaymentStatus: (id, paymentStatus) => api.patch(`/participants/${id}/payment?paymentStatus=${paymentStatus}`),
  updateMedicalCertificateStatus: (id, medicalCertificate) => api.patch(`/participants/${id}/medical?medicalCertificate=${medicalCertificate}`),
  updateInsuranceStatus: (id, insuranceStatus) => api.patch(`/participants/${id}/insurance?insuranceStatus=${insuranceStatus}`),
};

// Maç API'leri
export const matchAPI = {
  getAll: () => api.get('/matches'),
  getById: (id) => api.get(`/matches/${id}`),
  getByCompetition: (competitionId) => api.get(`/matches/competition/${competitionId}`),
  getByStatus: (status) => api.get(`/matches/status/${status}`),
  getByReferee: (refereeId) => api.get(`/matches/referee/${refereeId}`),
  getByParticipant: (participantId) => api.get(`/matches/participant/${participantId}`),
  getByDateRange: (startDate, endDate) => api.get(`/matches/date-range?startDate=${startDate}&endDate=${endDate}`),
  getByRound: (roundNumber) => api.get(`/matches/round/${roundNumber}`),
  getByCourt: (courtNumber) => api.get(`/matches/court/${courtNumber}`),
  getByCompetitionAndStatus: (competitionId, status) => api.get(`/matches/competition-status?competitionId=${competitionId}&status=${status}`),
  getUpcoming: () => api.get('/matches/upcoming'),
  getByRefereeAndDateRange: (refereeId, startDate, endDate) => api.get(`/matches/referee-date-range?refereeId=${refereeId}&startDate=${startDate}&endDate=${endDate}`),
  getByCompetitionAndRound: (competitionId, roundNumber) => api.get(`/matches/competition-round?competitionId=${competitionId}&roundNumber=${roundNumber}`),
  create: (data) => api.post('/matches', data),
  update: (id, data) => api.put(`/matches/${id}`, data),
  delete: (id) => api.delete(`/matches/${id}`),
  changeStatus: (id, status) => api.patch(`/matches/${id}/status?status=${status}`),
  updateScore: (id, scoreParticipant1, scoreParticipant2) => api.patch(`/matches/${id}/score?scoreParticipant1=${scoreParticipant1}&scoreParticipant2=${scoreParticipant2}`),
};

// Tesis API'leri
export const venueAPI = {
  getAll: () => api.get('/venues'),
  getById: (id) => api.get(`/venues/${id}`),
  getByStatus: (status) => api.get(`/venues/status/${status}`),
  getByCity: (city) => api.get(`/venues/city/${city}`),
  getByIndoor: (isIndoor) => api.get(`/venues/indoor/${isIndoor}`),
  getByLighting: (hasLighting) => api.get(`/venues/lighting/${hasLighting}`),
  getByChangingRooms: (hasChangingRooms) => api.get(`/venues/changing-rooms/${hasChangingRooms}`),
  getByMedicalRoom: (hasMedicalRoom) => api.get(`/venues/medical-room/${hasMedicalRoom}`),
  getByMinCapacity: (minCapacity) => api.get(`/venues/capacity/${minCapacity}`),
  search: (keyword) => api.get(`/venues/search?keyword=${keyword}`),
  getByCityAndStatus: (city, status) => api.get(`/venues/city-status?city=${city}&status=${status}`),
  getByIndoorAndLighting: (isIndoor, hasLighting) => api.get(`/venues/indoor-lighting?isIndoor=${isIndoor}&hasLighting=${hasLighting}`),
  create: (data) => api.post('/venues', data),
  update: (id, data) => api.put(`/venues/${id}`, data),
  delete: (id) => api.delete(`/venues/${id}`),
  changeStatus: (id, status) => api.patch(`/venues/${id}/status?status=${status}`),
};

export default api; 