# Sporcu Lisans Takip Sistemi

Bu proje, kamu kurumları için geliştirilmiş açık kaynak **Sporcu Lisans Takip Sistemi**dir. Sporcuların lisans bilgilerini, spor kulüplerini ve lisans işlemlerini dijital ortamda yönetmeyi sağlar.

## 🚀 Özellikler

### ✅ Tamamlanan Özellikler
- **Kullanıcı Yönetimi**: Kimlik doğrulama, yetkilendirme ve kullanıcı profili yönetimi
- **Sporcu Yönetimi**: Sporcu kayıt, güncelleme, arama ve fotoğraf yükleme
- **Lisans Yönetimi**: Lisans oluşturma, yenileme, askıya alma, iptal etme
- **Spor Dalı Yönetimi**: Spor türleri ve kategorileri
- **Kulüp Yönetimi**: Spor kulüpleri ve sporcu-kulüp ilişkileri
- **PDF Raporlama**: Lisans belgelerinin PDF formatında oluşturulması
- **QR Kod**: Lisans doğrulama için QR kod oluşturma
- **Dosya Yönetimi**: Fotoğraf, logo ve belge yükleme
- **RESTful API**: Tam kapsamlı API endpoints
- **JWT Authentication**: Güvenli kimlik doğrulama
- **Entity Framework**: Veritabanı yönetimi
- **AutoMapper**: Veri dönüşümleri
- **Docker Desteği**: Containerization

### 🔄 Gelecek Özellikler
- [ ] Mobil uygulama desteği
- [ ] E-posta bildirimleri
- [ ] Gelişmiş raporlama
- [ ] Dashboard ve analitik
- [ ] Toplu lisans işlemleri
- [ ] Entegrasyon API'leri

## 🛠️ Teknoloji Yığını

### Backend
- **.NET 8**: Ana framework
- **ASP.NET Core Web API**: RESTful API
- **Entity Framework Core**: ORM
- **SQL Server**: Veritabanı
- **JWT Bearer**: Kimlik doğrulama
- **AutoMapper**: Object mapping
- **iTextSharp**: PDF oluşturma
- **QRCoder**: QR kod oluşturma

### Güvenlik
- **JWT Token**: Stateless authentication
- **Identity Framework**: Kullanıcı yönetimi
- **Role-based Authorization**: Yetkilendirme

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration

## 📋 Gereksinimler

- .NET 8 SDK
- SQL Server 2022 (veya Docker)
- Docker Desktop (opsiyonel)

## 🚀 Kurulum

### 1. Projeyi Klonlayın
```bash
git clone <repository-url>
cd sporcu-lisans-takip
```

### 2. Veritabanı Bağlantısı
`SporcuLisansTakip.API/appsettings.json` dosyasındaki connection string'i güncelleyin:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SporcuLisansTakipDB;Trusted_Connection=true;MultipleActiveResultSets=true"
  }
}
```

### 3. Entity Framework Migration
```bash
cd SporcuLisansTakip.API
dotnet ef database update
```

### 4. Uygulamayı Çalıştırın
```bash
dotnet run
```

API varsayılan olarak `https://localhost:7001` adresinde çalışacaktır.

## 🐳 Docker ile Kurulum

### Docker Compose ile Hızlı Başlangıç
```bash
docker-compose up -d
```

Bu komut:
- SQL Server 2022 container'ını başlatır
- API uygulamasını build eder ve çalıştırır
- Veritabanı migration'larını otomatik uygular

### Erişim Bilgileri
- **API**: http://localhost:5000
- **Swagger UI**: http://localhost:5000/swagger
- **SQL Server**: localhost:1433

## 📚 API Dokümantasyonu

### Kimlik Doğrulama
```http
POST /api/auth/login
POST /api/auth/register
POST /api/auth/change-password
```

### Sporcu İşlemleri
```http
GET    /api/athlete
GET    /api/athlete/{id}
GET    /api/athlete/identity/{identityNumber}
POST   /api/athlete
PUT    /api/athlete/{id}
DELETE /api/athlete/{id}
POST   /api/athlete/{id}/photo
```

### Lisans İşlemleri
```http
GET    /api/license
GET    /api/license/{id}
GET    /api/license/number/{licenseNumber}
POST   /api/license
PUT    /api/license/{id}
POST   /api/license/renew
POST   /api/license/{id}/suspend
POST   /api/license/{id}/cancel
GET    /api/license/{id}/pdf
GET    /api/license/{id}/qr-code
```

### Spor İşlemleri
```http
GET    /api/sport
GET    /api/sport/{id}
POST   /api/sport
PUT    /api/sport/{id}
DELETE /api/sport/{id}
POST   /api/sport/{id}/icon
```

### Kulüp İşlemleri
```http
GET    /api/club
GET    /api/club/{id}
POST   /api/club
PUT    /api/club/{id}
DELETE /api/club/{id}
POST   /api/club/{id}/logo
```

## 🔐 Güvenlik

### JWT Token Kullanımı
API'ye erişim için JWT token gereklidir. Token'ı Authorization header'ında gönderin:

```http
Authorization: Bearer <your-jwt-token>
```

### Kullanıcı Rolleri
- **Admin**: Tam yetki
- **Manager**: Yönetim yetkileri
- **Staff**: Temel işlem yetkileri

## 📁 Proje Yapısı

```
SporcuLisansTakip.API/
├── Controllers/          # API Controllers
├── Data/                # Entity Framework Context
├── DTOs/                # Data Transfer Objects
├── Mapping/             # AutoMapper Profiles
├── Models/              # Entity Models
├── Services/            # Business Logic Services
├── appsettings.json     # Configuration
├── Program.cs           # Application Entry Point
└── SporcuLisansTakip.API.csproj
```

## 🧪 Test

### Swagger UI
API dokümantasyonu ve test için Swagger UI kullanabilirsiniz:
```
https://localhost:7001/swagger
```

### Postman Collection
API testleri için Postman collection'ı hazırlanacaktır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## 📞 İletişim

- **Proje Linki**: [GitHub Repository](https://github.com/your-username/sporcu-lisans-takip)
- **Sorular**: GitHub Issues kullanın

## 🙏 Teşekkürler

Bu proje, kamu kurumlarının dijital dönüşüm sürecine katkı sağlamak amacıyla açık kaynak olarak geliştirilmiştir.

---

**Not**: Bu proje geliştirme aşamasındadır. Production ortamında kullanmadan önce güvenlik testleri yapılması önerilir.
