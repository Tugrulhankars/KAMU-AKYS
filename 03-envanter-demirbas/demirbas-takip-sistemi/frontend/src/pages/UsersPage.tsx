import React, { useState, useEffect } from 'react';
import { 
  UserGroupIcon, 
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  MagnifyingGlassIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { userService } from '../services/userService';
import { User, UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';

const UsersPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | null>(null);
  const [filterStatus, setFilterStatus] = useState<boolean | null>(null);

  useEffect(() => {
    // Sadece admin kullanıcıları erişebilir
    if (user?.role !== UserRole.Admin) {
      setError('Bu sayfaya erişim yetkiniz bulunmamaktadır.');
      setLoading(false);
      return;
    }
    
    loadUsers();
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const usersData = await userService.getUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Kullanıcılar yüklenirken hata oluştu');
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleActivateUser = async (userId: number) => {
    try {
      await userService.activateUser(userId);
      loadUsers();
    } catch (err) {
      setError('Kullanıcı aktifleştirilirken hata oluştu');
      console.error('Error activating user:', err);
    }
  };

  const handleDeactivateUser = async (userId: number) => {
    if (!window.confirm('Bu kullanıcıyı deaktifleştirmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      await userService.deactivateUser(userId);
      loadUsers();
    } catch (err) {
      setError('Kullanıcı deaktifleştirilirken hata oluştu');
      console.error('Error deactivating user:', err);
    }
  };

  const handleDeleteUser = async (userToDelete: User) => {
    if (userToDelete.id === user?.id) {
      alert('Kendi hesabınızı silemezsiniz!');
      return;
    }

    if (!window.confirm(`${userToDelete.firstName} ${userToDelete.lastName} adlı kullanıcıyı silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await userService.deleteUser(userToDelete.id);
      loadUsers();
    } catch (err) {
      setError('Kullanıcı silinirken hata oluştu');
      console.error('Error deleting user:', err);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === null || u.role === filterRole;
    const matchesStatus = filterStatus === null || u.isActive === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Yetkisiz erişim kontrolü
  if (user?.role !== UserRole.Admin) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center py-12">
          <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-red-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Yetkisiz Erişim</h3>
          <p className="mt-1 text-sm text-gray-500">
            Bu sayfaya erişim yetkiniz bulunmamaktadır. Sadece yöneticiler kullanıcı yönetimi yapabilir.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Kullanıcı Yönetimi
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sistem kullanıcılarını görüntüleyin ve yönetin
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Filters */}
      <div className="mt-8 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Arama
            </label>
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Ad, soyad, kullanıcı adı, e-posta veya departman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rol
            </label>
            <select
              value={filterRole || ''}
              onChange={(e) => setFilterRole(e.target.value ? parseInt(e.target.value) as UserRole : null)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Roller</option>
              <option value={UserRole.Admin}>Yönetici</option>
              <option value={UserRole.Personel}>Personel</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              value={filterStatus === null ? '' : filterStatus.toString()}
              onChange={(e) => setFilterStatus(e.target.value === '' ? null : e.target.value === 'true')}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Durumlar</option>
              <option value="true">Aktif</option>
              <option value="false">Pasif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Departman
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kayıt Tarihi
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map(u => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {u.firstName} {u.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {u.username}
                        </div>
                        <div className="text-sm text-gray-500">
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${userService.getRoleColor(u.role)}`}>
                      {userService.getRoleText(u.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{u.department}</div>
                    <div className="text-sm text-gray-500">{u.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {u.isActive ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">Aktif</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircleIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">Pasif</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(u.createdDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      {u.isActive ? (
                        <button
                          onClick={() => handleDeactivateUser(u.id)}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Deaktifleştir"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivateUser(u.id)}
                          className="text-green-600 hover:text-green-900"
                          title="Aktifleştir"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteUser(u)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                        disabled={u.id === user?.id}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Kullanıcı bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              Arama kriterlerinize uygun kullanıcı bulunmamaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-5">
              <div className="text-sm font-medium text-gray-500">Toplam Kullanıcı</div>
              <div className="text-2xl font-bold text-gray-900">{users.length}</div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5">
              <div className="text-sm font-medium text-gray-500">Aktif Kullanıcı</div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.isActive).length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="ml-5">
              <div className="text-sm font-medium text-gray-500">Yönetici</div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === UserRole.Admin).length}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="ml-5">
              <div className="text-sm font-medium text-gray-500">Personel</div>
              <div className="text-2xl font-bold text-gray-900">
                {users.filter(u => u.role === UserRole.Personel).length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 