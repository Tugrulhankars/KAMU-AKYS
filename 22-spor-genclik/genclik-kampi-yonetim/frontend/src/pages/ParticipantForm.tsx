import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreateParticipantRequest, UpdateParticipantRequest } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const ParticipantForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateParticipantRequest>({
    firstName: '',
    lastName: '',
    identityNumber: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phoneNumber: '',
    address: '',
    bloodType: '',
    allergies: '',
    medicalConditions: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    schoolName: '',
    grade: '',
    studentId: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    teacherName: '',
    teacherPhone: '',
    teacherEmail: '',
    notes: ''
  });

  useEffect(() => {
    if (id) {
      fetchParticipant();
    }
  }, [id]);

  const fetchParticipant = async () => {
    try {
      const participant = await apiService.getParticipantById(parseInt(id!));
      setFormData({
        firstName: participant.firstName,
        lastName: participant.lastName,
        identityNumber: participant.identityNumber,
        dateOfBirth: participant.dateOfBirth,
        gender: participant.gender,
        email: participant.email || '',
        phoneNumber: participant.phoneNumber || '',
        address: participant.address || '',
        bloodType: participant.bloodType || '',
        allergies: participant.allergies || '',
        medicalConditions: participant.medicalConditions || '',
        emergencyContactName: participant.emergencyContactName || '',
        emergencyContactPhone: participant.emergencyContactPhone || '',
        emergencyContactRelationship: participant.emergencyContactRelationship || '',
        schoolName: participant.schoolName || '',
        grade: participant.grade || '',
        studentId: participant.studentId || '',
        parentName: participant.parentName || '',
        parentPhone: participant.parentPhone || '',
        parentEmail: participant.parentEmail || '',
        teacherName: participant.teacherName || '',
        teacherPhone: participant.teacherPhone || '',
        teacherEmail: participant.teacherEmail || '',
        notes: participant.notes || ''
      });
    } catch (error) {
      toast.error('Katılımcı bilgileri yüklenirken hata oluştu');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await apiService.updateParticipant(parseInt(id), { ...formData, isActive: true } as UpdateParticipantRequest);
        toast.success('Katılımcı başarıyla güncellendi');
      } else {
        await apiService.createParticipant(formData);
        toast.success('Katılımcı başarıyla oluşturuldu');
      }
      navigate('/participants');
    } catch (error) {
      toast.error('Katılımcı kaydedilirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          {id ? 'Katılımcı Düzenle' : 'Yeni Katılımcı Ekle'}
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Katılımcı Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Ad</label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Adını girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Soyad</label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Soyadını girin"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">TC Kimlik No</label>
                <Input
                  name="identityNumber"
                  value={formData.identityNumber}
                  onChange={handleChange}
                  required
                  placeholder="TC Kimlik No"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Doğum Tarihi</label>
                <Input
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cinsiyet</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">E-posta</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-posta adresi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Telefon</label>
                <Input
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Telefon numarası"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Adres</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Adres bilgileri"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Kan Grubu</label>
                <select
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Seçiniz</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="0+">0+</option>
                  <option value="0-">0-</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acil Durum İletişim</label>
                <Input
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Acil durum kişisi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Acil Durum Telefonu</label>
                <Input
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="Acil durum telefonu"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Alerjiler</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa alerjileri belirtin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sağlık Durumu</label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Varsa sağlık durumunu belirtin"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Okul Adı</label>
                <Input
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="Okul adı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sınıf</label>
                <Input
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  placeholder="Sınıf"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Öğrenci No</label>
                <Input
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  placeholder="Öğrenci numarası"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Veli Adı</label>
                <Input
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  placeholder="Veli adı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Veli Telefonu</label>
                <Input
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handleChange}
                  placeholder="Veli telefonu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Veli E-posta</label>
                <Input
                  name="parentEmail"
                  type="email"
                  value={formData.parentEmail}
                  onChange={handleChange}
                  placeholder="Veli e-posta"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notlar</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ek notlar"
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Kaydediliyor...' : (id ? 'Güncelle' : 'Oluştur')}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/participants')}>
                İptal
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParticipantForm; 