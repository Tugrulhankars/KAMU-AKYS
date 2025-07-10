# Antrenör Eğitim Takip Sistemi - Frontend

Bu proje, antrenör eğitim takip sistemi için modern ve kullanıcı dostu bir React frontend uygulamasıdır.

## 🚀 Özellikler

- **Modern UI/UX**: Material-UI ile tasarlanmış modern arayüz
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu
- **Kimlik Doğrulama**: JWT tabanlı güvenli giriş sistemi
- **Rol Tabanlı Erişim**: Admin, Yönetici ve Antrenör rolleri
- **Gerçek Zamanlı Veri**: Backend API ile entegre
- **Arama ve Filtreleme**: Gelişmiş arama özellikleri
- **Tema Desteği**: Özelleştirilebilir tema sistemi

## 📋 Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn
- Backend API (çalışır durumda olmalı)

## 🛠️ Kurulum

1. **Projeyi klonlayın:**
```bash
cd frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:5173
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   └── Layout/         # Layout bileşenleri
│       ├── Header.jsx  # Üst menü
│       └── Sidebar.jsx # Yan menü
├── contexts/           # React Context'leri
│   └── AuthContext.jsx # Kimlik doğrulama context'i
├── pages/              # Sayfa bileşenleri
│   ├── Login.jsx       # Giriş sayfası
│   ├── Dashboard.jsx   # Ana kontrol paneli
│   └── Antrenorler.jsx # Antrenör yönetimi
├── services/           # API servisleri
│   └── api.js         # API entegrasyonu
├── App.jsx            # Ana uygulama bileşeni
└── main.jsx           # Uygulama giriş noktası
```

## 🔧 Konfigürasyon

### API URL Ayarları

`src/services/api.js` dosyasında backend API URL'sini ayarlayın:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Tema Özelleştirme

`src/App.jsx` dosyasında tema ayarlarını değiştirebilirsiniz:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    // Diğer tema ayarları...
  },
});
```

## 📱 Kullanım

### Giriş Yapma
1. `/login` sayfasına gidin
2. E-posta ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

### Antrenör Yönetimi
1. Sol menüden "Antrenörler" seçin
2. Antrenör listesini görüntüleyin
3. Arama ve filtreleme yapın
4. Yeni antrenör ekleyin veya mevcutları düzenleyin

### Dashboard
- Sistem genel istatistiklerini görüntüleyin
- Son aktiviteleri takip edin
- Hızlı işlemler yapın

## 🔐 Güvenlik

- JWT token tabanlı kimlik doğrulama
- Rol tabanlı erişim kontrolü
- Güvenli API iletişimi
- Otomatik token yenileme

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: #1976d2 (Mavi)
- **Secondary**: #dc004e (Kırmızı)
- **Background**: #f5f5f5 (Açık gri)

### Tipografi
- **Font**: Roboto
- **Başlıklar**: 600 font weight
- **Metin**: Normal font weight

### Bileşenler
- **Kartlar**: 12px border radius
- **Butonlar**: 8px border radius
- **Gölgeler**: Subtle shadow efektleri

## 📊 Performans

- **Code Splitting**: Sayfa bazlı kod bölme
- **Lazy Loading**: Gerektiğinde yükleme
- **Memoization**: Gereksiz render'ları önleme
- **Optimized Images**: Optimize edilmiş görseller

## 🧪 Test

```bash
# Test çalıştırma
npm test

# Test coverage
npm run test:coverage
```

## 📦 Build

```bash
# Production build
npm run build

# Build preview
npm run preview
```

## 🚀 Deployment

### Vercel
1. Vercel hesabı oluşturun
2. GitHub repo'nuzu bağlayın
3. Otomatik deployment

### Netlify
1. Netlify hesabı oluşturun
2. Build komutunu ayarlayın: `npm run build`
3. Publish directory: `dist`

## 🔧 Geliştirme

### Yeni Sayfa Ekleme
1. `src/pages/` klasöründe yeni bileşen oluşturun
2. `src/App.jsx` dosyasında route ekleyin
3. `src/components/Layout/Sidebar.jsx` dosyasında menü öğesi ekleyin

### Yeni API Endpoint Ekleme
1. `src/services/api.js` dosyasında yeni fonksiyon ekleyin
2. İlgili sayfada API çağrısını kullanın

### Tema Değişiklikleri
1. `src/App.jsx` dosyasında tema ayarlarını güncelleyin
2. Gerekirse `src/index.css` dosyasında özel stiller ekleyin

## 📝 Notlar

- Backend API'nin çalışır durumda olması gerekiyor
- CORS ayarlarının doğru yapılandırılması gerekiyor
- Environment variables kullanımı önerilir

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Proje hakkında sorularınız için:
- Email: [email@example.com]
- GitHub Issues: [Proje Issues Sayfası]
