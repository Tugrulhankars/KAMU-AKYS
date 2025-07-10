import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Users, MapPin, Phone } from 'lucide-react';
import { clubAPI } from '../services/api';
import { ClubDto, ClubListDto } from '../types';

const Clubs = () => {
  const [clubs, setClubs] = useState<ClubListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState<ClubDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editClub, setEditClub] = useState<Partial<ClubDto>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const data = await clubAPI.getAll();
      setClubs(data);
    } catch (error) {
      alert('Kulüpler alınamadı!');
    }
    setLoading(false);
  };

  const handleEdit = async (club: ClubListDto) => {
    try {
      const detail = await clubAPI.getById(club.id);
      setEditClub(detail);
      setEditMode(true);
    } catch (error) {
      alert('Kulüp detayı alınamadı!');
    }
  };

  const handleUpdate = async () => {
    if (!editClub.id) return;
    try {
      await clubAPI.update(editClub.id, editClub as any);
      setEditMode(false);
      fetchClubs();
      alert('Kulüp güncellendi!');
    } catch (error) {
      alert('Güncelleme başarısız!');
    }
  };

  const handleDelete = async (club: ClubListDto) => {
    if (!window.confirm('Kulübü silmek istediğinize emin misiniz?')) return;
    try {
      await clubAPI.delete(club.id);
      fetchClubs();
      alert('Kulüp silindi!');
    } catch (error) {
      alert('Silme başarısız!');
    }
  };

  const handleDeactivate = async (club: ClubListDto) => {
    try {
      await clubAPI.deactivate(club.id);
      fetchClubs();
    } catch (error) {
      alert('Pasif yapma başarısız!');
    }
  };

  const handleActivate = async (club: ClubListDto) => {
    try {
      await clubAPI.activate(club.id);
      fetchClubs();
    } catch (error) {
      alert('Aktif yapma başarısız!');
    }
  };

  const handleLogoUpload = async (club: ClubListDto) => {
    try {
      const detail = await clubAPI.getById(club.id);
      setSelectedClub(detail);
    } catch (error) {
      alert('Kulüp detayı alınamadı!');
    }
  };

  const handleSearch = async () => {
    try {
      const results = await clubAPI.search(searchTerm);
      setClubs(results);
    } catch (error) {
      alert('Arama başarısız!');
    }
  };

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    club.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-900">Spor Kulüpleri</h1>
        <button
          onClick={() => navigate('/clubs/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Kulüp
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Kulüp ara..."
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
                  Kulüp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefon
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  E-posta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sporcu Sayısı
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
              {filteredClubs.map((club) => (
                <tr key={club.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{club.name}</div>
                      <div className="text-sm text-gray-500">Kuruluş: {club.foundedYear}</div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {club.address.split(',')[0]}...
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {club.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {club.phoneNumber}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {club.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{club.athleteCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      club.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {club.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/clubs/${club.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Görüntüle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(club)}
                        className="text-green-600 hover:text-green-900"
                        title="Düzenle"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(club)}
                        className="text-red-600 hover:text-red-900"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleActivate(club)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Aktif"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(club)}
                        className="text-red-600 hover:text-red-900"
                        title="Pasif"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleLogoUpload(club)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Logo Yükle"
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
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Kulüp</p>
              <p className="text-2xl font-semibold text-gray-900">{clubs.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Toplam Sporcu</p>
              <p className="text-2xl font-semibold text-gray-900">
                {clubs.reduce((sum, club) => sum + club.athleteCount, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Aktif Kulüp</p>
              <p className="text-2xl font-semibold text-gray-900">
                {clubs.filter(club => club.isActive).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Ortalama Sporcu</p>
              <p className="text-2xl font-semibold text-gray-900">
                {Math.round(clubs.reduce((sum, club) => sum + club.athleteCount, 0) / clubs.length)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubs; 