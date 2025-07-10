import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateRegistrationRequest, UpdateRegistrationRequest } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import toast from 'react-hot-toast';

const RegistrationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRegistrationRequest>({
    campId: 0,
    participantId: 0,
    specialRequirements: '',
    dietaryRestrictions: '',
    medicalNotes: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      fetchRegistration();
    }
  }, [id]);

  const fetchRegistration = async () => {
    try {
      const registration = await apiService.getRegistrationById(parseInt(id!));
      setFormData({
        campId: registration.campId,
        participantId: registration.participantId,
        specialRequirements: registration.specialRequirements || '',
        dietaryRestrictions: registration.dietaryRestrictions || '',
        medicalNotes: registration.medicalNotes || '',
        emergencyContactName: registration.emergencyContactName || '',
        emergencyContactPhone: registration.emergencyContactPhone || '',
        emergencyContactRelationship: registration.emergencyContactRelationship || '',
        notes: registration.notes || ''
      });
    } catch (error) {
      toast.error('Kayıt bilgileri yüklenirken hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'campId' || name === 'participantId' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await apiService.updateRegistration(parseInt(id), { ...formData, status: 'confirmed' } as UpdateRegistrationRequest);
        toast.success('Kayıt başarıyla güncellendi');
      } else {
        await apiService.createRegistration(formData);
        toast.success('Kayıt başarıyla oluşturuldu');
      }
      navigate('/registrations');
    } catch (error) {
      toast.error('Kayıt kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Kaydı Düzenle' : 'Yeni Kayıt Ekle'}
        </h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Kayıt Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kamp ID</label>
                <input
                  name="campId"
                  type="number"
                  value={formData.campId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Katılımcı ID</label>
                <input
                  name="participantId"
                  type="number"
                  value={formData.participantId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Özel Gereksinimler</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa özel gereksinimleri belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Diyet Kısıtlamaları</label>
                <textarea
                  name="dietaryRestrictions"
                  value={formData.dietaryRestrictions}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa diyet kısıtlamalarını belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tıbbi Notlar</label>
                <textarea
                  name="medicalNotes"
                  value={formData.medicalNotes}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa tıbbi notları belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acil Durum Kişisi</label>
                <input
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Acil durum kişisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acil Durum Telefonu</label>
                <input
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="Acil durum telefonu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acil Durum Yakınlığı</label>
                <input
                  name="emergencyContactRelationship"
                  value={formData.emergencyContactRelationship}
                  onChange={handleChange}
                  placeholder="Yakınlık derecesi"
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
              <Button type="button" variant="outline" onClick={() => navigate('/registrations')}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm; 