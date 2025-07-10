import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity } from '../types';
import { apiService } from '../services/api';
import Button from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import Input from '../components/ui/Input';
import toast from 'react-hot-toast';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await apiService.getActivities();
      setActivities(response);
    } catch (error) {
      toast.error('Aktiviteler yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities = activities.filter(activity =>
    activity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-900">Aktiviteler</h1>
        <Link to="/activities/new">
          <Button>Yeni Aktivite Ekle</Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Aktivite ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <Card key={activity.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{activity.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                activity.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {activity.isActive ? 'Aktif' : 'Pasif'}
              </span>
            </div>
            
            <p className="text-gray-600 mb-4 line-clamp-2">{activity.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Kategori:</span>
                <span className="text-gray-900">{activity.categoryName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Süre:</span>
                <span className="text-gray-900">{activity.durationText}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Zorluk:</span>
                <span className="text-gray-900">{activity.difficulty}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Katılımcılar:</span>
                <span className="text-gray-900">{activity.participantCount}/{activity.maxParticipants}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Eğitmen:</span>
                <span className="text-gray-900">{activity.instructor}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link to={`/activities/${activity.id}`} className="flex-1">
                <Button variant="outline" className="w-full">Detay</Button>
              </Link>
              <Link to={`/activities/${activity.id}/edit`}>
                <Button variant="outline">Düzenle</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aktivite bulunamadı</p>
        </div>
      )}
    </div>
  );
};

export default Activities; 