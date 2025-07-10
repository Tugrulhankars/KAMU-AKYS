# Gençlik Kampı Yönetim Sistemi - Frontend

Bu proje, gençlik kampı yönetim sistemi için modern ve kullanıcı dostu bir React frontend uygulamasıdır.

## 🚀 Özellikler

- **Modern UI/UX**: Tailwind CSS ile tasarlanmış modern ve responsive arayüz
- **TypeScript**: Tip güvenliği için TypeScript kullanımı
- **React Query**: Veri yönetimi ve caching için TanStack Query
- **Form Yönetimi**: React Hook Form ve Zod validasyonu
- **Routing**: React Router DOM ile sayfa yönetimi
- **State Management**: Context API ile global state yönetimi
- **Bildirimler**: React Hot Toast ile kullanıcı bildirimleri
- **İkonlar**: Lucide React ikonları
- **Tarih İşlemleri**: Date-fns ile tarih formatlama
- **Dosya Yükleme**: Drag & drop dosya yükleme desteği

## 🛠️ Teknoloji Yığını

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool ve dev server
- **Tailwind CSS** - CSS framework
- **React Router DOM** - Routing
- **TanStack Query** - Veri yönetimi
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validasyonu
- **React Hot Toast** - Bildirimler
- **Lucide React** - İkonlar
- **Date-fns** - Tarih işlemleri
- **Axios** - HTTP client

## 📦 Kurulum

### Gereksinimler

- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

3. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── ui/             # Temel UI bileşenleri
│   ├── Layout.tsx      # Ana layout
│   └── ProtectedRoute.tsx
├── contexts/           # React Context'ler
│   └── AuthContext.tsx
├── pages/              # Sayfa bileşenleri
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Camps.tsx
│   ├── Participants.tsx
│   ├── Activities.tsx
│   ├── Registrations.tsx
│   └── Users.tsx
├── services/           # API servisleri
│   └── api.ts
├── types/              # TypeScript tip tanımları
│   └── index.ts
├── utils/              # Yardımcı fonksiyonlar
│   └── helpers.ts
├── App.tsx             # Ana uygulama bileşeni
└── main.tsx           # Giriş noktası
```

## 🎨 Bileşenler

### UI Bileşenleri

- **Button**: Farklı varyantlar ve boyutlarda buton
- **Input**: Form giriş alanları
- **Card**: Kart bileşenleri
- **Modal**: Modal dialog'lar
- **Table**: Veri tabloları
- **Badge**: Durum etiketleri

### Sayfa Bileşenleri

- **Dashboard**: Ana dashboard sayfası
- **Login/Register**: Kimlik doğrulama sayfaları
- **Camps**: Kamp yönetimi
- **Participants**: Katılımcı yönetimi
- **Activities**: Aktivite yönetimi
- **Registrations**: Kayıt yönetimi
- **Users**: Kullanıcı yönetimi

## 🔧 Konfigürasyon

### Environment Variables

`.env` dosyası oluşturun:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Gençlik Kampı Yönetim Sistemi
```

### Vite Konfigürasyonu

`vite.config.ts` dosyasında proxy ayarları:

```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda çalışacak şekilde tasarlanmıştır:

- **Desktop**: Tam özellikli arayüz
- **Tablet**: Optimize edilmiş tablet görünümü
- **Mobile**: Mobil uyumlu arayüz

## 🔐 Kimlik Doğrulama

- JWT tabanlı kimlik doğrulama
- Otomatik token yenileme
- Korumalı route'lar
- Rol bazlı erişim kontrolü

## 📊 Veri Yönetimi

- TanStack Query ile veri caching
- Optimistic updates
- Error handling
- Loading states

## 🎯 Kullanım

### Giriş Yapma

1. `/login` sayfasına gidin
2. E-posta ve şifrenizi girin
3. "Giriş Yap" butonuna tıklayın

### Kamp Yönetimi

1. Sol menüden "Kamplar" seçin
2. Kamp listesini görüntüleyin
3. "Yeni Kamp" butonu ile kamp ekleyin
4. Kamp detaylarını düzenleyin

### Katılımcı Yönetimi

1. "Katılımcılar" sayfasına gidin
2. Katılımcı listesini görüntüleyin
3. Yeni katılımcı ekleyin
4. Katılımcı bilgilerini güncelleyin

## 🚀 Build ve Deploy

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Docker ile Deploy

```bash
# Docker image oluştur
docker build -t genclik-kampi-frontend .

# Container çalıştır
docker run -p 3000:3000 genclik-kampi-frontend
```

## 🧪 Test

```bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📝 API Entegrasyonu

Backend API ile entegrasyon için `src/services/api.ts` dosyasını kullanın:

```typescript
import { apiService } from '@/services/api';

// Kamp listesi al
const camps = await apiService.getCamps();

// Yeni kamp oluştur
const newCamp = await apiService.createCamp(campData);
```

## 🎨 Tema Özelleştirme

Tailwind CSS ile tema özelleştirmesi:

```css
/* tailwind.config.js */
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        600: '#2563eb',
      }
    }
  }
}
```

## 🔧 Geliştirme

### Yeni Sayfa Ekleme

1. `src/pages/` klasöründe yeni sayfa oluşturun
2. `src/App.tsx` dosyasına route ekleyin
3. Layout'a menü öğesi ekleyin

### Yeni Bileşen Ekleme

1. `src/components/` klasöründe bileşen oluşturun
2. TypeScript tip tanımlarını ekleyin
3. Stil ve işlevsellik ekleyin

### API Entegrasyonu

1. `src/services/api.ts` dosyasına yeni metod ekleyin
2. `src/types/index.ts` dosyasına tip tanımları ekleyin
3. Sayfada useQuery ile kullanın

## 📚 Dokümantasyon

- [React Dokümantasyonu](https://react.dev/)
- [TypeScript Dokümantasyonu](https://www.typescriptlang.org/)
- [Tailwind CSS Dokümantasyonu](https://tailwindcss.com/)
- [TanStack Query Dokümantasyonu](https://tanstack.com/query)

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **E-posta**: info@genclikkampi.com
- **Website**: https://genclikkampi.com
- **GitHub**: https://github.com/genclikkampi

## 🙏 Teşekkürler

- React ekibi
- Tailwind CSS ekibi
- TanStack ekibi
- Tüm katkıda bulunanlara 