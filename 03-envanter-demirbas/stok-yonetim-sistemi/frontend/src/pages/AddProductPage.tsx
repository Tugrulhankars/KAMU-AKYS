import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsApi, categoriesApi } from '../services/api';
import { Category, ProductType, CreateProduct } from '../types';
import toast from 'react-hot-toast';

const AddProductPage: React.FC = () => {
  const [formData, setFormData] = useState<CreateProduct>({
    name: '',
    description: '',
    barcode: '',
    type: ProductType.SarfMalzeme,
    categoryId: 0,
    unitPrice: undefined,
    unit: '',
    currentStock: 0,
    minStockLevel: 1,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    categoriesApi.getCategories().then(res => {
      if (res.success && res.data) setCategories(res.data);
    });
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Ürün adı zorunludur';
    if (!formData.categoryId) newErrors.categoryId = 'Kategori seçiniz';
    if (!formData.unit) newErrors.unit = 'Birim giriniz';
    if (formData.currentStock < 0) newErrors.currentStock = 'Stok negatif olamaz';
    if (formData.minStockLevel < 0) newErrors.minStockLevel = 'Kritik stok negatif olamaz';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'currentStock' || name === 'minStockLevel' || name === 'categoryId' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await productsApi.createProduct(formData);
      if (res.success) {
        toast.success('Ürün başarıyla eklendi!');
        navigate('/products');
      } else {
        toast.error(res.message || 'Ürün eklenemedi');
      }
    } catch (err) {
      toast.error('Sunucu hatası!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Yeni Ürün Ekle</h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={2} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Barkod</label>
            <input type="text" name="barcode" value={formData.barcode} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full border rounded px-3 py-2" required>
              <option value={0}>Seçiniz</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Tipi</label>
            <select name="type" value={formData.type} onChange={handleChange} className="w-full border rounded px-3 py-2">
              <option value={ProductType.SarfMalzeme}>Sarf Malzeme</option>
              <option value={ProductType.Demirbas}>Demirbaş</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
              <input type="number" name="currentStock" value={formData.currentStock} onChange={handleChange} className="w-full border rounded px-3 py-2" min={0} required />
              {errors.currentStock && <p className="text-red-500 text-xs mt-1">{errors.currentStock}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kritik Stok</label>
              <input type="number" name="minStockLevel" value={formData.minStockLevel} onChange={handleChange} className="w-full border rounded px-3 py-2" min={0} required />
              {errors.minStockLevel && <p className="text-red-500 text-xs mt-1">{errors.minStockLevel}</p>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birim</label>
              <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
              {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birim Fiyatı</label>
              <input type="number" name="unitPrice" value={formData.unitPrice || ''} onChange={handleChange} className="w-full border rounded px-3 py-2" min={0} step={0.01} />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors mt-4 disabled:opacity-60">
            {loading ? 'Ekleniyor...' : 'Ürünü Ekle'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage; 