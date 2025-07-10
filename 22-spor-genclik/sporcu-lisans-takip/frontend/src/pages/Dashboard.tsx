import React from 'react';
import { useQuery } from 'react-query';
import { 
  Users, 
  FileText, 
  Trophy, 
  Building, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  Award
} from 'lucide-react';
import { licenseAPI, athleteAPI, sportAPI, clubAPI } from '../services/api';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { formatDate } from '../utils/helpers';

const Dashboard: React.FC = () => {
  const { data: licenseStats } = useQuery('licenseStats', licenseAPI.getStatistics);
  const { data: athletes } = useQuery('athletes', athleteAPI.getAll);
  const { data: sports } = useQuery('sports', sportAPI.getAll);
  const { data: clubs } = useQuery('clubs', clubAPI.getAll);
  const { data: expiringLicenses } = useQuery('expiringLicenses', licenseAPI.getExpiringSoon);
  const { data: expiredLicenses } = useQuery('expiredLicenses', licenseAPI.getExpired);

  const stats = [
    {
      name: 'Toplam Sporcu',
      value: athletes?.length || 0,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Aktif Lisans',
      value: licenseStats?.activeLicenses || 0,
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Spor Dalı',
      value: sports?.length || 0,
      icon: Trophy,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      name: 'Kulüp',
      value: clubs?.length || 0,
      icon: Building,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  const alerts = [
    {
      name: 'Süresi Dolan Lisanslar',
      value: expiredLicenses?.length || 0,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      name: 'Yakında Süresi Dolacak',
      value: expiringLicenses?.length || 0,
      icon: Calendar,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Sporcu lisans takip sistemi genel durumu</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stat.value.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {alerts.map((alert) => (
          <Card key={alert.name} className="border-l-4 border-l-red-500">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${alert.bgColor} p-3 rounded-lg`}>
                  <alert.icon className={`h-6 w-6 ${alert.color}`} />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {alert.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {alert.value.toLocaleString()}
                    </dd>
                  </dl>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Licenses */}
        <Card>
          <CardHeader>
            <CardTitle>Son Lisanslar</CardTitle>
          </CardHeader>
          <CardContent>
            {expiringLicenses?.slice(0, 5).map((license) => (
              <div key={license.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {license.athleteName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {license.sportName} - {license.licenseTypeName}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">
                    {license.licenseNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDate(license.expiryDate)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-sm font-medium">Yeni Sporcu Ekle</span>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-sm font-medium">Lisans Oluştur</span>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Award className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-sm font-medium">Spor Dalı Ekle</span>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <Building className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-sm font-medium">Kulüp Ekle</span>
                </div>
                <TrendingUp className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard; 