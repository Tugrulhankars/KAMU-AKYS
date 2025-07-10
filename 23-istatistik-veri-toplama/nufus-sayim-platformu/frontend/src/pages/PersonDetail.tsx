import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { peopleAPI, householdsAPI } from '../services/api'
import { Person, Household } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'
import { 
  User, 
  Calendar, 
  MapPin, 
  Home,
  ArrowLeft,
  Edit,
  Eye
} from 'lucide-react'

const PersonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [person, setPerson] = useState<Person | null>(null)
  const [household, setHousehold] = useState<Household | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPersonData = async () => {
      if (!id) return

      try {
        setIsLoading(true)
        const personId = parseInt(id)
        
        const personResponse = await peopleAPI.getById(personId)
        const personData = personResponse.data
        setPerson(personData)

        // Fetch household info
        if (personData.householdId) {
          const householdResponse = await householdsAPI.getById(personData.householdId)
          setHousehold(householdResponse.data)
        }
      } catch (error) {
        setError('Kişi bilgileri yüklenirken hata oluştu')
        console.error('Error fetching person:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPersonData()
  }, [id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="Kişi bilgileri yükleniyor..." />
        </div>
      </div>
    )
  }

  if (error || !person) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error || 'Kişi bulunamadı'}</p>
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

  const getAgeGroup = (age: number) => {
    if (age < 18) return '18 Yaş Altı'
    if (age <= 30) return '18-30 Yaş'
    if (age <= 50) return '31-50 Yaş'
    if (age <= 65) return '51-65 Yaş'
    return '65 Yaş Üstü'
  }

  const age = getAgeFromBirthDate(person.birthDate)

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link
              to="/viewer/people"
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Geri Dön
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Kişi Detayları</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Person Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Kişisel Bilgiler
                </h2>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-500">Kişi ID</label>
                  <p className="mt-1 text-lg text-gray-900">#{person.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Kayıt Tarihi</label>
                  <p className="mt-1 text-lg text-gray-900 flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {new Date(person.createdAt || '').toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Ad</label>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{person.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Soyad</label>
                  <p className="mt-1 text-xl font-semibold text-gray-900">{person.surname}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Doğum Tarihi</label>
                  <p className="mt-1 text-lg text-gray-900">
                    {new Date(person.birthDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Yaş</label>
                  <p className="mt-1 text-lg text-gray-900">{age} yaşında</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Cinsiyet</label>
                  <p className="mt-1 text-lg text-gray-900">{person.gender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Yaş Grubu</label>
                  <p className="mt-1 text-lg text-gray-900">{getAgeGroup(age)}</p>
                </div>
              </div>
            </div>

            {/* Household Info Card */}
            {household && (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Home className="h-6 w-6 mr-2 text-green-600" />
                    Hane Bilgileri
                  </h2>
                  <Link
                    to={`/viewer/households/${household.id}`}
                    className="flex items-center px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Hane Detayına Git
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Hane ID</label>
                    <p className="mt-1 text-lg text-gray-900">#{household.id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Hane Kayıt Tarihi</label>
                    <p className="mt-1 text-lg text-gray-900">
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
                    <p className="mt-1 text-lg text-gray-900">{household.district?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">İl</label>
                    <p className="mt-1 text-lg text-gray-900">{household.district?.city?.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Özet Bilgiler
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{age}</div>
                  <div className="text-sm text-gray-500">Yaş</div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Cinsiyet</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      person.gender === 'Erkek' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'
                    }`}>
                      {person.gender}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Yaş Grubu</span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                      {getAgeGroup(age)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Hane Üyesi</span>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      Evet
                    </span>
                  </div>
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
                  Kişi Bilgilerini Düzenle
                </button>
                {household && (
                  <Link
                    to={`/viewer/households/${household.id}`}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Hane Detaylarını Görüntüle
                  </Link>
                )}
                <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
                  <Eye className="h-4 w-4 mr-2" />
                  Kişi Raporu
                </button>
              </div>
            </div>

            {/* Demographic Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Demografik Bilgiler
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doğum Yılı</span>
                  <span className="font-medium">{new Date(person.birthDate).getFullYear()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doğum Ayı</span>
                  <span className="font-medium">
                    {new Date(person.birthDate).toLocaleDateString('tr-TR', { month: 'long' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kayıt Yılı</span>
                  <span className="font-medium">
                    {new Date(person.createdAt || '').getFullYear()}
                  </span>
                </div>
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
                    <p className="text-gray-900">Kişi kaydı oluşturuldu</p>
                    <p className="text-gray-500">{new Date(person.createdAt || '').toLocaleDateString('tr-TR')}</p>
                  </div>
                </div>
                {person.updatedAt && person.updatedAt !== person.createdAt && (
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3" />
                    <div>
                      <p className="text-gray-900">Son güncelleme</p>
                      <p className="text-gray-500">{new Date(person.updatedAt).toLocaleDateString('tr-TR')}</p>
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

export default PersonDetail 