import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { athleteAPI } from '../services/api';
import { AthleteDto, AthleteListDto } from '../types';

const Athletes = () => {
  const [athletes, setAthletes] = useState<AthleteListDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteDto | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editAthlete, setEditAthlete] = useState<Partial<AthleteDto>>({});
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [identitySearch, setIdentitySearch] = useState('');
  const [identityResult, setIdentityResult] = useState<AthleteDto | null>(null);
  const [clubSearch, setClubSearch] = useState('');
  const [clubResult, setClubResult] = useState<AthleteDto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAthletes();
  }, []);

  const fetchAthletes = async () => {
    setLoading(true);
    try {
      const data = await athleteAPI.getAll();
      setAthletes(data);
    } catch (error) {
      alert('Sporcular alınamadı!');
    }
    setLoading(false);
  };

  const handleEdit = async (athlete: AthleteListDto) => {
    try {
      const detail = await athleteAPI.getById(athlete.id);
      setEditAthlete(detail);
      setEditMode(true);
    } catch (error) {
      alert('Sporcu detayı alınamadı!');
    }
  };

  const handleUpdate = async () => {
    if (!editAthlete.id) return;
    try {
      await athleteAPI.update(editAthlete.id, editAthlete as any);
      setEditMode(false);
      fetchAthletes();
    } catch (error) {
      alert('Güncelleme başarısız!');
    }
  };

  const handleDelete = async (athlete: AthleteListDto) => {
    if (!window.confirm('Sporcuyu silmek istediğinize emin misiniz?')) return;
    try {
      await athleteAPI.delete(athlete.id);
      fetchAthletes();
    } catch (error) {
      alert('Silme başarısız!');
    }
  };

  const handleDeactivate = async (athlete: AthleteListDto) => {
    try {
      await athleteAPI.deactivate(athlete.id);
      fetchAthletes();
    } catch (error) {
      alert('Pasif yapma başarısız!');
    }
  };

  const handleActivate = async (athlete: AthleteListDto) => {
    try {
      await athleteAPI.activate(athlete.id);
      fetchAthletes();
    } catch (error) {
      alert('Aktif yapma başarısız!');
    }
  };

  const handlePhotoUpload = async (athlete: AthleteListDto) => {
    try {
      const detail = await athleteAPI.getById(athlete.id);
      setSelectedAthlete(detail);
    } catch (error) {
      alert('Sporcu detayı alınamadı!');
    }
  };

  const handleIdentitySearch = async () => {
    try {
      const athlete = await athleteAPI.getByIdentityNumber(identitySearch);
      setIdentityResult(athlete);
    } catch (error) {
      setIdentityResult(null);
      alert('Sporcu bulunamadı!');
    }
  };

  const handleClubSearch = async () => {
    try {
      const athletes = await athleteAPI.getByClub(Number(clubSearch));
      setClubResult(athletes);
    } catch (error) {
      setClubResult([]);
      alert('Kulübe ait sporcu bulunamadı!');
    }
  };

  const handleSearch = async () => {
    try {
      const results = await athleteAPI.search(searchTerm);
      setAthletes(results);
    } catch (error) {
      alert('Arama başarısız!');
    }
  };

  const filteredAthletes = athletes.filter(athlete =>
    `${athlete.name} ${athlete.surname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    athlete.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-900">Sporcular</h1>
        <button
          onClick={() => navigate('/athletes/new')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Yeni Sporcu
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Sporcu ara..."
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
                  Sporcu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kimlik No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Yaş
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kulüp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Telefon
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
              {filteredAthletes.map((athlete) => (
                <tr key={athlete.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {athlete.name} {athlete.surname}
                      </div>
                      <div className="text-sm text-gray-500">{athlete.gender}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.identityNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.clubName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.phoneNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {athlete.licenseCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      athlete.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {athlete.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => navigate(`/athletes/${athlete.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(athlete)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(athlete)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeactivate(athlete)}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Pasif Yap
                      </button>
                      <button
                        onClick={() => handleActivate(athlete)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Aktif Yap
                      </button>
                      <button
                        onClick={() => handlePhotoUpload(athlete)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Fotoğraf Yükle
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Athletes; 