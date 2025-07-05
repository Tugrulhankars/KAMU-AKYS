import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi } from '../services/api';
import { Product } from '../types';
import Loading from '../components/common/Loading';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortDir, setSortDir] = useState<string>('asc');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await productsApi.getProducts({ page: 1, pageSize: 100, sortBy, sortDir });
        if (res.success && res.data) {
          setProducts(res.data.items);
        }
      } catch (err) {
        // Hata yönetimi
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [sortBy, sortDir]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <p className="text-gray-600 mt-2">
            Ürünlerinizi görüntüleyin, ekleyin, düzenleyin ve stok durumlarını takip edin.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Sırala:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={sortBy + '-' + sortDir}
              onChange={e => {
                const [field, dir] = e.target.value.split('-');
                setSortBy(field);
                setSortDir(dir);
              }}
            >
              <option value="name-asc">Ada göre (A-Z)</option>
              <option value="name-desc">Ada göre (Z-A)</option>
              <option value="currentstock-desc">Stoka göre (Çoktan aza)</option>
              <option value="currentstock-asc">Stoka göre (Azdan çoğa)</option>
              <option value="unitprice-desc">Fiyata göre (Yüksekten düşüğe)</option>
              <option value="unitprice-asc">Fiyata göre (Düşükten yükseğe)</option>
              <option value="createdat-desc">Eklenme Tarihi (Yeniden eskiye)</option>
              <option value="createdat-asc">Eklenme Tarihi (Eskiden yeniye)</option>
            </select>
          </div>
          <button
            className="px-5 py-2 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors"
            onClick={() => navigate('/add-product')}
          >
            + Yeni Ürün Ekle
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Ürün Yönetimi Sayfası
          </h2>
          <p className="text-gray-600 mb-6">
            Bu sayfa henüz geliştirme aşamasındadır. Yakında eklenecek özellikler:
          </p>
          <div className="max-w-md mx-auto text-left">
            <ul className="space-y-2 text-gray-600">
              <li>• Ürün listesi görüntüleme</li>
              <li>• Yeni ürün ekleme</li>
              <li>• Ürün düzenleme</li>
              <li>• Ürün silme</li>
              <li>• Stok seviyesi güncelleme</li>
              <li>• Barkod ile ürün arama</li>
              <li>• Kategori filtreleme</li>
              <li>• Kritik stok uyarıları</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürün Listesi</h2>
        {loading ? (
          <Loading size="md" text="Ürünler yükleniyor..." />
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Hiç ürün bulunamadı.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Ürün Adı</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Kategori</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Stok</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Birim</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900">Birim Fiyatı</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-blue-100">
                    <td className="px-4 py-2 font-medium text-gray-800">{product.name || '-'}</td>
                    <td className="px-4 py-2 text-gray-800">{product.categoryName || '-'}</td>
                    <td className="px-4 py-2 text-gray-800">{product.currentStock !== undefined ? product.currentStock : '-'}</td>
                    <td className="px-4 py-2 text-gray-800">{product.unit || '-'}</td>
                    <td className="px-4 py-2 text-gray-800">{product.unitPrice !== undefined && product.unitPrice !== null ? `₺${product.unitPrice}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage; 