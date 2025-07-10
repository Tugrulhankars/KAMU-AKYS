import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { RegisterData, ROLES } from '../types'
import { Eye, EyeOff, BarChart3, User, Lock, Shield } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData & { confirmPassword: string }>()

  const password = watch('password')

  const onSubmit = async (data: RegisterData & { confirmPassword: string }) => {
    if (data.password !== data.confirmPassword) {
      return
    }

    try {
      setIsLoading(true)
      const { confirmPassword, ...registerData } = data
      await registerUser(registerData)
      navigate('/')
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false)
    }
  }

  const roleDescriptions = {
    [ROLES.ADMIN]: 'Sistem yöneticisi - Tüm yetkilere sahip',
    [ROLES.OFFICER]: 'Görevli memur - Veri girişi yapabilir',
    [ROLES.VIEWER]: 'Gözlemci - Sadece verileri görüntüleyebilir',
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BarChart3 className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Yeni Hesap Oluşturun
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Zaten hesabınız var mı?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Giriş yapın
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="username" className="label">
                Kullanıcı Adı
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('username', {
                    required: 'Kullanıcı adı gereklidir',
                    minLength: {
                      value: 3,
                      message: 'Kullanıcı adı en az 3 karakter olmalıdır'
                    },
                    maxLength: {
                      value: 50,
                      message: 'Kullanıcı adı en fazla 50 karakter olabilir'
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir'
                    }
                  })}
                  type="text"
                  id="username"
                  autoComplete="username"
                  className={`input pl-10 ${errors.username ? 'input-error' : ''}`}
                  placeholder="Kullanıcı adınızı girin"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="role" className="label">
                Rol
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  {...register('role', { required: 'Rol seçimi gereklidir' })}
                  id="role"
                  className={`input pl-10 ${errors.role ? 'input-error' : ''}`}
                >
                  <option value="">Rol seçin</option>
                  <option value={ROLES.ADMIN}>Admin</option>
                  <option value={ROLES.OFFICER}>Görevli</option>
                  <option value={ROLES.VIEWER}>Gözlemci</option>
                </select>
              </div>
              {watch('role') && (
                <p className="mt-1 text-sm text-gray-600">
                  {roleDescriptions[watch('role') as keyof typeof roleDescriptions]}
                </p>
              )}
              {errors.role && (
                <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="label">
                Şifre
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Şifre gereklidir',
                    minLength: {
                      value: 6,
                      message: 'Şifre en az 6 karakter olmalıdır'
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z\d]).{6,}$/,
                      message: 'Şifre en az bir küçük harf ve bir büyük harf/rakam içermelidir'
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  className={`input pl-10 pr-10 ${errors.password ? 'input-error' : ''}`}
                  placeholder="Şifrenizi girin"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">
                Şifre Tekrarı
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register('confirmPassword', {
                    required: 'Şifre tekrarı gereklidir',
                    validate: (value) => value === password || 'Şifreler eşleşmiyor'
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  className={`input pl-10 ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="Şifrenizi tekrar girin"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner size="small" className="text-white" text="" />
                ) : (
                  'Kayıt Ol'
                )}
              </button>
            </div>
          </form>

          {/* Role Information */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Rol Açıklamaları:
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 rounded-md">
                <div className="font-medium text-red-900 text-sm">Admin</div>
                <div className="text-red-700 text-xs">
                  Tüm sistem yetkilerine sahip, kullanıcı yönetimi yapabilir
                </div>
              </div>
              <div className="p-3 bg-yellow-50 rounded-md">
                <div className="font-medium text-yellow-900 text-sm">Görevli</div>
                <div className="text-yellow-700 text-xs">
                  Veri girişi yapabilir, hane ve kişi bilgilerini yönetebilir
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="font-medium text-green-900 text-sm">Gözlemci</div>
                <div className="text-green-700 text-xs">
                  Sadece verileri görüntüleyebilir, raporlara erişebilir
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register 