import React, { useState, useEffect } from 'react'
import { statisticsAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  Users, 
  Home as HomeIcon, 
  MapPin, 
  Building2, 
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson
} from 'lucide-react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface OverallStats {
  totalPeople: number
  totalHouseholds: number
  totalCities: number
  totalDistricts: number
  avgPeoplePerHousehold: number
}

interface GenelStats {
  toplamNufus: number
  toplamHanehalkı: number
  toplamSehir: number
  toplamIlce: number
}

interface SehirDagilimi {
  sehirAdi: string
  nufusSayisi: number
  hanehalkiSayisi: number
}

interface YasDagilimi {
  yasAraligi: string
  kisiSayisi: number
}

interface CinsiyetDagilimi {
  cinsiyet: string
  kisiSayisi: number
}

interface Demographics {
  ageGroups: Array<{ ageGroup: string; count: number }>
  genderDistribution: Array<{ gender: string; count: number }>
  cityDistribution: Array<{ cityName: string; count: number }>
  districtDistribution: Array<{ districtName: string; count: number }>
}

const Statistics: React.FC = () => {
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null)
  const [genelStats, setGenelStats] = useState<GenelStats | null>(null)
  const [sehirDagilimi, setSehirDagilimi] = useState<SehirDagilimi[]>([])
  const [yasDagilimi, setYasDagilimi] = useState<YasDagilimi[]>([])
  const [cinsiyetDagilimi, setCinsiyetDagilimi] = useState<CinsiyetDagilimi[]>([])
  const [demographics, setDemographics] = useState<Demographics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'demographics' | 'growth'>('overview')
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    const fetchAllStats = async () => {
      try {
        setIsLoading(true)
        const [
          overallResponse, 
          demographicsResponse,
          genelResponse,
          sehirResponse,
          yasResponse,
          cinsiyetResponse
        ] = await Promise.all([
          statisticsAPI.getOverall(),
          statisticsAPI.getDemographics(),
          statisticsAPI.getGenel(),
          statisticsAPI.getSehirDagilimi(),
          statisticsAPI.getYasDagilimi(),
          statisticsAPI.getCinsiyetDagilimi(),
        ])
        
        setOverallStats(overallResponse.data)
        setDemographics(demographicsResponse.data)
        setGenelStats(genelResponse.data)
        setSehirDagilimi(sehirResponse.data)
        setYasDagilimi(yasResponse.data)
        setCinsiyetDagilimi(cinsiyetResponse.data)
      } catch (error) {
        setError('İstatistikler yüklenirken hata oluştu')
        console.error('Error fetching statistics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAllStats()
  }, [])

  const handleExport = async (type: 'genel' | 'sehir' | 'yas' | 'cinsiyet', format: 'csv' | 'json' | 'report') => {
    try {
      setIsExporting(true)
      let response
      let filename
      
      if (format === 'report') {
        response = await statisticsAPI.exportToReport()
        filename = `nufus_sayim_rapor_${new Date().toISOString().split('T')[0]}.txt`
      } else if (format === 'csv') {
        response = await statisticsAPI.exportToCsv(type)
        filename = `nufus_sayim_${type}_${new Date().toISOString().split('T')[0]}.csv`
      } else {
        response = await statisticsAPI.exportToJson(type)
        filename = `nufus_sayim_${type}_${new Date().toISOString().split('T')[0]}.json`
      }

      // Blob'u indirme için hazırla
      const blob = new Blob([response.data], { 
        type: format === 'csv' ? 'text/csv' : format === 'json' ? 'application/json' : 'text/plain' 
      })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Dışa aktarma sırasında hata oluştu')
    } finally {
      setIsExporting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="İstatistikler yükleniyor..." />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'overview', name: 'Genel Bakış', icon: BarChart3 },
    { id: 'demographics', name: 'Demografik Analiz', icon: PieChart },
    { id: 'growth', name: 'Büyüme Analizi', icon: TrendingUp },
  ]

  // Şehir koordinatları (gerçek veriler ile güncellenecek)
  const cityCoords = sehirDagilimi.slice(0, 10).map((sehir, index) => ({
    name: sehir.sehirAdi,
    lat: 39.9334 + (index * 0.5), // Örnek koordinatlar
    lng: 32.8597 + (index * 0.5),
    count: sehir.nufusSayisi
  }))

  // Yaş/cinsiyet dağılımı için grafik verisi
  const ageGenderData = {
    labels: yasDagilimi.map(item => item.yasAraligi),
    datasets: [
      {
        label: 'Kişi Sayısı',
        data: yasDagilimi.map(item => item.kisiSayisi),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
      },
    ],
  }

  // Cinsiyet dağılımı için grafik verisi
  const genderData = {
    labels: cinsiyetDagilimi.map(item => item.cinsiyet),
    datasets: [
      {
        label: 'Kişi Sayısı',
        data: cinsiyetDagilimi.map(item => item.kisiSayisi),
        backgroundColor: ['rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)'],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">İstatistikler ve Raporlar</h1>
            <p className="mt-2 text-lg text-gray-600">
              Nüfus sayım verilerinin detaylı analizi ve raporları
            </p>
          </div>
          
          {/* Dışa Aktarma Butonları */}
          <div className="flex space-x-2">
            <div className="relative inline-block text-left">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={isExporting}
              >
                <Download className="h-4 w-4 mr-2" />
                {isExporting ? 'Dışa Aktarılıyor...' : 'Dışa Aktar'}
              </button>
            </div>
            
            <button
              onClick={() => handleExport('genel', 'csv')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={isExporting}
            >
              <FileSpreadsheet className="h-4 w-4 mr-1" />
              CSV
            </button>
            
            <button
              onClick={() => handleExport('genel', 'json')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={isExporting}
            >
              <FileJson className="h-4 w-4 mr-1" />
              JSON
            </button>
            
            <button
              onClick={() => handleExport('genel', 'report')}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              disabled={isExporting}
            >
              <FileText className="h-4 w-4 mr-1" />
              Rapor
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && genelStats && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Users className="h-12 w-12 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">
                      {genelStats.toplamNufus.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Toplam Kişi</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <HomeIcon className="h-12 w-12 text-green-500" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">
                      {genelStats.toplamHanehalkı.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Toplam Hane</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <Building2 className="h-12 w-12 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">
                      {genelStats.toplamSehir.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Toplam İl</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <MapPin className="h-12 w-12 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-3xl font-bold text-gray-900">
                      {genelStats.toplamIlce.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Toplam İlçe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Şehir Dağılımı Tablosu */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-900">Şehir Dağılımı</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExport('sehir', 'csv')}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={isExporting}
                  >
                    CSV İndir
                  </button>
                  <button
                    onClick={() => handleExport('sehir', 'json')}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    disabled={isExporting}
                  >
                    JSON İndir
                  </button>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Şehir
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nüfus
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hanehalkı
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sehirDagilimi.map((sehir, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {sehir.sehirAdi}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sehir.nufusSayisi.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {sehir.hanehalkiSayisi.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Harita */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Coğrafi Dağılım</h3>
              </div>
              <div className="px-6 py-4">
                <div style={{ height: '400px' }}>
                  <MapContainer center={[39.9334, 32.8597]} zoom={6} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {cityCoords.map((city, index) => (
                      <Marker key={index} position={[city.lat, city.lng]}>
                        <Popup>
                          <div>
                            <strong>{city.name}</strong><br />
                            Nüfus: {city.count.toLocaleString()}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demographics Tab */}
        {activeTab === 'demographics' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Yaş Dağılımı */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Yaş Dağılımı</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport('yas', 'csv')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                      disabled={isExporting}
                    >
                      CSV İndir
                    </button>
                    <button
                      onClick={() => handleExport('yas', 'json')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                      disabled={isExporting}
                    >
                      JSON İndir
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <Bar data={ageGenderData} />
                </div>
              </div>

              {/* Cinsiyet Dağılımı */}
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Cinsiyet Dağılımı</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport('cinsiyet', 'csv')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                      disabled={isExporting}
                    >
                      CSV İndir
                    </button>
                    <button
                      onClick={() => handleExport('cinsiyet', 'json')}
                      className="text-sm text-gray-600 hover:text-gray-900"
                      disabled={isExporting}
                    >
                      JSON İndir
                    </button>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <Bar data={genderData} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Growth Tab */}
        {activeTab === 'growth' && (
          <div>
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Büyüme Analizi</h3>
              </div>
              <div className="px-6 py-4">
                <p className="text-gray-600">Büyüme analizi verileri yakında eklenecek...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Statistics 