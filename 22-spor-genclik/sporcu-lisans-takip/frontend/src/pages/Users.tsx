import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, User, Shield, Mail, Phone } from 'lucide-react';
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import { userAPI } from '../services/api';
import { UserDto } from '../types';

const Users = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState<Partial<UserDto>>({});
  const [passwordModal, setPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [emailSearch, setEmailSearch] = useState('');
  const [emailResult, setEmailResult] = useState<UserDto | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      alert('Kullanıcılar alınamadı!');
    }
    setLoading(false);
  };

  const handleEdit = (user: UserDto) => {
    setEditUser(user);
    setEditMode(true);
  };

  const handleUpdate = async () => {
    if (!editUser.id) return;
    try {
      await userAPI.update(editUser.id, editUser as UserDto);
      setEditMode(false);
      fetchUsers();
    } catch (error) {
      alert('Güncelleme başarısız!');
    }
  };

  const handleDeactivate = async (user: UserDto) => {
    try {
      await userAPI.deactivate(user.id);
      fetchUsers();
    } catch (error) {
      alert('Pasif yapma başarısız!');
    }
  };

  const handleActivate = async (user: UserDto) => {
    try {
      await userAPI.activate(user.id);
      fetchUsers();
    } catch (error) {
      alert('Aktif yapma başarısız!');
    }
  };

  const handleChangePassword = async () => {
    if (!selectedUser) return;
    try {
      await userAPI.changePassword({ currentPassword: '', newPassword });
      setPasswordModal(false);
      setNewPassword('');
      alert('Şifre değiştirildi!');
    } catch (error) {
      alert('Şifre değiştirilemedi!');
    }
  };

  const handleEmailSearch = async () => {
    try {
      const user = await userAPI.getByEmail(emailSearch);
      setEmailResult(user);
    } catch (error) {
      setEmailResult(null);
      alert('Kullanıcı bulunamadı!');
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Yönetici';
      case 'manager':
        return 'Müdür';
      case 'user':
        return 'Kullanıcı';
      default:
        return 'Bilinmiyor';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Kullanıcılar</h1>
        <button
          onClick={() => navigate('/users/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Kullanıcı
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Kullanıcı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İletişim
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rol
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Giriş
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {user.email}
                      </div>
                      <div className="flex items-center mt-1">
                        <Phone className="w-3 h-3 mr-1" />
                        {user.identityNumber ?? '-'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 text-gray-400 mr-2" />
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.userType)}`}>
                        {getRoleText(user.userType)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString('tr-TR') : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(user)}
                        className="text-red-600 hover:text-red-900"
                        title="Pasif Yap"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleActivate(user)}
                        className="text-green-600 hover:text-green-900"
                        title="Aktif Yap"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setPasswordModal(true)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Şifre Değiştir"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Kullanıcı</p>
              <p className="text-2xl font-semibold text-gray-900">{users.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Yönetici</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(user => user.userType === 'admin').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktif Kullanıcı</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(user => user.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Müdür</p>
              <p className="text-2xl font-semibold text-gray-900">
                {users.filter(user => user.userType === 'manager').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* E-posta ile kullanıcı arama */}
      <div className="mt-6 flex gap-2">
        <input value={emailSearch} onChange={e => setEmailSearch(e.target.value)} placeholder="E-posta ile ara..." className="border px-2 py-1 rounded" />
        <button onClick={handleEmailSearch} className="bg-blue-500 text-white px-2 py-1 rounded">Ara</button>
        {emailResult && <span className="ml-2">Bulunan: {emailResult.firstName} {emailResult.lastName} ({emailResult.email})</span>}
      </div>

      {/* Kullanıcı düzenleme ve şifre değiştirme için modal */}
      {editMode && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Kullanıcı Düzenle</h2>
          {/* Kullanıcı düzenleme formu burada yer alacak */}
        </div>
      )}

      {passwordModal && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Şifre Değiştir</h2>
          {/* Şifre değiştirme formu burada yer alacak */}
        </div>
      )}
    </div>
  );
};

export default Users; 