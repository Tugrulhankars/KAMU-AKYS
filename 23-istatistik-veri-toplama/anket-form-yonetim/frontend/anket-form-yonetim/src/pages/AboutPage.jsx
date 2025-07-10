import React from 'react';
import AkLogo from '../assets/Ak_dark.png';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <img 
                src={AkLogo} 
                alt="KAMU-AKYS Logo" 
                className="h-20 w-auto"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Anket Form Yönetim Sistemi
            </h1>
            <p className="text-xl text-gray-600">
              Kamu Kurumları İçin Açık Kaynak Dijital Çözüm
            </p>
          </div>

          {/* Proje Hakkında */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Proje Hakkında</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Bu proje, kamu kurumlarının dijital dönüşüm sürecinde ihtiyaç duyulan anket form yönetim çözümünü 
                açık kaynak olarak sunmayı hedeflemektedir. KAMU-AKYS (Kamu Kurumları Açık Kaynak Yazılım Sistemi) 
                projesi kapsamında geliştirilen bu modül, modern web teknolojileri kullanılarak oluşturulmuştur.
              </p>
              <p className="text-gray-700 mb-4">
                Sistem, kullanıcıların anket oluşturabilmesi, sorular ekleyebilmesi, anketleri yanıtlayabilmesi 
                ve sonuçları görüntüleyebilmesi için gerekli tüm özellikleri içermektedir.
              </p>
            </div>
          </div>

          {/* Özellikler */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Temel Özellikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-3">📊 Anket Yönetimi</h3>
                <ul className="text-blue-800 space-y-2">
                  <li>• Anket oluşturma ve düzenleme</li>
                  <li>• Soru türleri (Çoktan seçmeli, Metin, Checkbox)</li>
                  <li>• Zorunlu/opsiyonel soru işaretleme</li>
                  <li>• Soru sıralaması</li>
                </ul>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-900 mb-3">✅ Anket Yanıtlama</h3>
                <ul className="text-green-800 space-y-2">
                  <li>• Kullanıcı dostu arayüz</li>
                  <li>• Gerçek zamanlı validasyon</li>
                  <li>• Tek yanıt kontrolü</li>
                  <li>• Otomatik kaydetme</li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-3">📈 Raporlama</h3>
                <ul className="text-purple-800 space-y-2">
                  <li>• Anket yanıtlarını görüntüleme</li>
                  <li>• Yanıt istatistikleri</li>
                  <li>• Kullanıcı bazlı yanıt takibi</li>
                  <li>• Detaylı analiz raporları</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-orange-900 mb-3">🔐 Güvenlik</h3>
                <ul className="text-orange-800 space-y-2">
                  <li>• JWT tabanlı kimlik doğrulama</li>
                  <li>• Kullanıcı yönetimi</li>
                  <li>• Güvenli API endpoint'leri</li>
                  <li>• Veri şifreleme</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Teknoloji Yığını */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Teknoloji Yığını</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Backend</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• Spring Boot 3.x</p>
                  <p>• Spring Security + JWT</p>
                  <p>• JPA/Hibernate</p>
                  <p>• Swagger/OpenAPI</p>
                  <p>• Maven</p>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Frontend</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• React 18</p>
                  <p>• Vite</p>
                  <p>• Tailwind CSS</p>
                  <p>• React Router</p>
                  <p>• Axios</p>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">DevOps</h3>
                <div className="space-y-2 text-gray-600">
                  <p>• Docker</p>
                  <p>• Docker Compose</p>
                  <p>• Git</p>
                  <p>• H2/PostgreSQL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gelecek Özellikler */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gelecek Özellikler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📊</span>
                <span className="text-gray-700">Gelişmiş raporlama (grafikler, istatistikler)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📋</span>
                <span className="text-gray-700">Anket şablonları</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📧</span>
                <span className="text-gray-700">E-posta bildirimleri</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📱</span>
                <span className="text-gray-700">Mobil uygulama</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">🌐</span>
                <span className="text-gray-700">Çoklu dil desteği</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">🔐</span>
                <span className="text-gray-700">Gelişmiş yetkilendirme</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">📄</span>
                <span className="text-gray-700">Veri dışa aktarma (Excel, PDF)</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-blue-500">🔗</span>
                <span className="text-gray-700">Anket paylaşımı (link, QR kod)</span>
              </div>
            </div>
          </div>

          {/* İletişim */}
          <div className="text-center border-t pt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">İletişim</h2>
            <p className="text-gray-600 mb-4">
              Proje hakkında sorularınız için issue açabilir veya proje ekibiyle iletişime geçebilirsiniz.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://github.com/kamu-akys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                GitHub
              </a>
              <span className="text-gray-400">|</span>
              <a 
                href="mailto:info@kamu-akys.org" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                E-posta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 