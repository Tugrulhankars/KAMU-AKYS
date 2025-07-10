import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateActivityRequest, UpdateActivityRequest } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const ActivityForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateActivityRequest>({
    name: '',
    description: '',
    categoryId: 1,
    duration: 0,
    maxParticipants: 0,
    minParticipants: 0,
    difficulty: '',
    requirements: '',
    equipment: '',
    location: '',
    instructor: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      fetchActivity();
    }
  }, [id]);

  const fetchActivity = async () => {
    try {
      const activity = await apiService.getActivityById(parseInt(id!));
      setFormData({
        name: activity.name,
        description: activity.description,
        categoryId: activity.categoryId,
        duration: activity.duration,
        maxParticipants: activity.maxParticipants,
        minParticipants: activity.minParticipants,
        difficulty: activity.difficulty,
        requirements: activity.requirements,
        equipment: activity.equipment,
        location: activity.location,
        instructor: activity.instructor,
        notes: activity.notes || ''
      });
    } catch (error) {
      toast.error('Aktivite bilgileri yüklenirken hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'maxParticipants' || name === 'minParticipants' || name === 'categoryId'
        ? parseInt(value) || 0
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await apiService.updateActivity(parseInt(id), { ...formData, isActive: true } as UpdateActivityRequest);
        toast.success('Aktivite başarıyla güncellendi');
      } else {
        await apiService.createActivity(formData);
        toast.success('Aktivite başarıyla oluşturuldu');
      }
      navigate('/activities');
    } catch (error) {
      toast.error('Aktivite kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Aktiviteyi Düzenle' : 'Yeni Aktivite Ekle'}
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Aktivite Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Aktivite Adı</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Aktivite adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Kategori ID</label>
                <Input
                  name="categoryId"
                  type="number"
                  value={formData.categoryId}
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
                placeholder="Aktivite açıklamasını girin"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Süre (dk)</label>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maksimum Katılımcı</label>
                <Input
                  name="maxParticipants"
                  type="number"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Minimum Katılımcı</label>
                <Input
                  name="minParticipants"
                  type="number"
                  value={formData.minParticipants}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Zorluk Seviyesi</label>
                <Input
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  placeholder="Başlangıç, Orta, İleri"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Eğitmen</label>
                <Input
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  placeholder="Eğitmen adı"
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
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa gereksinimleri belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ekipman</label>
                <textarea
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa ekipmanları belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Konum</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Konum bilgisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Notlar</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Ek notlar"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : (id ? 'Güncelle' : 'Oluştur')}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/activities')}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityForm; 