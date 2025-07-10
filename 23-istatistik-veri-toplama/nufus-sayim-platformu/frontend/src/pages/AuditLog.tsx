import React, { useState, useEffect } from 'react'
import { Eye, Filter, Calendar, User, FileText, Download, Search } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

interface AuditLogEntry {
  id: number
  userId: number
  userName: string
  action: string
  entityType: string
  entityId?: number
  oldValues?: string
  newValues?: string
  timestamp: string
  ipAddress: string
}

interface AuditLogStats {
  totalEntries: number
  todayEntries: number
  uniqueUsers: number
  mostCommonAction: string
}

const AuditLog: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([])
  const [stats, setStats] = useState<AuditLogStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(20)
  const [totalCount, setTotalCount] = useState(0)
  const [selectedEntry, setSelectedEntry] = useState<AuditLogEntry | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  // Filtreler
  const [filters, setFilters] = useState({
    userId: '',
    action: '',
    entityType: '',
    startDate: '',
    endDate: '',
    search: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchAuditLogs()
    fetchStats()
  }, [currentPage, filters])

  const fetchAuditLogs = async () => {
    try {
      setIsLoading(true)
      
      const queryParams = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: pageSize.toString(),
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      })

      const response = await fetch(`/api/AuditLog?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Audit log verileri alınamadı')
      }

      const data = await response.json()
      setAuditLogs(data.items || [])
      setTotalCount(data.totalCount || 0)
    } catch (error) {
      setError('Audit log verileri yüklenirken hata oluştu')
      console.error('Error fetching audit logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/AuditLog/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching audit log stats:', error)
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({
      userId: '',
      action: '',
      entityType: '',
      startDate: '',
      endDate: '',
      search: ''
    })
    setCurrentPage(1)
  }

  const exportAuditLog = async (format: 'csv' | 'json') => {
    try {
      const queryParams = new URLSearchParams({
        format,
        ...Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== ''))
      })

      const response = await fetch(`/api/AuditLog/export?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      })

      if (!response.ok) {
        throw new Error('Dışa aktarma başarısız')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit_log_${new Date().toISOString().split('T')[0]}.${format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Dışa aktarma sırasında hata oluştu')
    }
  }

  const openDetailModal = (entry: AuditLogEntry) => {
    setSelectedEntry(entry)
    setIsDetailModalOpen(true)
  }

  const closeDetailModal = () => {
    setSelectedEntry(null)
    setIsDetailModalOpen(false)
  }

  const getActionBadgeColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'create':
        return 'bg-green-100 text-green-800'
      case 'update':
        return 'bg-yellow-100 text-yellow-800'
      case 'delete':
        return 'bg-red-100 text-red-800'
      case 'login':
        return 'bg-blue-100 text-blue-800'
      case 'logout':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  if (isLoading && auditLogs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <LoadingSpinner size="large" text="Audit log verileri yükleniyor..." />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
            <p className="mt-2 text-lg text-gray-600">
              Sistem aktivitelerinin detaylı kayıtları
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </button>
            
            <button
              onClick={() => exportAuditLog('csv')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV İndir
            </button>
            
            <button
              onClick={() => exportAuditLog('json')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Download className="h-4 w-4 mr-2" />
              JSON İndir
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <FileText className="h-12 w-12 text-blue-500" />
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalEntries.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Toplam Kayıt</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Calendar className="h-12 w-12 text-green-500" />
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.todayEntries.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Bugün</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <User className="h-12 w-12 text-purple-500" />
                <div className="ml-4">
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.uniqueUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">Aktif Kullanıcı</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <Eye className="h-12 w-12 text-orange-500" />
                <div className="ml-4">
                  <p className="text-lg font-bold text-gray-900">
                    {stats.mostCommonAction}
                  </p>
                  <p className="text-sm text-gray-500">En Sık Eylem</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Arama
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Kullanıcı adı, eylem..."
                    className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Eylem
                </label>
                <select
                  value={filters.action}
                  onChange={(e) => handleFilterChange('action', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="Create">Oluştur</option>
                  <option value="Update">Güncelle</option>
                  <option value="Delete">Sil</option>
                  <option value="Login">Giriş</option>
                  <option value="Logout">Çıkış</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Varlık Türü
                </label>
                <select
                  value={filters.entityType}
                  onChange={(e) => handleFilterChange('entityType', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                >
                  <option value="">Tümü</option>
                  <option value="User">Kullanıcı</option>
                  <option value="Person">Kişi</option>
                  <option value="Household">Hanehalkı</option>
                  <option value="City">Şehir</option>
                  <option value="District">İlçe</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Başlangıç Tarihi
                </label>
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bitiş Tarihi
                </label>
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Temizle
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Audit Log Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih/Saat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kullanıcı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Eylem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Varlık
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Adresi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {auditLogs.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(entry.timestamp).toLocaleString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.userName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionBadgeColor(entry.action)}`}>
                        {entry.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {entry.entityType}
                      {entry.entityId && (
                        <span className="text-gray-500"> #{entry.entityId}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {entry.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => openDetailModal(entry)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Önceki
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">{((currentPage - 1) * pageSize) + 1}</span>
                    {' - '}
                    <span className="font-medium">{Math.min(currentPage * pageSize, totalCount)}</span>
                    {' / '}
                    <span className="font-medium">{totalCount}</span>
                    {' kayıt gösteriliyor'}
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Önceki
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            pageNum === currentPage
                              ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                    >
                      Sonraki
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {isDetailModalOpen && selectedEntry && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Audit Log Detayı
                  </h3>
                  <button
                    onClick={closeDetailModal}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Kapat</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tarih/Saat</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedEntry.timestamp).toLocaleString('tr-TR')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Kullanıcı</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedEntry.userName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Eylem</label>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getActionBadgeColor(selectedEntry.action)}`}>
                        {selectedEntry.action}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Varlık</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedEntry.entityType}
                        {selectedEntry.entityId && (
                          <span className="text-gray-500"> #{selectedEntry.entityId}</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">IP Adresi</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedEntry.ipAddress}</p>
                    </div>
                  </div>

                  {selectedEntry.oldValues && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Önceki Değerler</label>
                      <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md overflow-x-auto">
                        {JSON.stringify(JSON.parse(selectedEntry.oldValues), null, 2)}
                      </pre>
                    </div>
                  )}

                  {selectedEntry.newValues && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Yeni Değerler</label>
                      <pre className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-md overflow-x-auto">
                        {JSON.stringify(JSON.parse(selectedEntry.newValues), null, 2)}
                      </pre>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={closeDetailModal}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Kapat
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuditLog 