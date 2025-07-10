# Anket Form Yönetim Sistemi

Bu modül **istatistik veri toplama** kategorisi altında kamu kurumları için geliştirilecek açık kaynak **anket form yönetim** projesidir.

## Proje Hakkında

Bu proje, kamu kurumlarının dijital dönüşüm sürecinde ihtiyaç duyulan anket form yönetim çözümünü açık kaynak olarak sunmayı hedeflemektedir. Kullanıcılar anket oluşturabilir, sorular ekleyebilir, anketleri yanıtlayabilir ve sonuçları görüntüleyebilir.

## Tamamlanan Özellikler

### ✅ Backend Özellikleri
- [x] **Spring Boot** tabanlı RESTful API
- [x] **JWT** tabanlı kimlik doğrulama ve yetkilendirme
- [x] **Spring Security** entegrasyonu
- [x] **Swagger/OpenAPI** dokümantasyonu
- [x] **JPA/Hibernate** ile veritabanı yönetimi
- [x] **CRUD** işlemleri (Anket, Soru, Seçenek, Kullanıcı)
- [x] **Anket yanıtlama sistemi** (SurveyResponse, Answer entity'leri)
- [x] **Kullanıcı yönetimi** (Kayıt, Giriş, Profil)

### ✅ Frontend Özellikleri
- [x] **React** tabanlı modern kullanıcı arayüzü
- [x] **Vite** ile hızlı geliştirme ortamı
- [x] **Tailwind CSS** ile responsive tasarım
- [x] **React Router** ile sayfa yönetimi
- [x] **Axios** ile API entegrasyonu
- [x] **Context API** ile durum yönetimi
- [x] **Anket oluşturma ve düzenleme** sayfaları
- [x] **Soru ve seçenek yönetimi** bileşenleri
- [x] **Anket yanıtlama** sayfası
- [x] **Yanıt görüntüleme** sayfası
- [x] **Kullanıcı kayıt ve giriş** sayfaları

### ✅ Veritabanı Yapısı
- [x] **User** - Kullanıcı bilgileri
- [x] **Survey** - Anket bilgileri
- [x] **Question** - Soru bilgileri
- [x] **Choice** - Seçenek bilgileri
- [x] **SurveyResponse** - Anket yanıtları
- [x] **Answer** - Soru cevapları

## Teknoloji Yığını

### Backend
- **Framework:** Spring Boot 3.x
- **Güvenlik:** Spring Security + JWT
- **Veritabanı:** PostgreSQL
- **ORM:** JPA/Hibernate
- **API Dokümantasyonu:** Swagger/OpenAPI 3
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API

### DevOps
- **Container:** Docker
- **Orchestration:** Docker Compose
- **Version Control:** Git

## Kurulum

### Gereksinimler
- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Docker (opsiyonel)

### PostgreSQL Kurulumu

#### 1. PostgreSQL İndirme ve Kurulum
- [PostgreSQL İndirme Sayfası](https://www.postgresql.org/download/) adresinden PostgreSQL'i indirin
- Kurulum sırasında şifre olarak `postgres` kullanın

#### 2. Veritabanı Oluşturma
```sql
-- PostgreSQL'e bağlanın
psql -U postgres

-- Veritabanını oluşturun
CREATE DATABASE kamu_akys_anketdb;

-- Veritabanına bağlanın
\c kamu_akys_anketdb;

-- Kurulumu kontrol edin
\l
```

#### 3. Alternatif: pgAdmin Kullanımı
- pgAdmin'i açın
- Yeni veritabanı oluşturun: `kamu_akys_anketdb`
- Kullanıcı: `postgres`
- Şifre: `postgres`

### Backend Kurulumu
```bash
cd backend
./mvnw spring-boot:run
```

### Frontend Kurulumu
```bash
cd frontend/anket-form-yonetim
npm install
npm run dev
```

### Docker ile Kurulum
```bash
docker-compose up -d
```

## Kullanım

### API Endpoint'leri

#### Anket Yönetimi
- `GET /api/surveys` - Tüm anketleri listele
- `POST /api/surveys` - Yeni anket oluştur
- `GET /api/surveys/{id}` - Anket detayını getir
- `PUT /api/surveys/{id}` - Anketi güncelle
- `DELETE /api/surveys/{id}` - Anketi sil

#### Soru Yönetimi
- `POST /api/surveys/{id}/questions` - Ankete soru ekle
- `DELETE /api/questions/{id}` - Soruyu sil

#### Seçenek Yönetimi
- `POST /api/questions/{id}/choices` - Soruya seçenek ekle
- `DELETE /api/choices/{id}` - Seçeneği sil

#### Anket Yanıtlama
- `POST /api/survey-responses` - Anket yanıtı gönder
- `GET /api/survey-responses/survey/{id}` - Anket yanıtlarını listele
- `GET /api/survey-responses/user` - Kullanıcının yanıtlarını listele

#### Kullanıcı Yönetimi
- `POST /api/auth/register` - Kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi

### Swagger Dokümantasyonu
API dokümantasyonuna `http://localhost:8081/swagger-ui.html` adresinden erişebilirsiniz.

## Özellik Detayları

### Anket Oluşturma
- Anket başlığı ve açıklaması
- Soru türleri: Çoktan seçmeli, Metin, Checkbox
- Zorunlu/opsiyonel soru işaretleme
- Soru sıralaması

### Anket Yanıtlama
- Kullanıcı dostu arayüz
- Gerçek zamanlı validasyon
- Tek yanıt kontrolü (kullanıcı başına)
- Otomatik kaydetme

### Raporlama
- Anket yanıtlarını görüntüleme
- Yanıt istatistikleri
- Kullanıcı bazlı yanıt takibi

## Gelecek Özellikler

- [ ] **Gelişmiş raporlama** (grafikler, istatistikler)
- [ ] **Anket şablonları**
- [ ] **E-posta bildirimleri**
- [ ] **Mobil uygulama**
- [ ] **Çoklu dil desteği**
- [ ] **Gelişmiş yetkilendirme** (rol tabanlı)
- [ ] **Veri dışa aktarma** (Excel, PDF)
- [ ] **Anket paylaşımı** (link, QR kod)

## Katkıda Bulunma

Projeye katkıda bulunmak için lütfen [CONTRIBUTING.md](../CONTRIBUTING.md) dosyasını inceleyin.

## Lisans

Bu proje açık kaynak lisansı altında yayınlanacaktır. Detaylar için [LICENSE](../LICENSE) dosyasına bakınız.

## İletişim

Proje hakkında sorularınız için issue açabilir veya proje ekibiyle iletişime geçebilirsiniz.
