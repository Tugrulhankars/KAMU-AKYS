import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Calendar, 
  Activity, 
  FileText, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock
} from 'lucide-react';
import { apiService } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatCurrency, formatNumber } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { data: campStats } = useQuery({
    queryKey: ['campStatistics'],
    queryFn: apiService.getCampStatistics,
  });

  const { data: registrationStats } = useQuery({
    queryKey: ['registrationStatistics'],
    queryFn: apiService.getRegistrationStatistics,
  });

  const stats = [
    {
      name: 'Toplam Kamp',
      value: campStats?.totalCamps || 0,
      change: '+12%',
      changeType: 'increase',
      icon: Calendar,
    },
    {
      name: 'Aktif Kamp',
      value: campStats?.activeCamps || 0,
      change: '+5%',
      changeType: 'increase',
      icon: Activity,
    },
    {
      name: 'Toplam Kayıt',
      value: registrationStats?.totalRegistrations || 0,
      change: '+8%',
      changeType: 'increase',
      icon: FileText,
    },
    {
      name: 'Toplam Gelir',
      value: formatCurrency(registrationStats?.totalRevenue || 0),
      change: '+15%',
      changeType: 'increase',
      icon: DollarSign,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      message: 'Yeni kamp kaydı oluşturuldu',
      time: '2 saat önce',
      user: 'Ahmet Yılmaz',
    },
    {
      id: 2,
      type: 'camp',
      message: 'Yeni kamp eklendi',
      time: '4 saat önce',
      user: 'Mehmet Demir',
    },
    {
      id: 3,
      type: 'participant',
      message: 'Yeni katılımcı kaydı',
      time: '6 saat önce',
      user: 'Ayşe Kaya',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Gençlik kampı yönetim sistemi genel bakış</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="ml-4 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center">
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 text-success-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-danger-600" />
                    )}
                    <span
                      className={`ml-2 text-sm font-medium ${
                        stat.changeType === 'increase'
                          ? 'text-success-600'
                          : 'text-danger-600'
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Son Aktiviteler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <Clock className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.message}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-primary-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Yeni Kamp</p>
                    <p className="text-xs text-gray-500">Kamp ekle</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-success-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Katılımcı</p>
                    <p className="text-xs text-gray-500">Kayıt ekle</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Activity className="h-6 w-6 text-warning-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Aktivite</p>
                    <p className="text-xs text-gray-500">Aktivite ekle</p>
                  </div>
                </div>
              </button>
              
              <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <FileText className="h-6 w-6 text-danger-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">Kayıt</p>
                    <p className="text-xs text-gray-500">Kayıt oluştur</p>
                  </div>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 