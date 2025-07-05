import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserRole, Asset, Assignment, Category, AssetStatus } from '../types';
import { assetService } from '../services/assetService';
import { assignmentService } from '../services/assignmentService';
import { categoryService } from '../services/categoryService';
import Loading from '../components/common/Loading';
import {
  CubeIcon,
  RectangleStackIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssets: 0,
    availableAssets: 0,
    assignedAssets: 0,
    maintenanceAssets: 0,
    totalCategories: 0,
    recentAssignments: [] as Assignment[]
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [assets, categories, assignments] = await Promise.all([
        assetService.getAssets(),
        categoryService.getCategories(),
        assignmentService.getAssignments()
      ]);

      const availableAssets = assets.filter(a => a.status === AssetStatus.Available).length;
      const assignedAssets = assets.filter(a => a.status === AssetStatus.Assigned).length;
      const maintenanceAssets = assets.filter(a => a.status === AssetStatus.Maintenance).length;

      // Son 5 zimmet işlemi
      const recentAssignments = assignments
        .sort((a, b) => new Date(b.assignmentDate).getTime() - new Date(a.assignmentDate).getTime())
        .slice(0, 5);

      setStats({
        totalAssets: assets.length,
        availableAssets,
        assignedAssets,
        maintenanceAssets,
        totalCategories: categories.length,
        recentAssignments
      });
    } catch (error) {
      toast.error('Dashboard verileri yüklenirken hata oluştu');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading size="lg" text="Dashboard yükleniyor..." />;
  }

  const statCards = [
    {
      name: 'Toplam Demirbaş',
      value: stats.totalAssets,
      icon: CubeIcon,
      color: 'bg-blue-500',
      href: '/assets'
    },
    {
      name: 'Müsait Demirbaş',
      value: stats.availableAssets,
      icon: CubeIcon,
      color: 'bg-green-500',
      href: '/assets?status=available'
    },
    {
      name: 'Zimmetli Demirbaş',
      value: stats.assignedAssets,
      icon: ClipboardDocumentListIcon,
      color: 'bg-yellow-500',
      href: '/assets?status=assigned'
    },
    {
      name: 'Bakımdaki Demirbaş',
      value: stats.maintenanceAssets,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      href: '/assets?status=maintenance'
    }
  ];

  if (hasRole(UserRole.Admin)) {
    statCards.push({
      name: 'Toplam Kategori',
      value: stats.totalCategories,
      icon: RectangleStackIcon,
      color: 'bg-purple-500',
      href: '/categories'
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Hoş Geldiniz, {user?.firstName}!
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Demirbaş Takip Sistemi Dashboard
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <Link
            to="/assets"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <span className="mr-2">+</span> Yeni Demirbaş
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {statCards.map((card) => (
            <Link
              key={card.name}
              to={card.href}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <div>
                <div className={`absolute rounded-md p-3 ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{card.name}</p>
              </div>
              <div className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="mt-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Son Zimmet İşlemleri
            </h3>
            
            {stats.recentAssignments.length === 0 ? (
              <div className="text-center py-6">
                <ClipboardDocumentListIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz zimmet işlemi yok</h3>
                <p className="mt-1 text-sm text-gray-500">
                  İlk zimmet işleminizi başlatmak için demirbaş sayfasına gidin.
                </p>
                <div className="mt-6">
                  <Link
                    to="/assets"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <CubeIcon className="-ml-1 mr-2 h-5 w-5" />
                    Demirbaşları Görüntüle
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {stats.recentAssignments.map((assignment) => (
                    <li key={assignment.id} className="py-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            assignmentService.getTypeColor(assignment.type)
                          }`}>
                            {assignmentService.getTypeText(assignment.type)}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {assignment.asset?.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {assignment.user?.firstName} {assignment.user?.lastName}
                          </p>
                        </div>
                        <div className="flex-shrink-0 text-sm text-gray-500">
                          {new Date(assignment.assignmentDate).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Link
                    to="/assignments"
                    className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Tüm İşlemleri Görüntüle
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Hızlı İşlemler
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/assets"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
          >
            <div className="flex-shrink-0">
              <CubeIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Demirbaşları Görüntüle</p>
              <p className="text-sm text-gray-500 truncate">Tüm demirbaşları listele ve yönet</p>
            </div>
          </Link>

          <Link
            to="/assignments"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
          >
            <div className="flex-shrink-0">
              <ClipboardDocumentListIcon className="h-6 w-6 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Zimmet İşlemleri</p>
              <p className="text-sm text-gray-500 truncate">Zimmet ve iade işlemlerini yönet</p>
            </div>
          </Link>

          {hasRole(UserRole.Admin) && (
            <Link
              to="/users"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
            >
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Kullanıcı Yönetimi</p>
                <p className="text-sm text-gray-500 truncate">Kullanıcıları yönet ve roller ata</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 