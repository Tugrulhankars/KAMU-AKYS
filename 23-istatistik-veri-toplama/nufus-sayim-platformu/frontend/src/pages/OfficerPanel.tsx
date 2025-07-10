import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Users, 
  Home as HomeIcon, 
  UserPlus, 
  Search,
  Plus,
  Edit,
  Eye,
  FileText,
  Map
} from 'lucide-react'

const OfficerPanel: React.FC = () => {
  const officerFeatures = [
    {
      title: 'Yeni Hane Ekle',
      description: 'Yeni hane bilgilerini sisteme ekleyin',
      icon: Plus,
      href: '/officer/households/new',
      color: 'bg-blue-500 hover:bg-blue-600',
      actions: ['Adres Bilgileri', 'Hane Detayları', 'İlk Kayıt']
    },
    {
      title: 'Hane Yönetimi',
      description: 'Mevcut hane bilgilerini görüntüleyin ve düzenleyin',
      icon: HomeIcon,
      href: '/officer/households',
      color: 'bg-green-500 hover:bg-green-600',
      actions: ['Liste Görünümü', 'Düzenleme', 'Detaylar']
    },
    {
      title: 'Kişi Bilgisi Ekle',
      description: 'Hane üyelerinin bilgilerini ekleyin',
      icon: UserPlus,
      href: '/officer/people/new',
      color: 'bg-purple-500 hover:bg-purple-600',
      actions: ['Kişisel Bilgiler', 'Demografik Veriler', 'Hane İlişkisi']
    },
    {
      title: 'Kişi Yönetimi',
      description: 'Kayıtlı kişilerin bilgilerini yönetin',
      icon: Users,
      href: '/officer/people',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      actions: ['Kişi Listesi', 'Bilgi Güncelleme', 'Silme İşlemleri']
    },
    {
      title: 'Veri Arama',
      description: 'Kayıtlar arasında arama yapın',
      icon: Search,
      href: '/officer/search',
      color: 'bg-yellow-500 hover:bg-yellow-600',
      actions: ['Hane Arama', 'Kişi Arama', 'Gelişmiş Filtreler']
    },
    {
      title: 'Raporlarım',
      description: 'Kendi bölgenizin raporlarını görüntüleyin',
      icon: FileText,
      href: '/officer/reports',
      color: 'bg-red-500 hover:bg-red-600',
      actions: ['Günlük Rapor', 'Haftalık Özet', 'Bölgesel İstatistik']
    }
  ]

  const todayStats = [
    { label: 'Bugün Eklenen Hane', value: '12', icon: HomeIcon, color: 'text-blue-600' },
    { label: 'Bugün Eklenen Kişi', value: '34', icon: Users, color: 'text-green-600' },
    { label: 'Düzenlenen Kayıt', value: '8', icon: Edit, color: 'text-purple-600' },
    { label: 'Toplam Sorumlu Alan', value: '3 mahalle', icon: Map, color: 'text-orange-600' },
  ]

  const recentWork = [
    { action: 'Yeni hane kaydı eklendi', details: 'Atatürk Mahallesi, Sokak No: 15', time: '10 dakika önce', type: 'household' },
    { action: '3 kişi bilgisi güncellendi', details: 'Cumhuriyet Mahallesi haneleri', time: '25 dakika önce', type: 'person' },
    { action: 'Hane adresi düzeltildi', details: 'Fatih Mahallesi, Apartman değişikliği', time: '1 saat önce', type: 'edit' },
    { action: '2 yeni kişi eklendi', details: 'Mehmet Bey ailesine 2 yeni üye', time: '2 saat önce', type: 'person' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Görevli Paneli</h1>
          <p className="mt-2 text-lg text-gray-600">
            Nüfus veri girişi ve hane yönetimi araçları
          </p>
        </div>

        {/* Today's Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {todayStats.map((stat, index) => (
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
          {/* Officer Features */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Veri Giriş Araçları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {officerFeatures.map((feature, index) => (
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
                    Başlat
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
                  to="/officer/households/new"
                  className="flex items-center w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                >
                  <Plus className="h-5 w-5 text-blue-600 mr-3" />
                  <span className="text-blue-800">Yeni Hane Ekle</span>
                </Link>
                <Link
                  to="/officer/people/new"
                  className="flex items-center w-full p-3 text-left bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                >
                  <UserPlus className="h-5 w-5 text-green-600 mr-3" />
                  <span className="text-green-800">Yeni Kişi Ekle</span>
                </Link>
                <Link
                  to="/officer/search"
                  className="flex items-center w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-md transition-colors"
                >
                  <Search className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="text-purple-800">Kayıt Ara</span>
                </Link>
                <Link
                  to="/officer/reports"
                  className="flex items-center w-full p-3 text-left bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
                >
                  <FileText className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="text-orange-800">Raporları Görüntüle</span>
                </Link>
              </div>
            </div>

            {/* Recent Work */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Son Çalışmalarım
              </h3>
              <div className="space-y-4">
                {recentWork.map((work, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                      work.type === 'household' ? 'bg-blue-500' :
                      work.type === 'person' ? 'bg-green-500' :
                      work.type === 'edit' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{work.action}</p>
                      <p className="text-xs text-gray-600">{work.details}</p>
                      <p className="text-xs text-gray-500 mt-1">{work.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Work Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Çalışma İlerlemesi
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bu Hafta Tamamlanan</span>
                    <span className="font-medium">78/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bu Ay Hedef</span>
                    <span className="font-medium">234/400</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '58%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Veri Kalitesi</span>
                    <span className="font-medium text-green-600">%92</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OfficerPanel 