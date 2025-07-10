import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { statisticsAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  Users, 
  Home as HomeIcon, 
  MapPin, 
  Building2, 
  BarChart3, 
  TrendingUp,
  Eye,
  Plus,
  UserPlus
} from 'lucide-react'

interface OverallStats {
  totalPeople: number
  totalHouseholds: number
  totalCities: number
  totalDistricts: number
  avgPeoplePerHousehold: number
}

const Dashboard: React.FC = () => {
  const { user, isAdmin, isOfficer } = useAuth()
  const [stats, setStats] = useState<OverallStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        const response = await statisticsAPI.getOverall()
        setStats(response.data)
      } catch (error) {
        setError('İstatistikler yüklenirken hata oluştu')
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  const quickActions = [
    {
      title: 'Yeni Hane Ekle',
      description: 'Yeni bir hane bilgisi ekleyin',
      icon: HomeIcon,
      href: '/officer/households/new',
      color: 'bg-blue-500 hover:bg-blue-600',
      show: isOfficer || isAdmin,
    },
    {
      title: 'Yeni Kişi Ekle',
      description: 'Mevcut haneye kişi ekleyin',
      icon: UserPlus,
      href: '/officer/people/new',
      color: 'bg-green-500 hover:bg-green-600',
      show: isOfficer || isAdmin,
    },
    {
      title: 'İstatistikleri Görüntüle',
      description: 'Detaylı raporları inceleyin',
      icon: BarChart3,
      href: '/statistics',
      color: 'bg-purple-500 hover:bg-purple-600',
      show: true,
    },
    {
      title: 'Tüm Haneleri Listele',
      description: 'Hane kayıtlarını görüntüleyin',
      icon: Eye,
      href: '/viewer/households',
      color: 'bg-indigo-500 hover:bg-indigo-600',
      show: true,
    },
  ]

  const roleBasedContent = {
    Admin: {
      title: 'Admin Paneli',
      description: 'Sistem yönetimi ve tüm verilere erişim',
      features: [
        'Kullanıcı yönetimi',
        'Sistem ayarları',
        'Tüm verilere erişim',
        'Kapsamlı raporlar',
      ],
    },
    Görevli: {
      title: 'Görevli Paneli',
      description: 'Veri girişi ve hane yönetimi',
      features: [
        'Hane bilgisi girişi',
        'Kişi bilgisi girişi',
        'Mevcut kayıtları düzenleme',
        'Bölgesel raporlar',
      ],
    },
    Gözlemci: {
      title: 'Gözlemci Paneli',
      description: 'Veri görüntüleme ve raporlama',
      features: [
        'Hane bilgilerini görüntüleme',
        'Kişi bilgilerini görüntüleme',
        'İstatistikleri inceleme',
        'Rapor görüntüleme',
      ],
    },
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="Dashboard yükleniyor..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hoş Geldiniz, {user?.username}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {roleBasedContent[user?.role as keyof typeof roleBasedContent]?.description || 'Dashboard'}
          </p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Users className="h-12 w-12 text-blue-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalPeople.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Toplam Kişi</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <HomeIcon className="h-12 w-12 text-green-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalHouseholds.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Toplam Hane</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Building2 className="h-12 w-12 text-purple-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalCities.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Toplam İl</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <MapPin className="h-12 w-12 text-orange-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalDistricts.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Toplam İlçe</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <TrendingUp className="h-12 w-12 text-indigo-500" />
                <div className="ml-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.avgPeoplePerHousehold.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">Ortalama Kişi/Hane</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Hızlı İşlemler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions
                .filter(action => action.show)
                .map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className={`${action.color} text-white rounded-lg p-6 transition-colors hover:shadow-lg`}
                  >
                    <div className="flex items-center">
                      <action.icon className="h-8 w-8" />
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{action.title}</h3>
                        <p className="text-sm opacity-90">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Role Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {roleBasedContent[user?.role as keyof typeof roleBasedContent]?.title}
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600 mb-4">
                {roleBasedContent[user?.role as keyof typeof roleBasedContent]?.description}
              </p>
              <ul className="space-y-2">
                {roleBasedContent[user?.role as keyof typeof roleBasedContent]?.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Activity */}
            <div className="mt-6 bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Son Aktiviteler
              </h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                  <span className="text-gray-600">Sisteme giriş yapıldı</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                  <span className="text-gray-600">Dashboard yüklendi</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  <span className="text-gray-600">İstatistikler görüntülendi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 