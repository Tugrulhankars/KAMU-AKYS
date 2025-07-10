import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { User, Mail, Lock, Phone } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Şifreler eşleşmiyor!');
      return;
    }
    setLoading(true);
    try {
      // API isteği burada yapılacak (mock)
      await new Promise(res => setTimeout(res, 1000));
      toast.success('Kayıt başarılı! Giriş yapabilirsiniz.');
      navigate('/login');
    } catch (err) {
      toast.error('Kayıt sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Kayıt Ol
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sistemi kullanmak için yeni bir hesap oluşturun
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Kayıt Formu</CardTitle>
            <CardDescription>Lütfen bilgilerinizi eksiksiz doldurun</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  label="Ad"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  icon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Soyad"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  icon={<User className="h-4 w-4" />}
                />
              </div>
              <Input
                label="E-posta"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                icon={<Mail className="h-4 w-4" />}
              />
              <Input
                label="Telefon"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                icon={<Phone className="h-4 w-4" />}
              />
              <Input
                label="Şifre"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                icon={<Lock className="h-4 w-4" />}
              />
              <Input
                label="Şifre Tekrar"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                icon={<Lock className="h-4 w-4" />}
              />
              <Button type="submit" className="w-full" loading={loading} disabled={loading}>
                Kayıt Ol
              </Button>
            </form>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-600">Zaten hesabınız var mı? </span>
              <button
                type="button"
                className="text-blue-600 hover:underline text-sm"
                onClick={() => navigate('/login')}
              >
                Giriş Yap
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register; 