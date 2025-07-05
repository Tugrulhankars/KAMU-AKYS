import React from 'react';

const StockTransactionsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Stok İşlemleri</h1>
        <p className="text-gray-600 mt-2">
          Stok giriş ve çıkış işlemlerini görüntüleyin, yeni işlemler kaydedin ve raporlar alın.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Stok İşlemleri Sayfası
          </h2>
          <p className="text-gray-600 mb-6">
            Bu sayfa henüz geliştirme aşamasındadır. Yakında eklenecek özellikler:
          </p>
          
          <div className="max-w-md mx-auto text-left">
            <ul className="space-y-2 text-gray-600">
              <li>• İşlem geçmişi görüntüleme</li>
              <li>• Stok giriş işlemi</li>
              <li>• Stok çıkış işlemi</li>
              <li>• Barkod ile hızlı işlem</li>
              <li>• İşlem filtreleme ve arama</li>
              <li>• Toplu işlem yapma</li>
              <li>• İşlem raporları</li>
              <li>• İşlem onay süreci</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockTransactionsPage; 