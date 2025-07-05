import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { authApi } from '../services/api';
import { User } from '../types';
import toast from 'react-hot-toast';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' });
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', newPassword2: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await authApi.getProfile();
        if (res.success && res.data) {
          setProfile(res.data);
          setForm({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
          });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authApi.updateProfile({ ...form });
      if (res.success && res.data) {
        toast.success('Profil güncellendi');
        setProfile(res.data);
        updateUser(res.data);
      } else {
        toast.error(res.message || 'Güncelleme başarısız');
      }
    } catch {
      toast.error('Sunucu hatası');
    } finally {
      setSaving(false);
    }
  };

  const handlePwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPwForm({ ...pwForm, [e.target.name]: e.target.value });
  };

  const handlePwSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.newPassword2) {
      toast.error('Yeni şifreler eşleşmiyor');
      return;
    }
    setPwSaving(true);
    try {
      const res = await authApi.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      if (res.success) {
        toast.success('Şifre başarıyla değiştirildi');
        setPwForm({ currentPassword: '', newPassword: '', newPassword2: '' });
      } else {
        toast.error(res.message || 'Şifre değiştirilemedi');
      }
    } catch {
      toast.error('Sunucu hatası');
    } finally {
      setPwSaving(false);
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Profil Bilgilerim</h1>
      <form className="bg-white rounded-lg shadow p-6 mb-8 space-y-4" onSubmit={handleProfileSubmit}>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Ad</label>
          <input type="text" name="firstName" value={form.firstName} onChange={handleProfileChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Soyad</label>
          <input type="text" name="lastName" value={form.lastName} onChange={handleProfileChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">E-posta</label>
          <input type="email" name="email" value={form.email} onChange={handleProfileChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <button type="submit" disabled={saving} className="w-full py-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors mt-2 disabled:opacity-60">
          {saving ? 'Kaydediliyor...' : 'Bilgilerimi Güncelle'}
        </button>
      </form>
      <h2 className="text-xl font-bold mb-4 text-blue-900">Şifre Değiştir</h2>
      <form className="bg-white rounded-lg shadow p-6 space-y-4" onSubmit={handlePwSubmit}>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Mevcut Şifre</label>
          <input type="password" name="currentPassword" value={pwForm.currentPassword} onChange={handlePwChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Yeni Şifre</label>
          <input type="password" name="newPassword" value={pwForm.newPassword} onChange={handlePwChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <div>
          <label className="block text-base font-semibold text-gray-800 mb-2">Yeni Şifre (Tekrar)</label>
          <input type="password" name="newPassword2" value={pwForm.newPassword2} onChange={handlePwChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200" required />
        </div>
        <button type="submit" disabled={pwSaving} className="w-full py-3 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors mt-2 disabled:opacity-60">
          {pwSaving ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
        </button>
      </form>
    </div>
  );
};

export default ProfilePage; 