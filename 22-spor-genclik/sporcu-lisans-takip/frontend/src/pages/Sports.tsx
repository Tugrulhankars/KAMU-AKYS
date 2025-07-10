import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Users, Award } from 'lucide-react';
import { sportAPI } from '../services/api';
import { SportDto, SportListDto } from '../types';

const Sports = () => {
  const [sports, setSports] = useState<SportListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState<SportDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editSport, setEditSport] = useState<Partial<SportDto>>({});
  const [iconFile, setIconFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSports();
  }, []);

  const fetchSports = async () => {
    setLoading(true);
    try {
      const data = await sportAPI.getAll();
      setSports(data);
    } catch (error) {
      alert('Spor dalları alınamadı!');
    }
    setLoading(false);
  };

  const handleEdit = async (sport: SportListDto) => {
    try {
      const detail = await sportAPI.getById(sport.id);
      setEditSport(detail);
      setEditMode(true);
    } catch (error) {
      alert('Spor detayı alınamadı!');
    }
  };

  const handleUpdate = async () => {
    if (!editSport.id) return;
    try {
      await sportAPI.update(editSport.id, editSport as any);
      setEditMode(false);
      fetchSports();
      alert('Spor dalı güncellendi!');
    } catch (error) {
      alert('Güncelleme başarısız!');
    }
  };

  const handleDelete = async (sport: SportListDto) => {
    if (!window.confirm('Spor dalını silmek istediğinize emin misiniz?')) return;
    try {
      await sportAPI.delete(sport.id);
      fetchSports();
      alert('Spor dalı silindi!');
    } catch (error) {
      alert('Silme başarısız!');
    }
  };

  const handleDeactivate = async (sport: SportListDto) => {
    try {
      await sportAPI.deactivate(sport.id);
      fetchSports();
    } catch (error) {
      alert('Pasif yapma başarısız!');
    }
  };

  const handleActivate = async (sport: SportListDto) => {
    try {
      await sportAPI.activate(sport.id);
      fetchSports();
    } catch (error) {
      alert('Aktif yapma başarısız!');
    }
  };

  const handleIconUpload = async (sport: SportListDto) => {
    try {
      const detail = await sportAPI.getById(sport.id);
      setSelectedSport(detail);
    } catch (error) {
      alert('Spor detayı alınamadı!');
    }
  };

  const filteredSports = sports.filter(sport =>
    sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sport.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Spor Dalları</h1>
        <button
          onClick={() => navigate('/sports/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Spor Dalı
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Spor dalı ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spor Dalı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lisans Sayısı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSports.map((sport) => (
                <tr key={sport.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{sport.name}</div>
                      <div className="text-sm text-gray-500">{sport.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {sport.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{sport.licenseCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      sport.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sport.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(sport)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(sport)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleActivate(sport)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Aktif"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(sport)}
                        className="text-red-600 hover:text-red-900"
                        title="Pasif"
                      >
                        <Users className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleIconUpload(sport)}
                        className="text-purple-600 hover:text-purple-900"
                        title="İkon Yükle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Spor Dalı</p>
              <p className="text-2xl font-semibold text-gray-900">{sports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Lisans</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sports.reduce((sum, sport) => sum + sport.licenseCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sports; 