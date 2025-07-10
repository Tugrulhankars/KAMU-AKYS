import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { householdsAPI, peopleAPI } from '../services/api'
import { Household, Person } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  Home, 
  MapPin, 
  Users, 
  Calendar, 
  ArrowLeft,
  Edit,
  UserPlus,
  Eye
} from 'lucide-react'

const HouseholdDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [household, setHousehold] = useState<Household | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHouseholdData = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const householdId = parseInt(id)
        
        const [householdResponse, peopleResponse] = await Promise.all([
          householdsAPI.getById(householdId),
          peopleAPI.getByHouseholdId(householdId)
        ])

        setHousehold(householdResponse.data)
        setPeople(peopleResponse.data)
      } catch (error) {
        setError('Hane bilgileri yüklenirken hata oluştu')
        console.error('Error fetching household:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchHouseholdData()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="Hane bilgileri yükleniyor..." />
        </div>
      </div>
    )
  }

  if (error || !household) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error || 'Hane bulunamadı'}</p>
          </div>
        </div>
      </div>
    )
  }

  const getAgeFromBirthDate = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/viewer/households"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Hane Detayları</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Household Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Home className="h-6 w-6 mr-2 text-blue-600" />
                  Hane Bilgileri
                </h2>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Hane ID</label>
                  <p className="mt-1 text-lg text-gray-900">#{household.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Kayıt Tarihi</label>
                  <p className="mt-1 text-lg text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(household.createdAt || '').toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-500">Adres</label>
                  <p className="mt-1 text-lg text-gray-900 flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-400 mt-0.5" />
                    {household.address}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">İlçe</label>
                  <p className="mt-1 text-lg text-gray-900">{household.districtName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">İl</label>
                  <p className="mt-1 text-lg text-gray-900">{household.cityName}</p>
                </div>
              </div>
            </div>

            {/* Household Members */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="h-6 w-6 mr-2 text-green-600" />
                  Hane Üyeleri ({people.length})
                </h2>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Yeni Üye Ekle
                </button>
              </div>

              {people.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Bu hanede henüz kayıtlı kişi bulunmuyor.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {people.map((person, index) => (
                    <div key={person.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {person.name} {person.surname}
                          </h3>
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Yaş:</span> {getAgeFromBirthDate(person.birthDate)}
                            </div>
                            <div>
                              <span className="font-medium">Cinsiyet:</span> {person.gender}
                            </div>
                            <div>
                              <span className="font-medium">Doğum Tarihi:</span> {new Date(person.birthDate).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Link
                            to={`/viewer/people/${person.id}`}
                            className="flex items-center px-3 py-1 text-sm text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Detay
                          </Link>
                          <button className="flex items-center px-3 py-1 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
                            <Edit className="h-4 w-4 mr-1" />
                            Düzenle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hane İstatistikleri
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Toplam Üye</span>
                  <span className="text-2xl font-bold text-blue-600">{people.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Erkek</span>
                  <span className="font-semibold">{people.filter(p => p.gender === 'Erkek').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Kadın</span>
                  <span className="font-semibold">{people.filter(p => p.gender === 'Kadın').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">18 Yaş Altı</span>
                  <span className="font-semibold">
                    {people.filter(p => getAgeFromBirthDate(p.birthDate) < 18).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">65 Yaş Üstü</span>
                  <span className="font-semibold">
                    {people.filter(p => getAgeFromBirthDate(p.birthDate) > 65).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                İşlemler
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Hane Bilgilerini Düzenle
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Yeni Üye Ekle
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  Rapor Görüntüle
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Son Değişiklikler
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3" />
                  <div>
                    <p className="text-gray-900">Hane kaydı oluşturuldu</p>
                    <p className="text-gray-500">{new Date(household.createdAt || '').toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                {people.length > 0 && (
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                    <div>
                      <p className="text-gray-900">Son üye eklendi</p>
                      <p className="text-gray-500">
                        {people[people.length - 1]?.name} {people[people.length - 1]?.surname}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HouseholdDetail 