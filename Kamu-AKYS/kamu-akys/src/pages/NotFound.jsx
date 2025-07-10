import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center py-20">
      <h1 className="text-6xl font-extrabold text-[#2563eb] mb-4">404</h1>
      <h2 className="text-2xl font-bold mb-2">Sayfa Bulunamadı</h2>
      <p className="text-gray-500 mb-8">Üzgünüz, aradığınız sayfa mevcut değil veya adresi yanlış girdiniz.</p>
      <Link to="/" className="px-6 py-3 rounded-full bg-[#2563eb] text-white font-semibold shadow hover:bg-[#1e40af] transition">Anasayfaya Dön</Link>
    </div>
  );
} 