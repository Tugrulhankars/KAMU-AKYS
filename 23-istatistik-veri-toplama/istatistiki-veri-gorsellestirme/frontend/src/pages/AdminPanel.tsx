import React from 'react';
import { Users, Database, UserPlus, Trash2 } from 'lucide-react';

const dummyUsers = [
  { id: 1, username: 'admin', role: 'Admin', createdAt: '2023-01-01' },
  { id: 2, username: 'istatistikci01', role: 'User', createdAt: '2023-02-10' },
  { id: 3, username: 'veriuzmani', role: 'User', createdAt: '2023-03-05' },
];

const dummyDatasets = [
  { id: 1, name: 'Dünya Nüfus İstatistikleri', isPublic: true, createdAt: '2023-01-10' },
  { id: 2, name: 'COVID-19 Günlük Vaka Verileri', isPublic: false, createdAt: '2023-02-15' },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Users className="h-7 w-7 text-blue-600" /> Admin Paneli
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Kullanıcıları ve veri setlerini yönetin, sistem istatistiklerini görüntüleyin.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">Toplam Kullanıcı</p>
          <p className="text-2xl font-bold text-gray-900">{dummyUsers.length}</p>
          <Users className="h-8 w-8 text-blue-600 mt-2" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">Toplam Veri Seti</p>
          <p className="text-2xl font-bold text-gray-900">{dummyDatasets.length}</p>
          <Database className="h-8 w-8 text-green-600 mt-2" />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-1">Kamuya Açık Veri Seti</p>
          <p className="text-2xl font-bold text-gray-900">{dummyDatasets.filter(d => d.isPublic).length}</p>
          <Database className="h-8 w-8 text-yellow-500 mt-2" />
        </div>
      </div>

      {/* User Management */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Kullanıcı Yönetimi</h2>
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
              {dummyUsers.map((user) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Dataset Management */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Veri Seti Yönetimi</h2>
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 font-semibold text-gray-700">Veri Seti Adı</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Durum</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Oluşturulma</th>
                <th className="px-4 py-2 font-semibold text-gray-700">Aksiyon</th>
              </tr>
            </thead>
            <tbody>
              {dummyDatasets.map((ds) => (
                <tr key={ds.id} className="border-t">
                  <td className="px-4 py-2">{ds.name}</td>
                  <td className="px-4 py-2">
                    {ds.isPublic ? (
                      <span className="px-2 py-0.5 text-xs bg-green-100 text-green-700 rounded-full">Kamuya Açık</span>
                    ) : (
                      <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">Özel</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{new Date(ds.createdAt).toLocaleDateString('tr-TR')}</td>
                  <td className="px-4 py-2">
                    <button className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 flex items-center gap-1">
                      <Trash2 className="h-4 w-4" /> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminPanel; 