import React, { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Building2, Users, MapPin, Search, Calendar } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { districtsAPI, citiesAPI } from '../services/api'
import { CreateDistrict } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

interface District {
  id: number
  name: string
  cityId: number
  cityName: string
  createdAt: string
  createdByUsername?: string
  householdCount: number
}

interface City {
  id: number
  name: string
  createdAt: string
  createdByUsername?: string
  districtCount: number
}

const DistrictManagement: React.FC = () => {
  const { isAdmin } = useAuth()
  const [districts, setDistricts] = useState<District[]>([])
  const [cities, setCities] = useState<City[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCityFilter, setSelectedCityFilter] = useState<number | ''>('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null)
  const [formData, setFormData] = useState<CreateDistrict>({ name: '', cityId: 0 })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [districtsResponse, citiesResponse] = await Promise.all([
        districtsAPI.getAll(),
        citiesAPI.getAll()
      ])
      setDistricts(districtsResponse.data)
      setCities(citiesResponse.data)
    } catch (error) {
      toast.error('Veriler yüklenirken hata oluştu')
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) {
      toast.error('İlçe adı gereklidir')
      return
    }
    if (!formData.cityId) {
      toast.error('Şehir seçimi gereklidir')
      return
    }

    try {
      setIsSubmitting(true)
      await districtsAPI.create(formData)
      toast.success('İlçe başarıyla oluşturuldu')
      setShowCreateModal(false)
      setFormData({ name: '', cityId: 0 })
      await fetchData()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'İlçe oluşturulurken hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDistrict || !formData.name.trim()) {
      toast.error('İlçe adı gereklidir')
      return
    }
    if (!formData.cityId) {
      toast.error('Şehir seçimi gereklidir')
      return
    }

    try {
      setIsSubmitting(true)
      await districtsAPI.update(selectedDistrict.id, formData)
      toast.success('İlçe başarıyla güncellendi')
      setShowEditModal(false)
      setSelectedDistrict(null)
      setFormData({ name: '', cityId: 0 })
      await fetchData()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'İlçe güncellenirken hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (district: District) => {
    if (!window.confirm(`"${district.name}" ilçesini silmek istediğinizden emin misiniz?`)) {
      return
    }

    try {
      await districtsAPI.delete(district.id)
      toast.success('İlçe başarıyla silindi')
      await fetchData()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'İlçe silinirken hata oluştu')
    }
  }

  const openEditModal = (district: District) => {
    setSelectedDistrict(district)
    setFormData({ name: district.name, cityId: district.cityId })
    setShowEditModal(true)
  }

  const filteredDistricts = districts.filter(district => {
    const matchesSearch = district.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         district.cityName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCity = selectedCityFilter === '' || district.cityId === selectedCityFilter
    return matchesSearch && matchesCity
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="İlçeler yükleniyor..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">İlçe Yönetimi</h1>
          <p className="mt-2 text-lg text-gray-600">
            Sistem ilçelerini yönetin ve düzenleyin
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="İlçe veya şehir ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full"
              />
            </div>
            
            <select
              value={selectedCityFilter}
              onChange={(e) => setSelectedCityFilter(e.target.value === '' ? '' : Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Tüm Şehirler</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni İlçe Ekle
            </button>
          )}
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((district) => (
            <div key={district.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-primary-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{district.name}</h3>
                    <p className="text-sm text-gray-500">ID: {district.id}</p>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditModal(district)}
                      className="p-2 text-gray-400 hover:text-primary-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(district)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{district.cityName}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{district.householdCount} Hane</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(district.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>
                {district.createdByUsername && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{district.createdByUsername}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredDistricts.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">İlçe bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || selectedCityFilter ? 'Arama kriterlerinize uygun ilçe bulunamadı.' : 'Henüz ilçe eklenmemiş.'}
            </p>
          </div>
        )}

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Yeni İlçe Ekle</h3>
                <form onSubmit={handleCreate}>
                  <div className="mb-4">
                    <label htmlFor="citySelect" className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir
                    </label>
                    <select
                      id="citySelect"
                      value={formData.cityId}
                      onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value={0}>Şehir seçin</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="districtName" className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe Adı
                    </label>
                    <input
                      type="text"
                      id="districtName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="İlçe adını girin"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateModal(false)
                        setFormData({ name: '', cityId: 0 })
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
        {showEditModal && selectedDistrict && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">İlçe Düzenle</h3>
                <form onSubmit={handleEdit}>
                  <div className="mb-4">
                    <label htmlFor="editCitySelect" className="block text-sm font-medium text-gray-700 mb-2">
                      Şehir
                    </label>
                    <select
                      id="editCitySelect"
                      value={formData.cityId}
                      onChange={(e) => setFormData({ ...formData, cityId: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      required
                    >
                      <option value={0}>Şehir seçin</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="editDistrictName" className="block text-sm font-medium text-gray-700 mb-2">
                      İlçe Adı
                    </label>
                    <input
                      type="text"
                      id="editDistrictName"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="İlçe adını girin"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false)
                        setSelectedDistrict(null)
                        setFormData({ name: '', cityId: 0 })
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

export default DistrictManagement 