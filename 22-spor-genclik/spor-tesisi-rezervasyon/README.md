# Spor Tesisi Rezervasyon Sistemi

Bu proje, kamu kurumları için geliştirilmiş açık kaynak **spor tesisi rezervasyon** sistemidir. C# ASP.NET Core 8.0 ile monolitik mimari kullanılarak geliştirilmiştir.

## Proje Hakkında

Bu sistem, spor tesislerinin rezervasyon yönetimini dijitalleştirmek ve kullanıcıların kolayca rezervasyon yapabilmesini sağlamak amacıyla tasarlanmıştır.

## Özellikler

### ✅ Tamamlanan Özellikler
- [x] **Kullanıcı Yönetimi**: Kayıt, giriş, profil yönetimi
- [x] **JWT Kimlik Doğrulama**: Güvenli token tabanlı kimlik doğrulama
- [x] **Spor Tesisi Yönetimi**: Tesisi ekleme, düzenleme, silme
- [x] **Rezervasyon Sistemi**: Rezervasyon oluşturma, güncelleme, iptal etme
- [x] **Müsaitlik Kontrolü**: Zaman dilimi çakışması kontrolü
- [x] **Rol Tabanlı Yetkilendirme**: Admin ve kullanıcı rolleri
- [x] **RESTful API**: Tam CRUD operasyonları
- [x] **Swagger Dokümantasyonu**: API dokümantasyonu
- [x] **Entity Framework Core**: Veritabanı ORM
- [x] **SQL Server**: Veritabanı desteği
- [x] **Docker Desteği**: Containerization
- [x] **Validation**: Giriş doğrulama
- [x] **Exception Handling**: Hata yönetimi

### 🔄 Gelecek Özellikler
- [ ] **Ödeme Sistemi**: Online ödeme entegrasyonu
- [ ] **E-posta Bildirimleri**: Rezervasyon onayları
- [ ] **SMS Bildirimleri**: Mobil bildirimler
- [ ] **Raporlama**: Detaylı raporlar ve analitik
- [ ] **Mobil Uygulama**: React Native desteği
- [ ] **Çoklu Dil Desteği**: İngilizce ve diğer diller
- [ ] **Gelişmiş Arama**: Filtreleme ve arama özellikleri
- [ ] **Takvim Entegrasyonu**: Google Calendar, Outlook

## Teknoloji Yığını

### Backend
- **Framework**: ASP.NET Core 8.0
- **Veritabanı**: SQL Server 2022
- **ORM**: Entity Framework Core 8.0
- **Kimlik Doğrulama**: ASP.NET Core Identity + JWT
- **API Dokümantasyonu**: Swagger/OpenAPI
- **Validation**: Data Annotations + FluentValidation
- **Mapping**: AutoMapper

### Altyapı
- **Container**: Docker
- **Orchestration**: Docker Compose
- **IDE**: Visual Studio 2022 / VS Code

## Kurulum

### Gereksinimler
- .NET 8.0 SDK
- SQL Server 2022 (veya LocalDB)
- Docker Desktop (opsiyonel)

### Yerel Geliştirme

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd spor-tesisi-rezervasyon
```

2. **Veritabanı bağlantısını ayarlayın**
```bash
# appsettings.json dosyasında connection string'i güncelleyin
"ConnectionStrings": {
  "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=SporTesisiRezervasyonDB;Trusted_Connection=true;MultipleActiveResultSets=true"
}
```

3. **Migration'ları uygulayın**
```bash
cd SporTesisiRezervasyon.API
dotnet ef database update
```

4. **Uygulamayı çalıştırın**
```bash
dotnet run
```

5. **Swagger UI'a erişin**
```
https://localhost:7001/swagger
```

### Docker ile Kurulum

1. **Docker Compose ile çalıştırın**
```bash
docker-compose up -d
```

2. **API'ye erişin**
```
http://localhost:5000
https://localhost:5001
```

## API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Kullanıcı Yönetimi
- `GET /api/user/profile` - Profil bilgileri
- `PUT /api/user/profile` - Profil güncelleme
- `GET /api/user` - Tüm kullanıcılar (Admin)
- `GET /api/user/{id}` - Kullanıcı detayı (Admin)
- `PUT /api/user/{id}` - Kullanıcı güncelleme (Admin)
- `DELETE /api/user/{id}` - Kullanıcı silme (Admin)

### Spor Tesisi Yönetimi
- `GET /api/facility` - Tüm tesisler
- `GET /api/facility/{id}` - Tesisi detayı
- `POST /api/facility` - Tesisi oluşturma (Admin)
- `PUT /api/facility/{id}` - Tesisi güncelleme (Admin)
- `DELETE /api/facility/{id}` - Tesisi silme (Admin)
- `GET /api/facility/type/{typeId}` - Türe göre tesisler
- `GET /api/facility/types` - Tüm tesisi türleri
- `GET /api/facility/{id}/availability` - Müsaitlik kontrolü

### Rezervasyon Yönetimi
- `GET /api/reservation` - Tüm rezervasyonlar (Admin)
- `GET /api/reservation/{id}` - Rezervasyon detayı
- `POST /api/reservation` - Rezervasyon oluşturma
- `PUT /api/reservation/{id}` - Rezervasyon güncelleme
- `DELETE /api/reservation/{id}` - Rezervasyon iptal etme
- `GET /api/reservation/my-reservations` - Kullanıcının rezervasyonları
- `GET /api/reservation/facility/{facilityId}` - Tesise göre rezervasyonlar (Admin)
- `GET /api/reservation/date-range` - Tarih aralığına göre rezervasyonlar (Admin)
- `GET /api/reservation/availability` - Zaman dilimi müsaitlik kontrolü

## Veritabanı Şeması

### Ana Tablolar
- **AspNetUsers** - Kullanıcı bilgileri
- **AspNetRoles** - Roller
- **AspNetUserRoles** - Kullanıcı-rol ilişkisi
- **Facilities** - Spor tesisleri
- **FacilityTypes** - Tesisi türleri
- **Reservations** - Rezervasyonlar
- **FacilitySchedules** - Tesisi çalışma saatleri

### İlişkiler
- Kullanıcı ↔ Rezervasyon (1:N)
- Tesisi ↔ Rezervasyon (1:N)
- Tesisi Türü ↔ Tesisi (1:N)
- Tesisi ↔ Çalışma Saatleri (1:N)

## Güvenlik

### Kimlik Doğrulama
- JWT token tabanlı kimlik doğrulama
- Token süresi: 60 dakika
- Güvenli şifre hashleme (ASP.NET Core Identity)

### Yetkilendirme
- **Admin**: Tüm işlemleri yapabilir
- **User**: Kendi rezervasyonlarını yönetebilir

### Veri Doğrulama
- Input validation (Data Annotations)
- SQL injection koruması (Entity Framework)
- XSS koruması (ASP.NET Core)

## Test

### API Testleri
```bash
# Swagger UI üzerinden test edebilirsiniz
https://localhost:7001/swagger

# Örnek test senaryoları:
1. Kullanıcı kaydı
2. Kullanıcı girişi
3. Tesisi listeleme
4. Rezervasyon oluşturma
5. Rezervasyon iptal etme
```

## Deployment

### Production Ortamı
```bash
# Build
dotnet publish -c Release

# Docker ile deployment
docker build -t spor-tesisi-rezervasyon .
docker run -p 80:80 spor-tesisi-rezervasyon
```

### Environment Variables
```bash
# Production için gerekli environment variables
ASPNETCORE_ENVIRONMENT=Production
ConnectionStrings__DefaultConnection=<production-connection-string>
JwtSettings__SecretKey=<secure-secret-key>
```

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakınız.

## İletişim

Proje hakkında sorularınız için:
- Issue açabilirsiniz
- E-posta: [proje-email@domain.com]
- Proje ekibiyle iletişime geçebilirsiniz

## Changelog

### v1.0.0 (2024-01-XX)
- ✅ İlk sürüm
- ✅ Temel CRUD operasyonları
- ✅ JWT kimlik doğrulama
- ✅ Rezervasyon sistemi
- ✅ Docker desteği
- ✅ Swagger dokümantasyonu
