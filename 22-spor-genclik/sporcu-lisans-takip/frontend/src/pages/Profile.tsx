import React, { useState } from 'react';
import { useAuth } from '../App';
import { User, Mail, Phone, Shield, Calendar, Edit, Save, X } from 'lucide-react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'user';
  status: 'active' | 'inactive';
  lastLogin: string;
  createdAt: string;
  department?: string;
  position?: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: 'Admin Kullanıcı',
    email: 'admin@spor.gov.tr',
    phone: '+90 555 123 4567',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00',
    createdAt: '2023-01-01',
    department: 'Spor Yönetimi',
    position: 'Sistem Yöneticisi'
  });

  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    department: profile.department || '',
    position: profile.position || ''
  });

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

  const handleSave = () => {
    setProfile(prev => ({
      ...prev,
      ...formData
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      department: profile.department || '',
      position: profile.position || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Düzenle
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Kaydet
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              İptal
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil Kartı */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="text-center">
              <div className="mx-auto h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{profile.name}</h2>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getRoleColor(profile.role)}`}>
                {getRoleText(profile.role)}
              </span>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">{profile.phone}</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 text-gray-400 mr-3" />
                <span className="text-sm text-gray-600">ID: {profile.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detay Bilgileri */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Kişisel Bilgiler</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ad Soyad
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departman
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.department || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pozisyon
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-900">{profile.position || 'Belirtilmemiş'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durum
                </label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  profile.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {profile.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>
            </div>
          </div>

          {/* Hesap Bilgileri */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hesap Bilgileri</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hesap Oluşturma Tarihi
                </label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-gray-900">
                    {new Date(profile.createdAt).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Son Giriş Tarihi
                </label>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <p className="text-gray-900">
                    {new Date(profile.lastLogin).toLocaleString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Şifre Değiştirme */}
          <div className="mt-6 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Şifre Değiştir</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mevcut şifrenizi girin"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Yeni şifrenizi girin"
                />
              </div>
            </div>

            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Şifre Değiştir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 