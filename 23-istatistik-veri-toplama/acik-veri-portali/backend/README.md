# Açık Veri Portalı - Backend API

Bu proje, kamu kurumları için geliştirilmiş açık veri portalının backend API'sidir.

## Teknolojiler

- **.NET 8.0** - Web API framework
- **Entity Framework Core** - ORM
- **PostgreSQL** - Veritabanı
- **JWT** - Kimlik doğrulama
- **Swagger/OpenAPI** - API dokümantasyonu
- **AutoMapper** - Object mapping
- **BCrypt** - Şifre hashleme
- **Docker** - Containerization

## Özellikler

- ✅ Kullanıcı yönetimi ve kimlik doğrulama
- ✅ Kategori yönetimi
- ✅ Veri seti CRUD işlemleri
- ✅ Dosya yükleme ve indirme
- ✅ Arama ve filtreleme
- ✅ İstatistik takibi (görüntüleme, indirme)
- ✅ Rol tabanlı yetkilendirme
- ✅ Swagger API dokümantasyonu

## Kurulum

### Gereksinimler

- .NET 8.0 SDK
- PostgreSQL 15+
- Docker (opsiyonel)

### Yerel Kurulum

1. **Veritabanını hazırlayın:**
   ```bash
   # PostgreSQL'de veritabanı oluşturun
   createdb acikveri_portali
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   cd AcikVeriPortali.API
   dotnet restore
   ```

3. **Veritabanı migration'larını çalıştırın:**
   ```bash
   dotnet ef database update
   ```

4. **Uygulamayı çalıştırın:**
   ```bash
   dotnet run
   ```

### Docker ile Kurulum

1. **Docker Compose ile çalıştırın:**
   ```bash
   docker-compose up -d
   ```

2. **Migration'ları çalıştırın:**
   ```bash
   docker-compose exec api dotnet ef database update
   ```

## API Endpoints

### Kimlik Doğrulama
- `POST /api/auth/login` - Giriş yapma
- `POST /api/auth/register` - Kayıt olma

### Kullanıcı Yönetimi (Admin)
- `GET /api/user` - Tüm kullanıcıları listele
- `GET /api/user/{id}` - Kullanıcı detayı
- `DELETE /api/user/{id}` - Kullanıcı silme
- `PUT /api/user/{id}/role` - Kullanıcı rolü güncelleme

### Kategori Yönetimi
- `GET /api/category` - Tüm kategorileri listele
- `GET /api/category/active` - Aktif kategorileri listele
- `GET /api/category/{id}` - Kategori detayı
- `POST /api/category` - Kategori oluşturma (Admin)
- `PUT /api/category/{id}` - Kategori güncelleme (Admin)
- `DELETE /api/category/{id}` - Kategori silme (Admin)

### Veri Seti Yönetimi
- `GET /api/dataset` - Tüm veri setlerini listele
- `GET /api/dataset/{id}` - Veri seti detayı
- `POST /api/dataset` - Veri seti oluşturma (Auth)
- `PUT /api/dataset/{id}` - Veri seti güncelleme (Auth)
- `DELETE /api/dataset/{id}` - Veri seti silme (Admin)
- `POST /api/dataset/{id}/publish` - Yayınlama (Admin)
- `POST /api/dataset/{id}/archive` - Arşivleme (Admin)
- `POST /api/dataset/{id}/download` - İndirme kaydı
- `GET /api/dataset/search?q={term}` - Arama

### Dosya İşlemleri
- `POST /api/file/upload/{dataSetId}` - Dosya yükleme (Auth)
- `GET /api/file/download/{dataSetId}` - Dosya indirme
- `DELETE /api/file/{dataSetId}` - Dosya silme (Admin)

## Varsayılan Kullanıcı

Sistem ilk çalıştırıldığında otomatik olarak oluşturulan admin kullanıcısı:

- **Kullanıcı adı:** admin
- **E-posta:** admin@acikveri.gov.tr
- **Şifre:** Admin123!
- **Rol:** Admin

## Swagger Dokümantasyonu

Uygulama çalıştıktan sonra Swagger dokümantasyonuna şu adresten erişebilirsiniz:

```
http://localhost:5000/swagger
```

## Konfigürasyon

`appsettings.json` dosyasında aşağıdaki ayarları yapabilirsiniz:

- **Veritabanı bağlantısı**
- **JWT ayarları**
- **Dosya yükleme limitleri**
- **İzin verilen dosya türleri**

## Geliştirme

### Migration Oluşturma

```bash
dotnet ef migrations add MigrationName
```

### Test

```bash
dotnet test
```

## Lisans

Bu proje açık kaynak lisansı altında yayınlanmıştır. 