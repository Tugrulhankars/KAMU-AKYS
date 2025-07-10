# KAMU AKYS - Açık Veri Portalı

KAMU AKYS projesi kapsamında geliştirilen modern açık veri portalı. Kamu kurumları için şeffaflık ve veri erişilebilirliği sağlayan kapsamlı platform.

## 🚀 Özellikler

### 🔐 Güvenlik ve Kimlik Doğrulama
- JWT tabanlı kimlik doğrulama
- Rol tabanlı yetkilendirme (Admin, User)
- Güvenli API endpoint'leri
- Şifre hashleme ve güvenlik önlemleri

### 📊 Veri Yönetimi
- Veri seti yükleme ve yönetimi
- Kategori sistemi
- Dosya formatı desteği (CSV, JSON, XML, Excel)
- Metadata yönetimi
- Versiyon kontrolü

### 🔍 Arama ve Filtreleme
- Gelişmiş arama fonksiyonu
- Kategori bazlı filtreleme
- Tarih aralığı filtreleme
- Format bazlı filtreleme

### 📈 Analitik ve Raporlama
- İndirme istatistikleri
- Kullanıcı aktivite takibi
- Popüler veri setleri
- Dashboard raporları

### 🎨 Modern Kullanıcı Arayüzü
- Responsive tasarım
- Modern animasyonlar
- Kullanıcı dostu arayüz
- Dark/Light tema desteği

## 🛠️ Teknolojiler

### Backend
- **.NET 8.0 Web API**
- **Entity Framework Core**
- **SQL Server**
- **JWT Authentication**
- **Swagger/OpenAPI**
- **Docker**

### Frontend
- **React 18**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **React Router**
- **Axios**

## 📁 Proje Yapısı

```
acik-veri-portali/
├── backend/
│   ├── AcikVeriPortal.API/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Data/
│   │   └── Middleware/
│   ├── docker-compose.yml
│   └── Dockerfile
├── frontend/
│   ├── acik-veri-portali/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── contexts/
│   │   │   ├── services/
│   │   │   └── assets/
│   │   ├── package.json
│   │   └── vite.config.js
│   └── README.md
└── README.md
```

## 🚀 Kurulum

### Backend Kurulumu

1. **Gereksinimler**
   - .NET 8.0 SDK
   - SQL Server
   - Docker (opsiyonel)

2. **Veritabanı Kurulumu**
   ```bash
   cd backend
   dotnet ef database update
   ```

3. **API Çalıştırma**
   ```bash
   cd backend/AcikVeriPortal.API
   dotnet run
   ```

4. **Docker ile Çalıştırma**
   ```bash
   cd backend
   docker-compose up -d
   ```

### Frontend Kurulumu

1. **Bağımlılıkları Yükleme**
   ```bash
   cd frontend/acik-veri-portali
   npm install
   ```

2. **Geliştirme Sunucusunu Başlatma**
   ```bash
   npm run dev
   ```

3. **Production Build**
   ```bash
   npm run build
   ```

## 🔧 Konfigürasyon

### Backend Konfigürasyonu

`appsettings.json` dosyasında aşağıdaki ayarları yapılandırın:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AcikVeriPortal;Trusted_Connection=true;"
  },
  "JwtSettings": {
    "SecretKey": "your-secret-key-here",
    "Issuer": "KAMU-AKYS",
    "Audience": "KAMU-AKYS-Users",
    "ExpirationHours": 24
  },
  "FileStorage": {
    "UploadPath": "uploads",
    "MaxFileSize": 104857600
  }
}
```

### Frontend Konfigürasyonu

`.env` dosyasında API URL'ini yapılandırın:

```env
VITE_API_URL=http://localhost:5000/api
```

## 📊 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/login` - Kullanıcı girişi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/refresh` - Token yenileme

### Veri Setleri
- `GET /api/datasets` - Veri setlerini listele
- `GET /api/datasets/{id}` - Veri seti detayı
- `POST /api/datasets` - Yeni veri seti oluştur
- `PUT /api/datasets/{id}` - Veri seti güncelle
- `DELETE /api/datasets/{id}` - Veri seti sil

### Kategoriler
- `GET /api/categories` - Kategorileri listele
- `POST /api/categories` - Yeni kategori oluştur

### Kullanıcılar (Admin)
- `GET /api/users` - Kullanıcıları listele
- `PUT /api/users/{id}` - Kullanıcı güncelle
- `DELETE /api/users/{id}` - Kullanıcı sil

## 🎨 Kullanıcı Arayüzü

### Ana Sayfalar
- **Ana Sayfa** - Hero section ve özellikler
- **Veri Setleri** - Tüm veri setlerini görüntüleme
- **Kategoriler** - Kategori bazlı filtreleme
- **Arama** - Gelişmiş arama sayfası

### Kullanıcı Sayfaları
- **Dashboard** - Kullanıcı paneli
- **Profil** - Kullanıcı profil yönetimi
- **Ayarlar** - Hesap ayarları

### Admin Sayfaları
- **Kullanıcı Yönetimi** - Kullanıcı işlemleri
- **Sistem Ayarları** - Platform ayarları

## 🔒 Güvenlik

- JWT token tabanlı kimlik doğrulama
- Role-based access control (RBAC)
- API rate limiting
- CORS yapılandırması
- Input validation ve sanitization
- SQL injection koruması

## 📈 Performans

- Entity Framework Core optimizasyonu
- API response caching
- Frontend lazy loading
- Image optimization
- Bundle splitting

## 🧪 Test

### Backend Testleri
```bash
cd backend
dotnet test
```

### Frontend Testleri
```bash
cd frontend/acik-veri-portali
npm test
```

## 📝 Lisans

Bu proje KAMU AKYS projesi kapsamında geliştirilmiştir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

- **E-posta**: info@kamuakys.gov.tr
- **Telefon**: +90 (212) 123 45 67
- **Adres**: Ankara, Türkiye

## 🙏 Teşekkürler

KAMU AKYS projesi kapsamında geliştirilen bu açık veri portalı, kamu kurumlarının şeffaflık ve veri erişilebilirliği ihtiyaçlarını karşılamak üzere tasarlanmıştır.
