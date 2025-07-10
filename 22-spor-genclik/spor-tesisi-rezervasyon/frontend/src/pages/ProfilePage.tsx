import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { userAPI, User } from '../services/api';
import { User as UserIcon, Mail, Phone, MapPin, Calendar, CreditCard, Save, Edit, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import Layout from "../components/Layout";

const stats = [
  {
    label: "Toplam Rezervasyonum",
    value: "18",
    description: "Yaptığınız toplam rezervasyon sayısı",
  },
  {
    label: "Aktif Rezervasyonum",
    value: "2",
    description: "Şu an devam eden rezervasyonlarınız",
  },
  {
    label: "Üyelik Süresi",
    value: "1 yıl 3 ay",
    description: "Sistemdeki toplam üyelik süreniz",
  },
];

const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    identityNumber: '',
    address: '',
    dateOfBirth: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        identityNumber: user.identityNumber || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth).toISOString().split('T')[0] : ''
      });
    }
  }, [user]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        ...profileData,
        dateOfBirth: new Date(profileData.dateOfBirth),
        password: '', // Şifre değişikliği ayrı yapılacak
        confirmPassword: ''
      };
      
      const success = await updateProfile(userData);
      if (success) {
        setIsEditing(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Yeni şifreler eşleşmiyor!');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Yeni şifre en az 6 karakter olmalıdır!');
      return;
    }

    setLoading(true);

    try {
      // Şifre değişikliği için ayrı bir API endpoint'i gerekebilir
      // Şimdilik sadece profil güncellemesi yapıyoruz
      toast.info('Şifre değişikliği özelliği yakında eklenecek');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Kullanıcı bilgileri yüklenemedi</h2>
          <p className="text-gray-600">Lütfen tekrar giriş yapın.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      {/* İstatistik kutuları */}
      <div className="max-w-4xl mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl shadow p-6 flex flex-col items-center"
          >
            <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
            <div className="text-lg font-semibold mt-2">{stat.label}</div>
            <div className="text-gray-500 text-sm mt-1">{stat.description}</div>
          </div>
        ))}
      </div>
      {/* Kartlar */}
      <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Profil Bilgileri</h2>
          <p className="text-gray-600">Kişisel bilgilerinizi görüntüleyin ve güncelleyin.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col gap-4">
          <h2 className="text-xl font-bold text-blue-700 mb-2">Rezervasyon Geçmişi</h2>
          <p className="text-gray-600">Tüm rezervasyon geçmişinizi ve detaylarını inceleyin.</p>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 