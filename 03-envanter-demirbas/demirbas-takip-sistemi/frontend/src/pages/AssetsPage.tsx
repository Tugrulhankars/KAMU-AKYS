import React, { useState, useEffect } from 'react';
import { 
  CubeIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  FunnelIcon,
  MagnifyingGlassIcon 
} from '@heroicons/react/24/outline';
import { assetService } from '../services/assetService';
import { categoryService } from '../services/categoryService';
import { Asset, Category, AssetStatus, CreateAssetRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const AssetsPage: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<AssetStatus | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateAssetRequest>({
    name: '',
    description: '',
    assetCode: '',
    serialNumber: '',
    brand: '',
    model: '',
    purchasePrice: 0,
    purchaseDate: '',
    location: '',
    notes: '',
    categoryId: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('add') === 'new') {
      setShowCreateModal(true);
    }
  }, [location.search]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assetsData, categoriesData] = await Promise.all([
        assetService.getAssets(),
        categoryService.getCategories()
      ]);
      setAssets(assetsData);
      setCategories(categoriesData);
    } catch (err) {
      setError('Veri yüklenirken hata oluştu');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assetService.createAsset(formData);
      setShowCreateModal(false);
      resetForm();
      setError(null);
      loadData();
    } catch (err: any) {
      if (err?.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err?.message) {
        setError(err.message);
      } else {
        setError('Demirbaş oluşturulurken hata oluştu');
      }
      console.error('Error creating asset:', err);
    }
  };

  const handleUpdateAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsset) return;
    
    try {
      await assetService.updateAsset(selectedAsset.id, formData);
      setShowEditModal(false);
      setSelectedAsset(null);
      resetForm();
      loadData();
    } catch (err) {
      setError('Demirbaş güncellenirken hata oluştu');
      console.error('Error updating asset:', err);
    }
  };

  const handleDeleteAsset = async (asset: Asset) => {
    if (!window.confirm(`${asset.name} adlı demirbaşı silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await assetService.deleteAsset(asset.id);
      loadData();
    } catch (err) {
      setError('Demirbaş silinirken hata oluştu');
      console.error('Error deleting asset:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      assetCode: '',
      serialNumber: '',
      brand: '',
      model: '',
      purchasePrice: 0,
      purchaseDate: '',
      location: '',
      notes: '',
      categoryId: 0
    });
  };

  const openEditModal = (asset: Asset) => {
    setSelectedAsset(asset);
    setFormData({
      name: asset.name,
      description: asset.description,
      assetCode: asset.assetCode,
      serialNumber: asset.serialNumber,
      brand: asset.brand,
      model: asset.model,
      purchasePrice: asset.purchasePrice,
      purchaseDate: asset.purchaseDate,
      location: asset.location,
      notes: asset.notes,
      categoryId: asset.categoryId
    });
    setShowEditModal(true);
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || asset.categoryId === selectedCategory;
    const matchesStatus = selectedStatus === null || asset.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Demirbaş Yönetimi
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Tüm demirbaşları görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Yeni Demirbaş
          </button>
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
                placeholder="Demirbaş adı, kodu veya markası..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? parseInt(e.target.value) : null)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durum
            </label>
            <select
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value ? parseInt(e.target.value) as AssetStatus : null)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Durumlar</option>
              <option value={AssetStatus.Available}>Müsait</option>
              <option value={AssetStatus.Assigned}>Zimmetli</option>
              <option value={AssetStatus.Maintenance}>Bakımda</option>
              <option value={AssetStatus.Damaged}>Arızalı</option>
              <option value={AssetStatus.Disposed}>İmha Edildi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 animate-fade-in">
          <table className="min-w-full divide-y divide-primary/20">
            <thead className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Demirbaş
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Konum
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Fiyat
                </th>
                {user?.role === 1 && (
                  <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                    İşlemler
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white/80 divide-y divide-primary/10">
              {filteredAssets.map((asset, idx) => (
                <tr
                  key={asset.id}
                  className={cn(
                    idx % 2 === 0 ? "bg-white/60" : "bg-primary/5",
                    "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-colors group"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CubeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {asset.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {asset.assetCode}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="text-sm text-gray-900">
                      {asset.category?.name || 'Bilinmiyor'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${assetService.getStatusColor(asset.status)}`}>
                      {assetService.getStatusText(asset.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    {asset.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    ₺{asset.purchasePrice.toLocaleString('tr-TR')}
                  </td>
                  {user?.role === 1 && (
                    <td className="px-6 py-4 whitespace-nowrap text-right border-b border-primary/10">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => openEditModal(asset)}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md hover:scale-105 transition-transform"
                        >
                          <PencilIcon className="h-4 w-4 mr-2" />
                          Düzenle
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset)}
                          className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Sil
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Demirbaş bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              Arama kriterlerinize uygun demirbaş bulunmamaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Yeni Demirbaş Ekle
              </h3>
              <form onSubmit={handleCreateAsset} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Demirbaş Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Demirbaş Kodu *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.assetCode}
                      onChange={(e) => setFormData({...formData, assetCode: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seri Numarası
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value)})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marka
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alış Fiyatı
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: parseFloat(e.target.value)})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alış Tarihi
                    </label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Konum
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedAsset && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Demirbaş Düzenle
              </h3>
              <form onSubmit={handleUpdateAsset} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Demirbaş Adı *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Demirbaş Kodu *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.assetCode}
                      onChange={(e) => setFormData({...formData, assetCode: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Seri Numarası
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({...formData, serialNumber: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Kategori *
                    </label>
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) => setFormData({...formData, categoryId: parseInt(e.target.value)})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Kategori Seçin</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Marka
                    </label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Model
                    </label>
                    <input
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alış Fiyatı
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.purchasePrice}
                      onChange={(e) => setFormData({...formData, purchasePrice: parseFloat(e.target.value)})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alış Tarihi
                    </label>
                    <input
                      type="date"
                      value={formData.purchaseDate}
                      onChange={(e) => setFormData({...formData, purchaseDate: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Konum
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Açıklama
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedAsset(null);
                      resetForm();
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Güncelle
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsPage; 