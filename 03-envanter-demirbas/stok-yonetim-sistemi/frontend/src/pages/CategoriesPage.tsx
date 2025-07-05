import React from 'react';

const CategoriesPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Kategori Yönetimi</h1>
        <p className="text-gray-600 mt-2">
          Ürün kategorilerini görüntüleyin, ekleyin, düzenleyin ve organize edin.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kategori Yönetimi Sayfası
          </h2>
          <p className="text-gray-600 mb-6">
            Bu sayfa henüz geliştirme aşamasındadır. Yakında eklenecek özellikler:
          </p>
          
          <div className="max-w-md mx-auto text-left">
            <ul className="space-y-2 text-gray-600">
              <li>• Kategori listesi görüntüleme</li>
              <li>• Yeni kategori ekleme</li>
              <li>• Kategori düzenleme</li>
              <li>• Kategori silme</li>
              <li>• Kategori durumu güncelleme</li>
              <li>• Kategori içindeki ürün sayısı</li>
              <li>• Kategori arama ve filtreleme</li>
              <li>• Kategori organizasyonu</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage; 