import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ChartBarIcon,
  CubeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CubeIcon className="h-7 w-7 text-blue-800" />
            <span className="text-xl font-bold tracking-tight text-blue-900">Kamu Stok Yönetimi</span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/dashboard" className="px-5 py-2 rounded bg-blue-800 text-white font-semibold hover:bg-blue-900 transition-colors">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 rounded text-blue-800 font-medium hover:bg-blue-50 transition-colors">Giriş Yap</Link>
                <Link to="/register" className="px-5 py-2 rounded bg-blue-700 text-white font-semibold hover:bg-blue-900 transition-colors">Kayıt Ol</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4 tracking-tight">Kamuya Yakışır Stok Yönetimi</h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">Kamu kurumları için güvenli, şeffaf ve verimli stok yönetim platformu. Dijitalleşen süreçlerle işlerinizi kolaylaştırın.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          {isAuthenticated ? (
            <Link to="/dashboard" className="px-8 py-3 rounded bg-blue-800 text-white text-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center">
              Dashboard'a Git
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          ) : (
            <>
              <Link to="/login" className="px-8 py-3 rounded bg-blue-700 text-white text-lg font-semibold hover:bg-blue-900 transition-colors flex items-center justify-center">
                Hemen Başlayın
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/register" className="px-8 py-3 rounded border border-blue-800 text-blue-800 text-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                Hesap Oluştur
              </Link>
            </>
          )}
        </div>
        {/* Demo Hesaplar Bilgi Kutusu */}
        <div className="inline-block bg-gray-100 border border-gray-200 rounded px-6 py-4 shadow-sm mb-4">
          <span className="block text-xs text-gray-500 mb-1 font-semibold">Demo Hesaplar:</span>
          <div className="flex flex-col sm:flex-row gap-4 text-xs text-gray-700">
            <span><b>Admin:</b> admin / admin123</span>
            <span><b>Depo Görevlisi:</b> depo / depo123</span>
            <span><b>İnceleme Yetkilisi:</b> inceleme / inceleme123</span>
          </div>
        </div>
      </section>

      {/* Özellikler - Kurumsal Bloklar */}
      <section className="max-w-5xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-2">
        <div className="flex items-center gap-4 p-6 bg-white rounded border border-gray-200 shadow-sm">
          <CubeIcon className="h-8 w-8 text-blue-700" />
          <div>
            <h3 className="text-base font-semibold text-blue-900 mb-1">Ürün Yönetimi</h3>
            <p className="text-gray-700 text-sm">Ürünlerinizi kategorilere ayırın, barkod ile takip edin, stok seviyelerini izleyin.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white rounded border border-gray-200 shadow-sm">
          <ChartBarIcon className="h-8 w-8 text-blue-700" />
          <div>
            <h3 className="text-base font-semibold text-blue-900 mb-1">Stok Takibi</h3>
            <p className="text-gray-700 text-sm">Stok giriş-çıkış işlemlerini kaydedin, hareketleri anlık olarak takip edin.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white rounded border border-gray-200 shadow-sm">
          <DocumentTextIcon className="h-8 w-8 text-blue-700" />
          <div>
            <h3 className="text-base font-semibold text-blue-900 mb-1">Raporlama</h3>
            <p className="text-gray-700 text-sm">Detaylı raporlar ve analizlerle kararlarınızı veriye dayandırın.</p>
          </div>
        </div>
        <div className="flex items-center gap-4 p-6 bg-white rounded border border-gray-200 shadow-sm">
          <ShieldCheckIcon className="h-8 w-8 text-blue-700" />
          <div>
            <h3 className="text-base font-semibold text-blue-900 mb-1">Rol Bazlı Güvenlik</h3>
            <p className="text-gray-700 text-sm">Kullanıcı rolleri ve izinleriyle verilerinizi güvenle koruyun.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">Kamu için şeffaflık ve verimlilik!</h3>
        <p className="text-gray-700 mb-6">Kurumsal stok süreçlerinizi dijitalleştirin, verimliliği artırın.</p>
        <Link to={isAuthenticated ? "/dashboard" : "/register"} className="inline-block px-8 py-3 rounded bg-blue-800 text-white text-lg font-semibold hover:bg-blue-900 transition-colors">{isAuthenticated ? "Dashboard'a Git" : "Hemen Kayıt Ol"}</Link>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <CubeIcon className="h-6 w-6 text-blue-800" />
            <span className="text-base font-bold text-blue-900">Kamu Stok Yönetimi</span>
          </div>
          <div className="text-xs text-gray-500">Kamu için şeffaflık ve verimlilik.</div>
          <div className="text-xs text-gray-500">&copy; 2024 Kamu AKYS - Tüm hakları saklıdır.</div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 