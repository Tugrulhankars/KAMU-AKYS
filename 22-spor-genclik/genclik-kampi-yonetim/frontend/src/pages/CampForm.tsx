import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camp, CreateCampRequest, UpdateCampRequest } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const CampForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCampRequest>({
    name: '',
    description: '',
    locationId: 1,
    categoryId: 1,
    startDate: '',
    endDate: '',
    capacity: 0,
    minAge: 0,
    maxAge: 0,
    price: 0,
    currency: 'TRY',
    difficulty: '',
    requirements: '',
    equipment: '',
    accommodation: '',
    meals: '',
    transportation: '',
    insurance: '',
    activityIds: []
  });

  useEffect(() => {
    if (id) {
      fetchCamp();
    }
  }, [id]);

  const fetchCamp = async () => {
    try {
      const camp = await apiService.getCampById(parseInt(id!));
      setFormData({
        name: camp.name,
        description: camp.description,
        locationId: camp.locationId,
        categoryId: camp.categoryId,
        startDate: camp.startDate,
        endDate: camp.endDate,
        capacity: camp.capacity,
        minAge: camp.minAge,
        maxAge: camp.maxAge,
        price: camp.price,
        currency: camp.currency,
        difficulty: camp.difficulty,
        requirements: camp.requirements,
        equipment: camp.equipment,
        accommodation: camp.accommodation,
        meals: camp.meals,
        transportation: camp.transportation,
        insurance: camp.insurance,
        activityIds: camp.activities?.map(a => a.id) || []
      });
    } catch (error) {
      toast.error('Kamp bilgileri yüklenirken hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'minAge' || name === 'maxAge' || name === 'price' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await apiService.updateCamp(parseInt(id), formData as UpdateCampRequest);
        toast.success('Kamp başarıyla güncellendi');
      } else {
        await apiService.createCamp(formData);
        toast.success('Kamp başarıyla oluşturuldu');
      }
      navigate('/camps');
    } catch (error) {
      toast.error('Kamp kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Kamp Düzenle' : 'Yeni Kamp Ekle'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kamp Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kamp Adı</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Kamp adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Konum ID</label>
                <Input
                  name="locationId"
                  type="number"
                  value={formData.locationId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Açıklama</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Kamp açıklamasını girin"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Başlangıç Tarihi</label>
                <Input
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bitiş Tarihi</label>
                <Input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kapasite</label>
                <Input
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Yaş</label>
                <Input
                  name="minAge"
                  type="number"
                  value={formData.minAge}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maksimum Yaş</label>
                <Input
                  name="maxAge"
                  type="number"
                  value={formData.maxAge}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fiyat</label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Para Birimi</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="TRY">TRY</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zorluk Seviyesi</label>
                <Input
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  placeholder="Başlangıç, Orta, İleri"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gereksinimler</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Kamp gereksinimlerini girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ekipman</label>
                <textarea
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Gerekli ekipmanları girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Konaklama</label>
                <textarea
                  name="accommodation"
                  value={formData.accommodation}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Konaklama bilgilerini girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Yemek</label>
                <textarea
                  name="meals"
                  value={formData.meals}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Yemek bilgilerini girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ulaşım</label>
                <textarea
                  name="transportation"
                  value={formData.transportation}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ulaşım bilgilerini girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sigorta</label>
                <textarea
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Sigorta bilgilerini girin"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : (id ? 'Güncelle' : 'Oluştur')}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/camps')}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampForm; 