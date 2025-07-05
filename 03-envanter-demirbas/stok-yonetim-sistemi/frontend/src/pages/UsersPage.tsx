import React from 'react';

const UsersPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kullanıcı Yönetimi</h1>
        <p className="text-gray-600 mt-2">
          Sistem kullanıcılarını görüntüleyin, yeni kullanıcılar ekleyin ve yetkileri düzenleyin.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kullanıcı Yönetimi Sayfası
          </h2>
          <p className="text-gray-600 mb-6">
            Bu sayfa henüz geliştirme aşamasındadır. Yakında eklenecek özellikler:
          </p>
          
          <div className="max-w-md mx-auto text-left">
            <ul className="space-y-2 text-gray-600">
              <li>• Kullanıcı listesi görüntüleme</li>
              <li>• Yeni kullanıcı ekleme</li>
              <li>• Kullanıcı bilgileri düzenleme</li>
              <li>• Kullanıcı rolü atama</li>
              <li>• Kullanıcı durumu güncelleme</li>
              <li>• Şifre sıfırlama</li>
              <li>• Kullanıcı arama ve filtreleme</li>
              <li>• Kullanıcı aktivite logları</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage; 