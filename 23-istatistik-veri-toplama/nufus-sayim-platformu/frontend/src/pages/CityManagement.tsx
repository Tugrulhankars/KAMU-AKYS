import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, MapPin, Users, Building2, Search, Calendar } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { citiesAPI } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

interface City {
  id: number
  name: string
  createdAt: string
  createdByUsername?: string
  districtCount: number
}

import { CreateCity } from '../types'

const CityManagement: React.FC = () => {
  const { isAdmin } = useAuth()
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [formData, setFormData] = useState<CreateCity>({ name: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = async () => {
    try {
      setIsLoading(true)
      const response = await citiesAPI.getAll()
      setCities(response.data)
    } catch (error) {
      toast.error('Şehirler yüklenirken hata oluştu')
      console.error('Error fetching cities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('Şehir adı gereklidir')
      return
    }

    try {
      setIsSubmitting(true)
      await citiesAPI.create(formData)
      toast.success('Şehir başarıyla oluşturuldu')
      setShowCreateModal(false)
      setFormData({ name: '' })
      await fetchCities()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Şehir oluşturulurken hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCity || !formData.name.trim()) {
      toast.error('Şehir adı gereklidir')
      return
    }

    try {
      setIsSubmitting(true)
      await citiesAPI.update(selectedCity.id, formData)
      toast.success('Şehir başarıyla güncellendi')
      setShowEditModal(false)
      setSelectedCity(null)
      setFormData({ name: '' })
      await fetchCities()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Şehir güncellenirken hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (city: City) => {
    if (!window.confirm(`"${city.name}" şehrini silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      await citiesAPI.delete(city.id)
      toast.success('Şehir başarıyla silindi')
      await fetchCities()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Şehir silinirken hata oluştu')
    }
  }

  const openEditModal = (city: City) => {
    setSelectedCity(city)
    setFormData({ name: city.name })
    setShowEditModal(true)
  }

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="Şehirler yükleniyor..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Şehir Yönetimi</h1>
          <p className="mt-2 text-lg text-gray-600">
            Sistem şehirlerini yönetin ve düzenleyin
          </p>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Şehir ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
            />
          </div>
          
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Şehir Ekle
            </button>
          )}
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div key={city.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MapPin className="h-8 w-8 text-primary-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-500">ID: {city.id}</p>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(city)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(city)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Building2 className="h-4 w-4 mr-2" />
                  <span>{city.districtCount} İlçe</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(city.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
                {city.createdByUsername && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{city.createdByUsername}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Şehir bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Arama kriterlerinize uygun şehir bulunamadı.' : 'Henüz şehir eklenmemiş.'}
            </p>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Yeni Şehir Ekle</h3>
                <form onSubmit={handleCreate}>
                  <div className="mb-4">
                    <label htmlFor="cityName" className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir Adı
                    </label>
                    <input
                      type="text"
                      id="cityName"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Şehir adını girin"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateModal(false)
                        setFormData({ name: '' })
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Oluşturuluyor...' : 'Oluştur'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && selectedCity && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Şehir Düzenle</h3>
                <form onSubmit={handleEdit}>
                  <div className="mb-4">
                    <label htmlFor="editCityName" className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir Adı
                    </label>
                    <input
                      type="text"
                      id="editCityName"
                      value={formData.name}
                      onChange={(e) => setFormData({ name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Şehir adını girin"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false)
                        setSelectedCity(null)
                        setFormData({ name: '' })
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      İptal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CityManagement 