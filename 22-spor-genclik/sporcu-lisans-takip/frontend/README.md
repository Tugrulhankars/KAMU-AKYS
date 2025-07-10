# Sporcu Lisans Takip Sistemi - Frontend

Bu proje, Sporcu Lisans Takip Sistemi'nin React Vite ile geliştirilmiş modern frontend uygulamasıdır.

## 🚀 Özellikler

- **Modern UI/UX**: Tailwind CSS ile tasarlanmış responsive arayüz
- **TypeScript**: Tip güvenliği için TypeScript kullanımı
- **React Query**: Veri yönetimi ve cache için React Query
- **React Router**: Sayfa yönlendirmeleri için React Router
- **Form Yönetimi**: React Hook Form ile form validasyonu
- **Bildirimler**: React Hot Toast ile kullanıcı bildirimleri
- **İkonlar**: Lucide React ikonları
- **Dosya Yükleme**: Drag & drop dosya yükleme desteği
- **QR Kod**: Lisans QR kod görüntüleme
- **PDF İndirme**: Lisans PDF indirme özelliği

## 📋 Gereksinimler

- Node.js 16+ 
- npm veya yarn

## 🛠️ Kurulum

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
│   └── Layout.tsx      # Ana layout bileşeni
├── pages/              # Sayfa bileşenleri
│   ├── Login.tsx       # Giriş sayfası
│   ├── Dashboard.tsx   # Ana dashboard
│   ├── Athletes.tsx    # Sporcular listesi
│   ├── Licenses.tsx    # Lisanslar listesi
│   ├── Sports.tsx      # Sporlar listesi
│   ├── Clubs.tsx       # Kulüpler listesi
│   └── Users.tsx       # Kullanıcılar listesi
├── services/           # API servisleri
│   └── api.ts          # API çağrıları
├── types/              # TypeScript tip tanımları
│   └── index.ts        # Tüm tip tanımları
├── utils/              # Yardımcı fonksiyonlar
│   └── helpers.ts      # Genel yardımcı fonksiyonlar
├── App.tsx             # Ana uygulama bileşeni
└── main.tsx            # Uygulama giriş noktası
```

## 🎨 Kullanılan Teknolojiler

- **React 18**: Modern React hooks ve özellikleri
- **Vite**: Hızlı build tool
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **React Query**: Veri yönetimi
- **React Router**: Sayfa yönlendirmeleri
- **React Hook Form**: Form yönetimi
- **React Hot Toast**: Bildirimler
- **Lucide React**: İkonlar
- **Axios**: HTTP istekleri
- **date-fns**: Tarih işlemleri
- **clsx & tailwind-merge**: CSS class yönetimi

## 🔧 API Entegrasyonu

Frontend, backend API'si ile tam entegre çalışır:

- **Auth API**: Giriş, kayıt, şifre değiştirme
- **User API**: Kullanıcı yönetimi
- **Athlete API**: Sporcu CRUD işlemleri
- **License API**: Lisans yönetimi
- **Sport API**: Spor dalı yönetimi
- **Club API**: Kulüp yönetimi

## 🎯 Özellikler

### 🔐 Kimlik Doğrulama
- JWT token tabanlı kimlik doğrulama
- Otomatik token yenileme
- Güvenli çıkış işlemi

### 👥 Sporcu Yönetimi
- Sporcu listesi görüntüleme
- Yeni sporcu ekleme
- Sporcu bilgilerini düzenleme
- Sporcu fotoğrafı yükleme
- Sporcu arama ve filtreleme

### 📄 Lisans Yönetimi
- Lisans listesi görüntüleme
- Yeni lisans oluşturma
- Lisans yenileme
- Lisans askıya alma/iptal etme
- QR kod görüntüleme
- PDF indirme

### 🏆 Spor Dalı Yönetimi
- Spor dalı listesi
- Yeni spor dalı ekleme
- Spor dalı düzenleme
- İkon yükleme

### 🏢 Kulüp Yönetimi
- Kulüp listesi
- Yeni kulüp ekleme
- Kulüp bilgilerini düzenleme
- Logo yükleme

### 📊 Dashboard
- Genel istatistikler
- Yaklaşan lisans süreleri
- Hızlı işlemler
- Son aktiviteler

## 🚀 Build ve Deployment

### Geliştirme
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

### Lint
```bash
npm run lint
```

## 🔧 Konfigürasyon

### Environment Variables
`.env` dosyası oluşturun:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Vite Config
`vite.config.ts` dosyasında proxy ayarları:

```typescript
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
```

## 🎨 Tema ve Stil

### Renk Paleti
- **Primary**: Mavi tonları (#3b82f6)
- **Secondary**: Gri tonları (#64748b)
- **Success**: Yeşil (#10b981)
- **Warning**: Sarı (#f59e0b)
- **Error**: Kırmızı (#ef4444)

### Responsive Tasarım
- Mobile-first yaklaşım
- Tablet ve desktop uyumlu
- Sidebar mobilde hamburger menü

## 🔒 Güvenlik

- JWT token tabanlı kimlik doğrulama
- API isteklerinde otomatik token ekleme
- 401 hatalarında otomatik logout
- Form validasyonu
- XSS koruması

## 📱 Mobil Uyumluluk

- Responsive tasarım
- Touch-friendly arayüz
- Mobil optimizasyonu
- Progressive Web App (PWA) hazır

## 🧪 Test

```bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e
```

## 📦 Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje Sahibi**: Kamu Kurumları
- **E-posta**: info@spor.gov.tr
- **Website**: https://spor.gov.tr

## 🙏 Teşekkürler

- React ekibi
- Vite ekibi
- Tailwind CSS ekibi
- Tüm açık kaynak katkıda bulunanlar 