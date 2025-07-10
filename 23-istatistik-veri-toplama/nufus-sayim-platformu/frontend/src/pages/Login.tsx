import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/AuthContext'
import { LoginData } from '../types'
import { Eye, EyeOff, BarChart3, User, Lock } from 'lucide-react'
import LoadingSpinner from '../components/LoadingSpinner'

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  const onSubmit = async (data: LoginData) => {
    try {
      setIsLoading(true)
      await login(data)
      const user = JSON.parse(localStorage.getItem('auth-user') || '{}')
      if (user.role === 'Admin') navigate('/admin')
      else if (user.role === 'Görevli') navigate('/officer')
      else if (user.role === 'Gözlemci') navigate('/viewer')
      else navigate('/')
    } catch (error) {
      // Error is handled by the auth context
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    { username: 'admin', password: 'admin123', role: 'Admin' },
    { username: 'officer', password: 'officer123', role: 'Görevli' },
    { username: 'viewer', password: 'viewer123', role: 'Gözlemci' },
  ]

  const fillDemoData = (username: string, password: string) => {
    const usernameInput = document.getElementById('username') as HTMLInputElement
    const passwordInput = document.getElementById('password') as HTMLInputElement
    
    if (usernameInput && passwordInput) {
      usernameInput.value = username
      passwordInput.value = password
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <BarChart3 className="h-12 w-12 text-primary-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Hesabınıza Giriş Yapın
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Henüz hesabınız yok mu?{' '}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            Kayıt olun
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
                    }
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
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
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <LoadingSpinner size="small" className="text-white" text="" />
                ) : (
                  'Giriş Yap'
                )}
              </button>
            </div>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 border-t pt-8">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Demo Hesapları:
            </h3>
            <div className="space-y-2">
              {demoAccounts.map((account, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => fillDemoData(account.username, account.password)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {account.username}
                      </div>
                      <div className="text-xs text-gray-500">
                        {account.role}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Kullanmak için tıklayın
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-500 text-center">
              Demo hesapları otomatik olarak form alanlarını dolduracaktır
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login 