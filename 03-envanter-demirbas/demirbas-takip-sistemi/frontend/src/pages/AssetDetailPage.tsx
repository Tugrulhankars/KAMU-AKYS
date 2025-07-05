import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  CubeIcon, 
  ArrowLeftIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  TagIcon,
  UserIcon,
  ClockIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { assetService } from '../services/assetService';
import { assignmentService } from '../services/assignmentService';
import { Asset, Assignment, AssetStatus } from '../types';
import { useAuth } from '../contexts/AuthContext';

const AssetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [asset, setAsset] = useState<Asset | null>(null);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<AssetStatus>(AssetStatus.Available);

  useEffect(() => {
    if (id) {
      loadAssetDetails(parseInt(id));
    }
  }, [id]);

  const loadAssetDetails = async (assetId: number) => {
    try {
      setLoading(true);
      const [assetData, assignmentsData] = await Promise.all([
        assetService.getAsset(assetId),
        assignmentService.getAssignmentsByAsset(assetId)
      ]);
      setAsset(assetData);
      setAssignments(assignmentsData);
      setNewStatus(assetData.status);
    } catch (err) {
      setError('Demirbaş detayları yüklenirken hata oluştu');
      console.error('Error loading asset details:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    if (!asset || !id) return;

    try {
      await assetService.updateAssetStatus(asset.id, newStatus);
      setShowStatusModal(false);
      loadAssetDetails(parseInt(id));
    } catch (err) {
      setError('Demirbaş durumu güncellenirken hata oluştu');
      console.error('Error updating asset status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center py-12">
          <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Demirbaş bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aradığınız demirbaş mevcut değil.
          </p>
        </div>
      </div>
    );
  }

  const activeAssignment = assignments.find(a => a.type === 1 && !a.returnDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/assets')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Demirbaş Listesine Dön
        </button>
        
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              {asset.name}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Demirbaş Kodu: {asset.assetCode}
            </p>
          </div>
          {user?.role === 1 && (
            <div className="mt-4 md:mt-0 md:ml-4">
              <button
                onClick={() => setShowStatusModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Durum Güncelle
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Asset Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Temel Bilgiler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-500">Demirbaş Adı</label>
                <p className="mt-1 text-sm text-gray-900">{asset.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Demirbaş Kodu</label>
                <p className="mt-1 text-sm text-gray-900">{asset.assetCode}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Seri Numarası</label>
                <p className="mt-1 text-sm text-gray-900">{asset.serialNumber || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Kategori</label>
                <p className="mt-1 text-sm text-gray-900">{asset.category?.name || 'Bilinmiyor'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Marka</label>
                <p className="mt-1 text-sm text-gray-900">{asset.brand || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Model</label>
                <p className="mt-1 text-sm text-gray-900">{asset.model || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Alış Fiyatı</label>
                <p className="mt-1 text-sm text-gray-900">₺{asset.purchasePrice.toLocaleString('tr-TR')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Alış Tarihi</label>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(asset.purchaseDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Konum</label>
                <p className="mt-1 text-sm text-gray-900">{asset.location || 'Belirtilmemiş'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Durum</label>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${assetService.getStatusColor(asset.status)}`}>
                  {assetService.getStatusText(asset.status)}
                </span>
              </div>
            </div>
            
            {asset.description && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-500">Açıklama</label>
                <p className="mt-1 text-sm text-gray-900">{asset.description}</p>
              </div>
            )}
            
            {asset.notes && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-500">Notlar</label>
                <p className="mt-1 text-sm text-gray-900">{asset.notes}</p>
              </div>
            )}
          </div>

          {/* Assignment History */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Zimmet Geçmişi</h3>
            {assignments.length > 0 ? (
              <div className="space-y-4">
                {assignments.map(assignment => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${assignmentService.getTypeColor(assignment.type)}`}>
                          {assignmentService.getTypeText(assignment.type)}
                        </span>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            {assignment.user?.firstName} {assignment.user?.lastName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {assignment.user?.department}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">
                          {new Date(assignment.assignmentDate).toLocaleDateString('tr-TR')}
                        </p>
                        {assignment.returnDate && (
                          <p className="text-sm text-gray-500">
                            İade: {new Date(assignment.returnDate).toLocaleDateString('tr-TR')}
                          </p>
                        )}
                      </div>
                    </div>
                    {assignment.notes && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">{assignment.notes}</p>
                      </div>
                    )}
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Durum: {assignment.condition}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <ClockIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Henüz zimmet işlemi yapılmamış.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mevcut Durum</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <TagIcon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Durum</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${assetService.getStatusColor(asset.status)}`}>
                    {assetService.getStatusText(asset.status)}
                  </span>
                </div>
              </div>

              {activeAssignment && (
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Zimmetli Kullanıcı</p>
                    <p className="text-sm text-gray-500">
                      {activeAssignment.user?.firstName} {activeAssignment.user?.lastName}
                    </p>
                    <p className="text-xs text-gray-400">
                      {activeAssignment.user?.department}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <MapPinIcon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Konum</p>
                  <p className="text-sm text-gray-500">{asset.location || 'Belirtilmemiş'}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <CurrencyDollarIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Değer</p>
                  <p className="text-sm text-gray-500">₺{asset.purchasePrice.toLocaleString('tr-TR')}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <CalendarIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Kayıt Tarihi</p>
                  <p className="text-sm text-gray-500">
                    {new Date(asset.createdDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">İstatistikler</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Toplam Zimmet</span>
                <span className="text-sm font-medium text-gray-900">
                  {assignments.filter(a => a.type === 1).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Toplam İade</span>
                <span className="text-sm font-medium text-gray-900">
                  {assignments.filter(a => a.type === 2).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Aktif Zimmet</span>
                <span className="text-sm font-medium text-gray-900">
                  {activeAssignment ? '1' : '0'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Update Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Demirbaş Durumu Güncelle
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Yeni Durum
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(parseInt(e.target.value) as AssetStatus)}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={AssetStatus.Available}>Müsait</option>
                    <option value={AssetStatus.Assigned}>Zimmetli</option>
                    <option value={AssetStatus.Maintenance}>Bakımda</option>
                    <option value={AssetStatus.Damaged}>Arızalı</option>
                    <option value={AssetStatus.Disposed}>İmha Edildi</option>
                  </select>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowStatusModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    İptal
                  </button>
                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Güncelle
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetailPage; 