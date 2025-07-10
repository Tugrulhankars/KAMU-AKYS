import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Settings, 
  Database, 
  Shield, 
  BarChart3, 
  FileText,
  UserPlus,
  Download,
  Upload,
  Activity,
  MapPin,
  Building2,
  Eye
} from 'lucide-react'

const AdminPanel: React.FC = () => {
  const adminFeatures = [
    {
      title: 'Şehir ve İlçe Yönetimi',
      description: 'Şehirler ve ilçeleri yönetin, coğrafi yapıyı düzenleyin',
      icon: MapPin,
      href: '/admin/cities',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      actions: ['Şehir Listele', 'Yeni Şehir Ekle', 'İlçe Yönetimi']
    },
    {
      title: 'Kullanıcı Yönetimi',
      description: 'Sistem kullanıcılarını yönetin, roller atayın',
      icon: Users,
      href: '/admin/users',
      color: 'bg-blue-500 hover:bg-blue-600',
      actions: ['Kullanıcı Listele', 'Yeni Kullanıcı', 'Rol Yönetimi']
    },
    {
      title: 'Audit Log ve İzleme',
      description: 'Sistem aktivitelerini izleyin ve audit kayıtlarını görüntüleyin',
      icon: Eye,
      href: '/admin/audit-log',
      color: 'bg-teal-500 hover:bg-teal-600',
      actions: ['Aktivite Logları', 'Kullanıcı İzleme', 'Güvenlik Olayları']
    },
    {
      title: 'Veri Yönetimi',
      description: 'Tüm sistem verilerini yönetin ve düzenleyin',
      icon: Database,
      href: '/admin/data',
      color: 'bg-green-500 hover:bg-green-600',
      actions: ['Veri Görüntüle', 'Toplu İşlemler', 'Veri Temizliği']
    },
    {
      title: 'Sistem Ayarları',
      description: 'Sistem konfigürasyonu ve ayarları',
      icon: Settings,
      href: '/admin/settings',
      color: 'bg-purple-500 hover:bg-purple-600',
      actions: ['Genel Ayarlar', 'Güvenlik', 'Entegrasyonlar']
    },
    {
      title: 'Güvenlik ve Yetkilendirme',
      description: 'Güvenlik politikaları ve erişim kontrolü',
      icon: Shield,
      href: '/admin/security',
      color: 'bg-red-500 hover:bg-red-600',
      actions: ['Erişim Logları', 'Güvenlik Politikaları', 'Yetki Matrisi']
    },
    {
      title: 'Raporlar ve Analitik',
      description: 'Detaylı raporlar ve sistem analitiği',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      actions: ['Sistem Raporları', 'Kullanım Analizi', 'Performans Metrikleri']
    },
    {
      title: 'Veri İçe/Dışa Aktarım',
      description: 'Toplu veri işlemleri ve yedekleme',
      icon: FileText,
      href: '/admin/import-export',
      color: 'bg-orange-500 hover:bg-orange-600',
      actions: ['Veri İçe Aktarım', 'Veri Dışa Aktarım', 'Yedekleme']
    }
  ]

  const quickStats = [
    { label: 'Toplam Kullanıcı', value: '15', icon: Users, color: 'text-blue-600' },
    { label: 'Aktif Oturumlar', value: '8', icon: Activity, color: 'text-green-600' },
    { label: 'Sistem Durumu', value: 'Çevrimiçi', icon: Shield, color: 'text-green-600' },
    { label: 'Son Yedekleme', value: '2 saat önce', icon: Database, color: 'text-purple-600' },
  ]

  const recentActivities = [
    { action: 'Yeni kullanıcı kaydı', user: 'sistem', time: '5 dakika önce', type: 'user' },
    { action: 'Veri yedekleme tamamlandı', user: 'sistem', time: '2 saat önce', type: 'system' },
    { action: 'Güvenlik güncellemesi', user: 'admin', time: '1 gün önce', type: 'security' },
    { action: 'Toplu veri importu', user: 'admin', time: '2 gün önce', type: 'data' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
          <p className="mt-2 text-lg text-gray-600">
            Sistem yönetimi ve administrasyon araçları
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Admin Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Yönetim Araçları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {adminFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg ${feature.color} text-white`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {feature.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-sm text-gray-500">
                        <div className="w-2 h-2 bg-gray-300 rounded-full mr-2" />
                        {action}
                      </div>
                    ))}
                  </div>
                  <Link
                    to={feature.href}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                  >
                    Yönet
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hızlı İşlemler
              </h3>
              <div className="space-y-3">
                <Link
                  to="/admin/users/new"
                  className="flex items-center w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <UserPlus className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-blue-800">Yeni Kullanıcı Ekle</span>
                </Link>
                <Link
                  to="/admin/audit-log"
                  className="flex items-center w-full p-3 text-left bg-teal-50 hover:bg-teal-100 rounded-md transition-colors"
                >
                  <Eye className="h-5 w-5 text-teal-600 mr-3" />
                  <span className="text-teal-800">Audit Log Görüntüle</span>
                </Link>
                <button className="flex items-center w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-md transition-colors">
                  <Download className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-800">Veri Yedekle</span>
                </button>
                <button className="flex items-center w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-md transition-colors">
                  <Upload className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-800">Veri İçe Aktar</span>
                </button>
                <Link
                  to="/admin/districts"
                  className="flex items-center w-full p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors"
                >
                  <Building2 className="h-5 w-5 text-emerald-600 mr-3" />
                  <span className="text-emerald-800">İlçe Yönetimi</span>
                </Link>
                <Link
                  to="/statistics"
                  className="flex items-center w-full p-3 text-left bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                >
                  <BarChart3 className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="text-indigo-800">Detaylı Raporlar</span>
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Son Aktiviteler
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'system' ? 'bg-green-500' :
                      activity.type === 'security' ? 'bg-red-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Sistem Sağlığı
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CPU Kullanımı</span>
                  <span className="text-sm font-medium text-green-600">%23</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '23%' }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bellek Kullanımı</span>
                  <span className="text-sm font-medium text-yellow-600">%67</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '67%' }} />
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Disk Kullanımı</span>
                  <span className="text-sm font-medium text-blue-600">%45</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel 