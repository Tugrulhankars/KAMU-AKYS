import React, { useState, useEffect } from 'react';
import { 
  RectangleStackIcon, 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  CubeIcon 
} from '@heroicons/react/24/outline';
import { categoryService } from '../services/categoryService';
import { Category, CreateCategoryRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const CategoriesPage: React.FC = () => {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: '',
    description: '',
    code: ''
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await categoryService.getCategories();
      setCategories(categoriesData);
    } catch (err) {
      setError('Kategoriler yüklenirken hata oluştu');
      console.error('Error loading categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await categoryService.createCategory(formData);
      setShowCreateModal(false);
      resetForm();
      loadCategories();
    } catch (err) {
      setError('Kategori oluşturulurken hata oluştu');
      console.error('Error creating category:', err);
    }
  };

  const handleUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    
    try {
      await categoryService.updateCategory(selectedCategory.id, formData);
      setShowEditModal(false);
      setSelectedCategory(null);
      resetForm();
      loadCategories();
    } catch (err) {
      setError('Kategori güncellenirken hata oluştu');
      console.error('Error updating category:', err);
    }
  };

  const handleDeleteCategory = async (category: Category) => {
    if (category.assetCount > 0) {
      alert('Bu kategoriye ait demirbaşlar bulunmaktadır. Önce bu demirbaşları başka kategorilere taşıyın.');
      return;
    }

    if (!window.confirm(`${category.name} adlı kategoriyi silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      await categoryService.deleteCategory(category.id);
      loadCategories();
    } catch (err) {
      setError('Kategori silinirken hata oluştu');
      console.error('Error deleting category:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      code: ''
    });
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      code: category.code
    });
    setShowEditModal(true);
  };

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
            Kategori Yönetimi
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Demirbaş kategorilerini görüntüleyin ve yönetin
          </p>
        </div>
        {user?.role === 1 && (
          <div className="mt-4 md:mt-0 md:ml-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Yeni Kategori
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 animate-fade-in">
        <table className="min-w-full divide-y divide-primary/20">
          <thead className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm"
                >
                  {col.title}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white/80 divide-y divide-primary/10">
            {categories.map((category, idx) => (
              <tr
                key={category.id}
                className={cn(
                  idx % 2 === 0 ? "bg-white/60" : "bg-primary/5",
                  "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-colors group"
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10"
                  >
                    {category[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right border-b border-primary/10">
                  <button className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md hover:scale-105 transition-transform">
                    Düzenle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {categories.length === 0 && (
        <div className="mt-8 text-center py-12">
          <RectangleStackIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Kategori bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            Henüz kategori tanımlanmamış.
          </p>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Yeni Kategori Ekle
              </h3>
              <form onSubmit={handleCreateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori Adı *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Örn: Bilgisayar Donanımı"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori Kodu *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Örn: BIL-DON"
                  />
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
                    placeholder="Kategori açıklaması..."
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
      {showEditModal && selectedCategory && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Kategori Düzenle
              </h3>
              <form onSubmit={handleUpdateCategory} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori Adı *
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
                    Kategori Kodu *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
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
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedCategory(null);
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

export default CategoriesPage; 