import React, { useState } from 'react';
import { Users as UsersIcon, UserPlus, Search, Trash2 } from 'lucide-react';

const dummyUsers = [
  { id: 1, username: 'admin', role: 'Admin', createdAt: '2023-01-01' },
  { id: 2, username: 'istatistikci01', role: 'User', createdAt: '2023-02-10' },
  { id: 3, username: 'veriuzmani', role: 'User', createdAt: '2023-03-05' },
  { id: 4, username: 'ayse.kaya', role: 'User', createdAt: '2024-04-12' },
];

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const filtered = dummyUsers.filter(u => u.username.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <UsersIcon className="h-8 w-8 text-blue-600" /> Kullanıcılar
            </h1>
            <p className="text-gray-600 mt-2">Sistemdeki tüm kullanıcıları görüntüleyin ve yönetin.</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">
            <UserPlus className="h-5 w-5" /> Yeni Kullanıcı
          </button>
        </div>
        {/* Stats */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-semibold">
            <UsersIcon className="h-5 w-5" /> Toplam Kullanıcı: {dummyUsers.length}
          </div>
        </div>
        {/* Search */}
        <div className="mb-6 flex items-center gap-2">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Kullanıcı adı ara..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        {/* User Table */}
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Kullanıcı Adı</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Rol</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Kayıt Tarihi</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-400">Kullanıcı bulunamadı.</td>
                </tr>
              ) : (
                filtered.map(user => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-2">{user.username}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</td>
                    <td className="px-4 py-2">
                      <button className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 flex items-center gap-1">
                        <Trash2 className="h-4 w-4" /> Sil
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users; 