# Antrenör Eğitim Takip Sistemi

Bu proje, antrenörlerin eğitim süreçlerini, sertifikalarını, performanslarını ve gelişimlerini takip etmek için geliştirilmiş kapsamlı bir yönetim sistemidir.

## 🎯 Proje Amacı

Antrenör eğitim takip sistemi, spor kurumlarının antrenörlerinin:
- Eğitim süreçlerini planlamak ve takip etmek
- Sertifika ve lisans durumlarını yönetmek
- Performans değerlendirmelerini yapmak
- Gelişim hedeflerini belirlemek ve izlemek
- Sporcu antrenör ilişkilerini yönetmek
- Raporlama ve analiz yapmak

için kullanabilecekleri modern bir web uygulamasıdır.

## 🚀 Özellikler

### 👥 Kullanıcı Yönetimi
- JWT tabanlı kimlik doğrulama
- Rol bazlı yetkilendirme (Admin, Yönetici, Antrenör)
- Kullanıcı profil yönetimi
- Şifre değiştirme

### 🏃‍♂️ Antrenör Yönetimi
- Antrenör kayıt ve profil yönetimi
- Lisans ve sertifika takibi
- Uzmanlık alanları
- Deneyim geçmişi
- Detaylı bilgi yönetimi

### 📚 Eğitim Yönetimi
- Eğitim programları oluşturma
- Kategori bazlı eğitim organizasyonu
- Modül ve içerik yönetimi
- Eğitim kayıtları
- Devam takibi
- Tamamlama durumu
- Not ve değerlendirme sistemi

### 🏆 Sertifika Yönetimi
- Sertifika türleri ve kategorileri
- Sertifika kurumları
- Geçerlilik takibi
- Yaklaşan son kullanma tarihi uyarıları
- Sertifika yenileme süreçleri

### 📊 Performans Yönetimi
- Performans kriterleri tanımlama
- Düzenli değerlendirmeler
- Hedef belirleme ve takip
- Gelişim analizi
- Performans raporları

### 🏅 Sporcu Yönetimi
- Sporcu kayıtları
- Antrenör-sporcu ilişkileri
- Sporcu performans takibi
- Veli bilgileri
- Sağlık durumu takibi

### 📈 Raporlama ve Analiz
- İstatistiksel raporlar
- Excel ve PDF export
- Performans analizleri
- Eğitim raporları
- Sertifika durum raporları

### 🔧 Sistem Yönetimi
- Log yönetimi
- Sistem ayarları
- Bildirim sistemi
- Dosya yönetimi
- Yedekleme ve güvenlik

## 🛠️ Teknoloji Yığını

### Backend
- **.NET 8** - Ana framework
- **ASP.NET Core Web API** - RESTful API
- **Entity Framework Core** - ORM
- **SQL Server** - Veritabanı
- **JWT** - Kimlik doğrulama
- **AutoMapper** - Object mapping
- **Serilog** - Loglama
- **Swagger** - API dokümantasyonu

### Frontend (Planlanan)
- **React** - UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Query** - State management
- **React Router** - Routing
- **React Hook Form** - Form yönetimi
- **Zod** - Validasyon

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Git** - Version control

## 📋 Gereksinimler

- .NET 8 SDK
- SQL Server 2022
- Docker (opsiyonel)
- Visual Studio 2022 veya VS Code

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd antrenor-egitim-takip
```

### 2. Veritabanı Kurulumu

#### SQL Server ile
```bash
# Connection string'i güncelleyin
# appsettings.json dosyasında:
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=AntrenorEgitimTakipDB;Trusted_Connection=true;TrustServerCertificate=true;MultipleActiveResultSets=true"
}
```

#### Docker ile
```bash
docker-compose up -d db
```

### 3. Migration'ları Çalıştırın
```bash
cd AntrenorEgitimTakip.API
dotnet ef database update
```

### 4. Uygulamayı Çalıştırın

#### Geliştirme Modu
```bash
dotnet run
```

#### Docker ile
```bash
docker-compose up -d
```

### 5. API Dokümantasyonu
Uygulama çalıştıktan sonra Swagger dokümantasyonuna erişin:
```
https://localhost:5001/swagger
```

## 📁 Proje Yapısı

```
antrenor-egitim-takip/
├── AntrenorEgitimTakip.API/          # Ana API projesi
│   ├── Controllers/                   # API Controller'ları
│   ├── Data/                         # Entity Framework
│   ├── Models/                       # Veritabanı modelleri
│   ├── DTOs/                         # Data Transfer Objects
│   ├── Services/                     # İş mantığı servisleri
│   ├── Middleware/                   # Custom middleware'ler
│   ├── AutoMapper/                   # Mapping profilleri
│   └── wwwroot/                      # Statik dosyalar
├── Dockerfile                        # Docker konfigürasyonu
├── docker-compose.yml               # Docker Compose
└── README.md                        # Proje dokümantasyonu
```

## 🔐 Güvenlik

- JWT tabanlı kimlik doğrulama
- Rol bazlı yetkilendirme
- Şifre hashleme (BCrypt)
- CORS politikası
- Input validasyonu
- SQL injection koruması

## 📊 Veritabanı Şeması

### Ana Tablolar
- **Users** - Kullanıcı bilgileri
- **Roles** - Roller
- **UserRoles** - Kullanıcı-rol ilişkileri
- **Antrenorler** - Antrenör bilgileri
- **Egitimler** - Eğitim programları
- **Sertifikalar** - Sertifika bilgileri
- **Performanslar** - Performans değerlendirmeleri
- **Sporcular** - Sporcu bilgileri

### İlişkisel Tablolar
- **EgitimKayitlari** - Eğitim kayıtları
- **EgitimModulleri** - Eğitim modülleri
- **EgitimIcerikleri** - Eğitim içerikleri
- **PerformansKriterleri** - Performans kriterleri
- **SertifikaTurleri** - Sertifika türleri

## 🔄 API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/login` - Giriş
- `POST /api/auth/register` - Kayıt
- `GET /api/auth/me` - Mevcut kullanıcı
- `POST /api/auth/change-password` - Şifre değiştirme

### Antrenör Yönetimi
- `GET /api/antrenor` - Tüm antrenörler
- `GET /api/antrenor/{id}` - Antrenör detayı
- `POST /api/antrenor` - Yeni antrenör
- `PUT /api/antrenor/{id}` - Antrenör güncelleme
- `DELETE /api/antrenor/{id}` - Antrenör silme

### Eğitim Yönetimi
- `GET /api/egitim` - Tüm eğitimler
- `GET /api/egitim/{id}` - Eğitim detayı
- `POST /api/egitim` - Yeni eğitim
- `PUT /api/egitim/{id}` - Eğitim güncelleme
- `DELETE /api/egitim/{id}` - Eğitim silme

### Sertifika Yönetimi
- `GET /api/sertifika` - Tüm sertifikalar
- `GET /api/sertifika/{id}` - Sertifika detayı
- `POST /api/sertifika` - Yeni sertifika
- `PUT /api/sertifika/{id}` - Sertifika güncelleme
- `DELETE /api/sertifika/{id}` - Sertifika silme

### Performans Yönetimi
- `GET /api/performans` - Tüm performanslar
- `GET /api/performans/{id}` - Performans detayı
- `POST /api/performans` - Yeni performans
- `PUT /api/performans/{id}` - Performans güncelleme
- `DELETE /api/performans/{id}` - Performans silme

## 🧪 Test

```bash
# Unit testleri çalıştırma
dotnet test

# Integration testleri
dotnet test --filter Category=Integration
```

## 📈 Performans

- Entity Framework Core optimizasyonları
- Lazy loading
- Eager loading
- Query optimization
- Caching stratejileri

## 🔧 Konfigürasyon

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=AntrenorEgitimTakipDB;Trusted_Connection=true;TrustServerCertificate=true;MultipleActiveResultSets=true"
  },
  "JwtSettings": {
    "SecretKey": "YourSecretKey",
    "Issuer": "AntrenorEgitimTakip",
    "Audience": "AntrenorEgitimTakipUsers",
    "ExpirationHours": 24
  },
  "FileStorage": {
    "BasePath": "wwwroot/uploads",
    "MaxFileSize": 10485760,
    "AllowedExtensions": [".jpg", ".jpeg", ".png", ".pdf", ".doc", ".docx"]
  }
}
```

## 🚀 Deployment

### Production
```bash
# Build
dotnet publish -c Release

# Docker ile deployment
docker build -t antrenor-egitim-takip .
docker run -p 80:80 antrenor-egitim-takip
```

### Azure Deployment
```bash
# Azure App Service'e deploy
az webapp up --name antrenor-egitim-takip --resource-group myResourceGroup --runtime "DOTNETCORE:8.0"
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- Proje Linki: [https://github.com/username/antrenor-egitim-takip](https://github.com/username/antrenor-egitim-takip)
- E-posta: info@antrenoregitimtakip.com

## 🙏 Teşekkürler

Bu proje, spor kurumlarının antrenör eğitim süreçlerini dijitalleştirmek ve daha etkili hale getirmek amacıyla geliştirilmiştir.

---

**Not:** Bu proje geliştirme aşamasındadır. Production kullanımı için ek güvenlik önlemleri ve testler gereklidir.
