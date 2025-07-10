import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { userAPI } from '../services/api';
import toast from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken hata:', error);
      toast.error('Kullanıcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      try {
        await userAPI.delete(id);
        toast.success('Kullanıcı başarıyla silindi');
        fetchUsers();
      } catch (error) {
        console.error('Kullanıcı silinirken hata:', error);
        toast.error('Kullanıcı silinirken hata oluştu');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await userAPI.changeStatus(id, newStatus);
      toast.success('Kullanıcı durumu güncellendi');
      fetchUsers();
    } catch (error) {
      console.error('Durum güncellenirken hata:', error);
      toast.error('Durum güncellenirken hata oluştu');
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'Aktif';
      case 'INACTIVE':
        return 'Pasif';
      case 'SUSPENDED':
        return 'Askıya Alınmış';
      case 'PENDING':
        return 'Beklemede';
      default:
        return status;
    }
  };

  const getRoleText = (role) => {
    switch (role) {
      case 'ADMIN':
        return 'Yönetici';
      case 'ORGANIZER':
        return 'Organizatör';
      case 'REFEREE':
        return 'Hakem';
      case 'PARTICIPANT':
        return 'Katılımcı';
      case 'VIEWER':
        return 'İzleyici';
      default:
        return role;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'INACTIVE':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'SUSPENDED':
        return <XCircle className="h-4 w-4 text-orange-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || user.status === statusFilter;
    const matchesRole = !roleFilter || user.role === roleFilter;
    
    return matchesSearch && matchesStatus && matchesRole;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık ve Butonlar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
          <p className="text-gray-600">Tüm sistem kullanıcılarını yönetin</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/users/new"
            className="btn-primary inline-flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kullanıcı
          </Link>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary inline-flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtreler
          </button>
        </div>

        {/* Filtre Seçenekleri */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Durumlar</option>
                  <option value="ACTIVE">Aktif</option>
                  <option value="INACTIVE">Pasif</option>
                  <option value="SUSPENDED">Askıya Alınmış</option>
                  <option value="PENDING">Beklemede</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="input-field"
                >
                  <option value="">Tüm Roller</option>
                  <option value="ADMIN">Yönetici</option>
                  <option value="ORGANIZER">Organizatör</option>
                  <option value="REFEREE">Hakem</option>
                  <option value="PARTICIPANT">Katılımcı</option>
                  <option value="VIEWER">İzleyici</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Kullanıcılar Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  @{user.username}
                </p>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">
                    {getRoleText(user.role)}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(user.status)}
                <span className={`status-badge status-${user.status?.toLowerCase()}`}>
                  {getStatusText(user.status)}
                </span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{user.email}</span>
              </div>
              
              {user.phoneNumber && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-600">
                <User className="h-4 w-4 mr-2" />
                <span>Kayıt: {user.createdAt && new Date(user.createdAt).toLocaleDateString('tr-TR')}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Link
                  to={`/users/${user.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Görüntüle"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  to={`/users/${user.id}/edit`}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <select
                value={user.status}
                onChange={(e) => handleStatusChange(user.id, e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Pasif</option>
                <option value="SUSPENDED">Askıya Alınmış</option>
                <option value="PENDING">Beklemede</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Boş Durum */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Kullanıcı bulunamadı
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter || roleFilter
              ? 'Arama kriterlerinize uygun kullanıcı bulunamadı.'
              : 'Henüz kullanıcı eklenmemiş.'
            }
          </p>
          <Link to="/users/new" className="btn-primary">
            İlk Kullanıcıyı Ekle
          </Link>
        </div>
      )}
    </div>
  );
};

export default Users; 