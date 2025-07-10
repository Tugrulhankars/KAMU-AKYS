import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Eye, 
  BarChart3, 
  FileText, 
  Search,
  Users,
  Home as HomeIcon,
  Download,
  Filter,
  TrendingUp,
  MapPin
} from 'lucide-react'

const ViewerPanel: React.FC = () => {
  const viewerFeatures = [
    {
      title: 'Hane Bilgilerini Görüntüle',
      description: 'Kayıtlı hane bilgilerini listeleyin ve inceleyin',
      icon: HomeIcon,
      href: '/viewer/households',
      color: 'bg-blue-500 hover:bg-blue-600',
      actions: ['Liste Görünümü', 'Detay İnceleme', 'Filtreleme']
    },
    {
      title: 'Kişi Bilgilerini Görüntüle',
      description: 'Kayıtlı kişi bilgilerini listeleyin ve inceleyin',
      icon: Users,
      href: '/viewer/people',
      color: 'bg-green-500 hover:bg-green-600',
      actions: ['Kişi Listesi', 'Demografik Bilgiler', 'Arama Yapma']
    },
    {
      title: 'İstatistikler',
      description: 'Detaylı istatistikleri ve analizleri görüntüleyin',
      icon: BarChart3,
      href: '/statistics',
      color: 'bg-purple-500 hover:bg-purple-600',
      actions: ['Genel İstatistikler', 'Demografik Analiz', 'Grafikler']
    },
    {
      title: 'Raporlar',
      description: 'Hazır raporları görüntüleyin ve indirin',
      icon: FileText,
      href: '/viewer/reports',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      actions: ['Günlük Raporlar', 'Aylık Özetler', 'PDF İndirme']
    },
    {
      title: 'Gelişmiş Arama',
      description: 'Kayıtlar arasında detaylı arama yapın',
      icon: Search,
      href: '/viewer/search',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      actions: ['Çoklu Filtre', 'Konum Bazlı', 'Demografik Filtre']
    },
    {
      title: 'Veri Dışa Aktarımı',
      description: 'Görüntüleme yetkisi olan verileri dışa aktarın',
      icon: Download,
      href: '/viewer/export',
      color: 'bg-red-500 hover:bg-red-600',
      actions: ['CSV İndirme', 'Excel Export', 'PDF Rapor']
    }
  ]

  const currentStats = [
    { label: 'Görüntüleme Hakkım', value: 'Sınırsız', icon: Eye, color: 'text-blue-600' },
    { label: 'Bu Ay Görüntülenen', value: '1,247', icon: FileText, color: 'text-green-600' },
    { label: 'Favori Raporlar', value: '8', icon: BarChart3, color: 'text-purple-600' },
    { label: 'Son Güncelleme', value: '2 saat önce', icon: TrendingUp, color: 'text-orange-600' },
  ]

  const recentViews = [
    { action: 'Atatürk Mahallesi haneleri görüntülendi', details: '156 hane bilgisi', time: '15 dakika önce', type: 'household' },
    { action: 'Demografik rapor indirildi', details: 'Yaş grubu analizi PDF', time: '45 dakika önce', type: 'report' },
    { action: 'Kişi arama yapıldı', details: '23 kişi bulundu', time: '1 saat önce', type: 'search' },
    { action: 'Aylık istatistik görüntülendi', details: 'Ocak 2024 özeti', time: '3 saat önce', type: 'stats' },
  ]

  const favoriteReports = [
    { name: 'Demografik Analiz', type: 'İstatistik', lastUpdated: '2 saat önce' },
    { name: 'Hane Dağılım Raporu', type: 'Rapor', lastUpdated: '1 gün önce' },
    { name: 'Yaş Grubu Analizi', type: 'İstatistik', lastUpdated: '2 gün önce' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gözlemci Paneli</h1>
          <p className="mt-2 text-lg text-gray-600">
            Veri görüntüleme ve raporlama araçları
          </p>
        </div>

        {/* Current Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => (
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
          {/* Viewer Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Görüntüleme Araçları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewerFeatures.map((feature, index) => (
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
                    Görüntüle
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Access */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hızlı Erişim
              </h3>
              <div className="space-y-3">
                <Link
                  to="/viewer/households"
                  className="flex items-center w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <HomeIcon className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-blue-800">Hane Listesi</span>
                </Link>
                <Link
                  to="/viewer/people"
                  className="flex items-center w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                >
                  <Users className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-800">Kişi Listesi</span>
                </Link>
                <Link
                  to="/statistics"
                  className="flex items-center w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                >
                  <BarChart3 className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-800">İstatistikler</span>
                </Link>
                <Link
                  to="/viewer/search"
                  className="flex items-center w-full p-3 text-left bg-yellow-50 hover:bg-yellow-100 rounded-md transition-colors"
                >
                  <Search className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="text-yellow-800">Gelişmiş Arama</span>
                </Link>
              </div>
            </div>

            {/* Recent Views */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Son Görüntülenenler
              </h3>
              <div className="space-y-4">
                {recentViews.map((view, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      view.type === 'household' ? 'bg-blue-500' :
                      view.type === 'report' ? 'bg-green-500' :
                      view.type === 'search' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{view.action}</p>
                      <p className="text-xs text-gray-600">{view.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{view.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Favorite Reports */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Favori Raporlar
              </h3>
              <div className="space-y-3">
                {favoriteReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.name}</p>
                      <p className="text-xs text-gray-500">{report.type} • {report.lastUpdated}</p>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Erişim Bilgileri
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Görüntüleme Yetkisi</span>
                  <span className="text-sm font-medium text-green-600">Aktif</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rapor İndirme</span>
                  <span className="text-sm font-medium text-green-600">İzinli</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Veri Düzenleme</span>
                  <span className="text-sm font-medium text-red-600">Kısıtlı</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Yönetici Araçları</span>
                  <span className="text-sm font-medium text-red-600">Kısıtlı</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewerPanel 