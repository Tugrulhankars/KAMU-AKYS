# Kamu İstatistiki Veri Görselleştirme Aracı

Kamu kurumları için geliştirilmiş modern veri görselleştirme platformu. Kamuya açık veya özel veri setlerini REST API üzerinden alarak frontend'de grafiklerle görselleştirmenizi sağlar.

## 🚀 Özellikler

### ✅ Backend (ASP.NET Core .NET 8)
- JWT tabanlı kullanıcı kimlik doğrulama
- Rol bazlı yetkilendirme (Admin, User)
- RESTful API endpoints
- Entity Framework Core ile veri yönetimi
- SQL Server veritabanı desteği
- Swagger UI dokümantasyonu

### ✅ Frontend (React + Vite + TailwindCSS)
- Modern ve responsive kullanıcı arayüzü
- Recharts ile interaktif grafik görselleştirme
- JWT token yönetimi
- Rol bazlı erişim kontrolü
- Tarihe göre filtreleme
- CSV export özelliği

### ✅ Veri Görselleştirme
- Çizgi grafikler
- Sütun grafikler  
- Alan grafikler
- Pasta grafikler
- Interaktif filtreler
- Veri tablosu görünümü

## 🏗️ Teknoloji Yığını

- **Backend:** ASP.NET Core 8, Entity Framework Core
- **Frontend:** React 18, Vite, TailwindCSS, Recharts
- **Veritabanı:** Microsoft SQL Server
- **Auth:** JWT Bearer Authentication
- **Container:** Docker + Docker Compose

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Kullanıcı kayıt
- `POST /auth/login` - JWT token al

### Datasets
- `GET /datasets` - Public/tüm veri setlerini listele
- `POST /datasets` - Yeni veri seti oluştur (Auth gerekli)
- `GET /datasets/{id}` - Veri seti detayı
- `GET /datasets/{id}/data` - Veri noktalarını al
- `POST /datasets/{id}/data` - Veri noktası ekle (Auth gerekli)

## 🚀 Kurulum ve Çalıştırma

### Docker ile Hızlı Başlangıç

1. **Repoyu klonlayın:**
```bash
git clone <repo-url>
cd istatistiki-veri-gorsellestirme
```

2. **Docker Compose ile çalıştırın:**
```bash
docker-compose up -d
```

3. **Uygulamaya erişin:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Swagger UI: http://localhost:5000

### Manuel Kurulum

#### Backend Kurulumu

1. **Gereksinimler:**
   - .NET 8 SDK
   - SQL Server

2. **Kurulum:**
```bash
cd backend
dotnet restore
dotnet run
```

#### Frontend Kurulumu

1. **Gereksinimler:**
   - Node.js 18+
   - npm veya yarn

2. **Kurulum:**
```bash
cd frontend
npm install
npm run dev
```

## 👤 Demo Hesaplar

### Admin Hesabı
- **Kullanıcı Adı:** admin
- **Şifre:** admin123
- **Yetkiler:** Tüm veri setlerine erişim, veri ekleme

### Test Kullanımı
1. Kayıt sayfasından yeni hesap oluşturun
2. Veya demo admin hesabı ile giriş yapın
3. Admin panelinden yeni veri setleri oluşturun
4. Veri noktaları ekleyin
5. Farklı grafik türleriyle görselleştirin

## 🔒 Güvenlik

- JWT Bearer token authentication
- Rol bazlı yetkilendirme
- CORS politikaları
- Input validation
- SQL injection koruması

## 📋 Kullanıcı Rolleri

### Admin
- Veri seti oluşturabilir
- Tüm veri setlerine erişebilir
- Veri noktası ekleyebilir
- Kullanıcı yönetimi yapabilir

### User (Kayıtlı Kullanıcı)
- Tüm veri setlerini görüntüleyebilir
- Grafikleri ve filtreleri kullanabilir
- CSV export yapabilir

### Guest (Giriş Yapmayan)
- Sadece kamuya açık veri setlerini görebilir
- Sınırlı görselleştirme özellikleri

## 🐳 Docker Konfigürasyonu

### Servisler
- **sqlserver:** MS SQL Server 2022 Express
- **backend:** ASP.NET Core API (Port 5000)
- **frontend:** React SPA (Port 3000)

### Volumes
- SQL Server verileri persistent volume'da saklanır

### Environment Variables
- `SA_PASSWORD=YourStrong@Passw0rd`
- `ASPNETCORE_ENVIRONMENT=Development`
- `VITE_API_URL=http://backend:5000/api` (Docker içi)
- `VITE_API_URL=http://localhost:5000/api` (Local dev)

## 🔧 Geliştirme

### Backend Geliştirme
```bash
cd backend
dotnet watch run
```

### Frontend Geliştirme
```bash
cd frontend
npm run dev
```

### Veritabanı Migration
```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## 📈 Veri Modeli

### User
- Id, Username, PasswordHash, Role, CreatedAt

### Dataset
- Id, Name, Description, IsPublic, CreatedAt, CreatedByUserId

### DataPoint
- Id, DatasetId, Key, Value, Date, Category

## 🎯 Kullanım Senaryoları

1. **Nüfus İstatistikleri:** Şehir bazlı nüfus verilerini görselleştirme
2. **Bütçe Analizi:** Yıllık bütçe harcamalarını takip
3. **Performans Metrikleri:** KPI'ları zaman serisi olarak gösterme
4. **Anket Sonuçları:** Kategori bazlı sonuçları pasta grafik ile
5. **Ekonomik Göstergeler:** Enflasyon, işsizlik gibi verileri çizgi grafik ile

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje açık kaynak olarak geliştirilmiştir.

## 🆘 Destek

Proje hakkında sorular için:
- GitHub Issues kullanın
- Dokümantasyonu inceleyin
- Demo hesapları test edin

---

**Geliştirici Notu:** Bu proje kamu kurumlarının dijital dönüşüm sürecinde veri görselleştirme ihtiyaçlarını karşılamak amacıyla geliştirilmiştir.
