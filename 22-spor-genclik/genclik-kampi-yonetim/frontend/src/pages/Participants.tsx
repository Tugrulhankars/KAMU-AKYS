import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Participant } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Participants: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await apiService.getParticipants();
      setParticipants(response);
    } catch (error) {
      toast.error('Katılımcılar yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const filteredParticipants = participants.filter(participant =>
    participant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    participant.identityNumber.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Katılımcılar</h1>
        <Link to="/participants/new">
          <Button>Yeni Katılımcı Ekle</Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Katılımcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParticipants.map((participant) => (
          <Card key={participant.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{participant.fullName}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                participant.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {participant.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">TC Kimlik:</span>
                <span className="text-gray-900">{participant.identityNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Yaş:</span>
                <span className="text-gray-900">{participant.age}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cinsiyet:</span>
                <span className="text-gray-900">{participant.gender}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kayıt Sayısı:</span>
                <span className="text-gray-900">{participant.registrationCount}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/participants/${participant.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Detay</Button>
              </Link>
              <Link to={`/participants/${participant.id}/edit`}>
                <Button variant="outline">Düzenle</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredParticipants.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Katılımcı bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default Participants; 