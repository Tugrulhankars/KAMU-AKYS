import React, { useState, useEffect } from 'react';
import { 
  ClipboardDocumentListIcon, 
  PlusIcon, 
  UserIcon,
  CubeIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import { assignmentService } from '../services/assignmentService';
import { assetService } from '../services/assetService';
import { userService } from '../services/userService';
import { Assignment, Asset, User, AssignmentType, CreateAssignmentRequest } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';

const AssignmentsPage: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState<AssignmentType | null>(null);
  const [filterUser, setFilterUser] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<CreateAssignmentRequest>({
    type: AssignmentType.Assignment,
    assignmentDate: new Date().toISOString().split('T')[0],
    returnDate: undefined,
    notes: '',
    condition: '',
    assetId: 0,
    userId: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assignmentsData, assetsData, usersData] = await Promise.all([
        assignmentService.getAssignments(),
        assetService.getAssets(),
        userService.getUsers()
      ]);
      setAssignments(assignmentsData);
      setAssets(assetsData);
      setUsers(usersData);
    } catch (err) {
      setError('Veri yüklenirken hata oluştu');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignmentService.createAssignment(formData);
      setShowCreateModal(false);
      resetForm();
      loadData();
    } catch (err) {
      setError('Zimmet işlemi oluşturulurken hata oluştu');
      console.error('Error creating assignment:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      type: AssignmentType.Assignment,
      assignmentDate: new Date().toISOString().split('T')[0],
      returnDate: undefined,
      notes: '',
      condition: '',
      assetId: 0,
      userId: 0
    });
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesType = filterType === null || assignment.type === filterType;
    const matchesUser = filterUser === null || assignment.userId === filterUser;
    return matchesType && matchesUser;
  });

  const availableAssets = assets.filter(asset => 
    formData.type === AssignmentType.Assignment 
      ? asset.status === 1 // Available
      : asset.status === 2 // Assigned
  );

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
            Zimmet İşlemleri
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Zimmet ve iade işlemlerini görüntüleyin ve yönetin
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Yeni İşlem
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İşlem Tipi
            </label>
            <select
              value={filterType || ''}
              onChange={(e) => setFilterType(e.target.value ? parseInt(e.target.value) as AssignmentType : null)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm İşlemler</option>
              <option value={AssignmentType.Assignment}>Zimmet</option>
              <option value={AssignmentType.Return}>İade</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kullanıcı
            </label>
            <select
              value={filterUser || ''}
              onChange={(e) => setFilterUser(e.target.value ? parseInt(e.target.value) : null)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tüm Kullanıcılar</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.firstName} {u.lastName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto rounded-xl shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 animate-fade-in">
          <table className="min-w-full divide-y divide-primary/20">
            <thead className="bg-gradient-to-r from-primary/80 to-secondary/80 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  İşlem Tipi
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Demirbaş
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Kullanıcı
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  Notlar
                </th>
                <th className="px-6 py-3 text-right text-xs font-bold uppercase tracking-wider border-b border-white/20 shadow-sm">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/80 divide-y divide-primary/10">
              {filteredAssignments.map((assignment, idx) => (
                <tr
                  key={assignment.id}
                  className={cn(
                    idx % 2 === 0 ? "bg-white/60" : "bg-primary/5",
                    "hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 transition-colors group"
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${assignmentService.getTypeColor(assignment.type)}`}>
                      {assignmentService.getTypeText(assignment.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <CubeIcon className="h-6 w-6 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {assignment.asset?.name || 'Bilinmiyor'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assignment.asset?.assetCode || 'Bilinmiyor'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {assignment.user?.firstName} {assignment.user?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {assignment.user?.department}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="text-sm text-gray-900">
                      {new Date(assignment.assignmentDate).toLocaleDateString('tr-TR')}
                    </div>
                    {assignment.returnDate && (
                      <div className="text-sm text-gray-500">
                        İade: {new Date(assignment.returnDate).toLocaleDateString('tr-TR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="flex items-center">
                      {assignment.type === AssignmentType.Assignment ? (
                        !assignment.returnDate ? (
                          <div className="flex items-center text-blue-600">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">Aktif</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-green-600">
                            <XCircleIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">İade Edildi</span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center text-green-600">
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                          <span className="text-sm">Tamamlandı</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 group-hover:text-primary font-medium border-b border-primary/10">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {assignment.notes || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right border-b border-primary/10">
                    <button className="inline-flex items-center px-3 py-1 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-md hover:scale-105 transition-transform">
                      Detay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredAssignments.length === 0 && (
          <div className="text-center py-12">
            <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">İşlem bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              Henüz zimmet işlemi yapılmamış.
            </p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Yeni Zimmet İşlemi
              </h3>
              <form onSubmit={handleCreateAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    İşlem Tipi *
                  </label>
                  <select
                    required
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: parseInt(e.target.value) as AssignmentType})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={AssignmentType.Assignment}>Zimmet</option>
                    <option value={AssignmentType.Return}>İade</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Demirbaş *
                  </label>
                  <select
                    required
                    value={formData.assetId}
                    onChange={(e) => setFormData({...formData, assetId: parseInt(e.target.value)})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Demirbaş Seçin</option>
                    {availableAssets.map(asset => (
                      <option key={asset.id} value={asset.id}>
                        {asset.name} - {asset.assetCode}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kullanıcı *
                  </label>
                  <select
                    required
                    value={formData.userId}
                    onChange={(e) => setFormData({...formData, userId: parseInt(e.target.value)})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Kullanıcı Seçin</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>
                        {u.firstName} {u.lastName} - {u.department}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {formData.type === AssignmentType.Assignment ? 'Zimmet Tarihi' : 'İade Tarihi'} *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.assignmentDate}
                    onChange={(e) => setFormData({...formData, assignmentDate: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Durum/Açıklama *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.condition}
                    onChange={(e) => setFormData({...formData, condition: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Örn: Yeni, İyi durumda, Hasarlı"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notlar
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ek açıklamalar..."
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
    </div>
  );
};

export default AssignmentsPage; 