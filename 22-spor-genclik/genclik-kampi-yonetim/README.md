# Gençlik Kampı Yönetim Sistemi

Bu modül **spor gençlik** kategorisi altında kamu kurumları için geliştirilecek açık kaynak **gençlik kampı yönetim** projesidir.

## Proje Hakkında

Bu proje, kamu kurumlarının dijital dönüşüm sürecinde ihtiyaç duyulan gençlik kampı yönetim çözümünü açık kaynak olarak sunmayı hedeflemektedir. Sistem, kamp kayıtları, katılımcı yönetimi, aktivite planlaması, ödeme takibi ve raporlama özelliklerini içermektedir.

## Özellikler

### ✅ Temel Özellikler
- [x] Kullanıcı yönetimi ve yetkilendirme (JWT tabanlı)
- [x] Kamp yönetimi (oluşturma, düzenleme, silme)
- [x] Katılımcı yönetimi
- [x] Aktivite yönetimi
- [x] Kayıt yönetimi
- [x] Ödeme takibi
- [x] Dosya yükleme ve yönetimi
- [x] RESTful API geliştirme
- [x] Güvenlik katmanları
- [x] Veri yönetimi ve saklama
- [x] Raporlama ve analitik

### 🔄 Geliştirilecek Özellikler
- [ ] Mobil uygulama desteği
- [ ] Entegrasyon API'leri
- [ ] E-posta bildirimleri
- [ ] SMS bildirimleri
- [ ] QR kod entegrasyonu
- [ ] PDF rapor oluşturma
- [ ] Gelişmiş raporlama
- [ ] Çoklu dil desteği

## Teknoloji Yığını

### Backend
- **Framework:** ASP.NET Core 8.0
- **Veritabanı:** SQL Server 2022
- **ORM:** Entity Framework Core 8.0
- **Kimlik Doğrulama:** ASP.NET Core Identity + JWT
- **API Dokümantasyonu:** Swagger/OpenAPI
- **Loglama:** Serilog
- **Mapping:** AutoMapper
- **Validasyon:** FluentValidation

### Frontend (Planlanan)
- **Framework:** React 18 + TypeScript
- **UI Kütüphanesi:** Tailwind CSS
- **State Management:** React Query
- **Routing:** React Router
- **HTTP Client:** Axios

### DevOps & Altyapı
- **Container:** Docker
- **Orchestration:** Docker Compose
- **Cache:** Redis
- **Message Queue:** RabbitMQ (planlanan)
- **Monitoring:** Application Insights (planlanan)

## Kurulum

### Gereksinimler
- .NET 8.0 SDK
- SQL Server 2022 (veya SQL Server Express)
- Docker ve Docker Compose (opsiyonel)

### Yerel Geliştirme

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd genclik-kampi-yonetim
```

2. **Veritabanı bağlantı ayarlarını yapılandırın:**
`GenclikKampiYonetim.API/appsettings.json` dosyasındaki connection string'i güncelleyin.

3. **Bağımlılıkları yükleyin:**
```bash
dotnet restore
```

4. **Veritabanını oluşturun:**
```bash
cd GenclikKampiYonetim.API
dotnet ef database update
```

5. **Uygulamayı çalıştırın:**
```bash
dotnet run
```

### Docker ile Kurulum

1. **Docker Compose ile çalıştırın:**
```bash
docker-compose up -d
```

2. **API'ye erişin:**
- Swagger UI: http://localhost:5000
- API: http://localhost:5000/api

## API Dokümantasyonu

API dokümantasyonu için Swagger UI'ı kullanabilirsiniz:
- Geliştirme ortamında: http://localhost:5000
- Docker ile: http://localhost:5000

### Temel Endpoint'ler

#### Kimlik Doğrulama
- `POST /api/auth/login` - Giriş yapma
- `POST /api/auth/register` - Kayıt olma
- `POST /api/auth/change-password` - Şifre değiştirme
- `GET /api/auth/me` - Mevcut kullanıcı bilgileri

#### Kamp Yönetimi
- `GET /api/camp` - Tüm kampları listele
- `GET /api/camp/{id}` - Kamp detayları
- `POST /api/camp` - Yeni kamp oluştur
- `PUT /api/camp/{id}` - Kamp güncelle
- `DELETE /api/camp/{id}` - Kamp sil

#### Katılımcı Yönetimi
- `GET /api/participant` - Tüm katılımcıları listele
- `GET /api/participant/{id}` - Katılımcı detayları
- `POST /api/participant` - Yeni katılımcı oluştur
- `PUT /api/participant/{id}` - Katılımcı güncelle

#### Kayıt Yönetimi
- `GET /api/registration` - Tüm kayıtları listele
- `GET /api/registration/{id}` - Kayıt detayları
- `POST /api/registration` - Yeni kayıt oluştur
- `PUT /api/registration/{id}` - Kayıt güncelle

## Veritabanı Şeması

### Ana Tablolar
- **Users** - Kullanıcı bilgileri
- **Camps** - Kamp bilgileri
- **Participants** - Katılımcı bilgileri
- **Activities** - Aktivite bilgileri
- **Registrations** - Kayıt bilgileri
- **Payments** - Ödeme bilgileri
- **CampLocations** - Kamp lokasyonları
- **CampCategories** - Kamp kategorileri
- **ActivityCategories** - Aktivite kategorileri
- **EmergencyContacts** - Acil durum kontakları
- **HealthRecords** - Sağlık kayıtları
- **CampStaff** - Kamp personeli
- **StaffRoles** - Personel rolleri
- **CampSchedules** - Kamp programları
- **MealPlans** - Yemek planları
- **Transportations** - Ulaşım bilgileri
- **Documents** - Dokümanlar
- **Notifications** - Bildirimler

## Güvenlik

- JWT tabanlı kimlik doğrulama
- Role-based authorization
- Password hashing (BCrypt)
- CORS politikası
- Input validation
- SQL injection koruması
- XSS koruması

## Geliştirme

### Proje Yapısı
```
GenclikKampiYonetim.API/
├── Controllers/          # API Controller'ları
├── Data/                # Entity Framework DbContext
├── DTOs/                # Data Transfer Objects
├── Models/              # Entity modelleri
├── Services/            # Business logic servisleri
├── Middleware/          # Custom middleware'ler
├── Mapping/             # AutoMapper profilleri
└── wwwroot/             # Statik dosyalar
```

### Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları
- C# coding conventions
- SOLID principles
- Clean Architecture
- Unit test coverage
- API documentation

## Lisans

Bu proje açık kaynak lisansı altında yayınlanacaktır. Detaylar için [LICENSE](../LICENSE) dosyasına bakınız.

## İletişim

Proje hakkında sorularınız için issue açabilir veya proje ekibiyle iletişime geçebilirsiniz.

## Changelog

### v1.0.0 (2024-01-XX)
- İlk sürüm
- Temel CRUD işlemleri
- JWT kimlik doğrulama
- Kamp yönetimi
- Katılımcı yönetimi
- Kayıt yönetimi
- Ödeme takibi
- Dosya yükleme
- API dokümantasyonu
