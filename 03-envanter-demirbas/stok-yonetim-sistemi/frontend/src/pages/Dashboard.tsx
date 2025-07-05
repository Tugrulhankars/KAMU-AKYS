import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardApi, productsApi } from '../services/api';
import { DashboardStats, Product, StockTransaction } from '../types';
import {
  CubeIcon,
  TagIcon,
  UsersIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';
import Loading from '../components/common/Loading';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [lowStockProducts, setLowStockProducts] = useState<Product[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<StockTransaction[]>([]);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        const [statsResponse, lowStockResponse, recentResponse, productsResponse] = await Promise.all([
          dashboardApi.getDashboardStats(),
          dashboardApi.getLowStockAlerts(),
          dashboardApi.getRecentActivities(10),
          productsApi.getProducts({ page: 1, pageSize: 5 })
        ]);

        if (statsResponse.success) {
          setStats(statsResponse.data ?? null);
        }
        
        if (lowStockResponse.success) {
          setLowStockProducts(lowStockResponse.data || []);
        }
        
        if (recentResponse.success) {
          setRecentTransactions(recentResponse.data || []);
        }

        if (productsResponse.success && productsResponse.data) {
          setRecentProducts(productsResponse.data.items);
        }
      } catch (error) {
        console.error('Dashboard verileri yüklenirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <Loading size="lg" text="Dashboard yükleniyor..." />;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Günaydın';
    if (hour < 18) return 'İyi günler';
    return 'İyi akşamlar';
  };

  const getTransactionTypeIcon = (type: any) => {
    switch (type) {
      case 1: // Giriş
        return <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />;
      case 2: // Çıkış
        return <ArrowTrendingDownIcon className="h-4 w-4 text-red-600" />;
      default:
        return <ChartBarIcon className="h-4 w-4 text-blue-600" />;
    }
  };

  const getTransactionTypeName = (type: any) => {
    switch (type) {
      case 1:
        return 'Giriş';
      case 2:
        return 'Çıkış';
      default:
        return 'Bilinmiyor';
    }
  };

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {getGreeting()}, {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-gray-600 mt-2">
          Bugün {new Date().toLocaleDateString('tr-TR', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric',
            weekday: 'long'
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CubeIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalProducts || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TagIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Kategori</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalCategories || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Kritik Stok</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.criticalStockCount || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bugünkü İşlemler</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.todayTransactions || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Critical Stock Alert */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Kritik Stok Uyarıları</h2>
              <Link 
                to="/products?filter=critical" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Tümünü gör
              </Link>
            </div>
          </div>
          <div className="p-6">
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8">
                <ExclamationTriangleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Kritik stok yok</h3>
                <p className="mt-1 text-sm text-gray-500">Tüm ürünlerin stok seviyeleri yeterli.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.categoryName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">
                        {product.currentStock} / {product.minStockLevel}
                      </p>
                      <p className="text-xs text-gray-500">{product.unit}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Recent Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Son Eklenen Ürünler</h2>
              <Link to="/products" className="text-sm text-blue-600 hover:text-blue-800">Tümünü gör</Link>
            </div>
          </div>
          <div className="p-6">
            {recentProducts.length === 0 ? (
              <div className="text-center py-8">
                <CubeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Ürün bulunamadı</h3>
                <p className="mt-1 text-sm text-gray-500">Henüz hiç ürün eklenmemiş.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                      <p className="text-xs text-gray-600">{product.categoryName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-blue-800">{product.currentStock} {product.unit}</p>
                      {product.unitPrice !== undefined && (
                        <p className="text-xs text-gray-500">₺{product.unitPrice}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Son İşlemler</h2>
              <Link 
                to="/transactions" 
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Tümünü gör
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentTransactions.length === 0 ? (
              <div className="text-center py-8">
                <ChartBarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">İşlem yok</h3>
                <p className="mt-1 text-sm text-gray-500">Henüz stok işlemi yapılmamış.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {getTransactionTypeIcon(transaction.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {transaction.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {getTransactionTypeName(transaction.type)} - {transaction.quantity} adet
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.transactionDate).toLocaleDateString('tr-TR')}
                      </p>
                      <p className="text-xs text-gray-400">{transaction.userName}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/products"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <CubeIcon className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Ürün Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Ürünleri görüntüle ve yönet</p>
          </Link>

          <Link
            to="/categories"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <TagIcon className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">Kategori Yönetimi</h3>
            <p className="text-sm text-gray-600 mt-1">Kategorileri düzenle</p>
          </Link>

          <Link
            to="/transactions"
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <ChartBarIcon className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Stok İşlemleri</h3>
            <p className="text-sm text-gray-600 mt-1">Giriş/çıkış işlemlerini yönet</p>
          </Link>

          {user?.role === 1 && ( // Admin
            <Link
              to="/users"
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <UsersIcon className="h-8 w-8 text-orange-600 mb-2" />
              <h3 className="font-medium text-gray-900">Kullanıcı Yönetimi</h3>
              <p className="text-sm text-gray-600 mt-1">Sistem kullanıcılarını yönet</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 