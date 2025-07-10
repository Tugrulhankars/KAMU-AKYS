# Spor Müsabaka Organizasyon Sistemi

Bu modül **spor gençlik** kategorisi altında kamu kurumları için geliştirilecek açık kaynak **spor müsabaka organizasyon** projesidir.

## Proje Hakkında

Bu proje, kamu kurumlarının dijital dönüşüm sürecinde ihtiyaç duyulan spor müsabaka organizasyon çözümünü açık kaynak olarak sunmayı hedeflemektedir.

## Özellikler

- [x] Temel sistem mimarisi
- [x] Kullanıcı yönetimi ve yetkilendirme
- [x] RESTful API geliştirme
- [x] Güvenlik katmanları
- [x] Veri yönetimi ve saklama
- [x] Raporlama ve analitik
- [x] Validation ve Exception Handling
- [x] Swagger/OpenAPI Dokümantasyonu
- [ ] Mobil uygulama desteği
- [ ] Entegrasyon API'leri

## Teknoloji Yığını

- **Backend:** Java 17, Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Frontend:** React 18 (gelecekte geliştirilecek)
- **Veritabanı:** PostgreSQL 15
- **Cache:** Redis 7
- **Message Queue:** RabbitMQ / Apache Kafka (gelecekte eklenecek)
- **Container:** Docker
- **Orchestration:** Docker Compose

## Backend Özellikleri

### Modeller
- **User:** Kullanıcı yönetimi (Admin, Organizatör, Hakem, Antrenör, Sporcu, İzleyici)
- **Competition:** Müsabaka yönetimi
- **Venue:** Spor tesisi yönetimi
- **Match:** Maç yönetimi
- **Participant:** Katılımcı yönetimi
- **Role:** Rol yönetimi

### API Endpoints

#### Kullanıcı Yönetimi
- `GET /api/v1/users` - Tüm kullanıcıları listele
- `GET /api/v1/users/{id}` - Kullanıcı detayı
- `GET /api/v1/users/username/{username}` - Kullanıcı adına göre arama
- `GET /api/v1/users/email/{email}` - E-posta adresine göre arama
- `GET /api/v1/users/role/{role}` - Role göre kullanıcılar
- `GET /api/v1/users/status/{status}` - Duruma göre kullanıcılar
- `GET /api/v1/users/search?keyword={keyword}` - Kullanıcı arama
- `POST /api/v1/users` - Yeni kullanıcı oluştur
- `PUT /api/v1/users/{id}` - Kullanıcı güncelle
- `DELETE /api/v1/users/{id}` - Kullanıcı sil
- `PATCH /api/v1/users/{id}/status` - Kullanıcı durumu değiştir

#### Müsabaka Yönetimi
- `GET /api/v1/competitions` - Tüm müsabakaları listele
- `GET /api/v1/competitions/{id}` - Müsabaka detayı
- `GET /api/v1/competitions/sport-type/{sportType}` - Spor türüne göre müsabakalar
- `GET /api/v1/competitions/status/{status}` - Duruma göre müsabakalar
- `GET /api/v1/competitions/organizer/{organizerId}` - Organizatöre göre müsabakalar
- `GET /api/v1/competitions/venue/{venueId}` - Tesise göre müsabakalar
- `GET /api/v1/competitions/upcoming` - Yaklaşan müsabakalar
- `GET /api/v1/competitions/open-registrations` - Açık kayıtlar
- `GET /api/v1/competitions/search?keyword={keyword}` - Müsabaka arama
- `POST /api/v1/competitions` - Yeni müsabaka oluştur
- `PUT /api/v1/competitions/{id}` - Müsabaka güncelle
- `DELETE /api/v1/competitions/{id}` - Müsabaka iptal et
- `PATCH /api/v1/competitions/{id}/status` - Müsabaka durumu değiştir

#### Tesis Yönetimi
- `GET /api/v1/venues` - Tüm tesisleri listele
- `GET /api/v1/venues/{id}` - Tesis detayı
- `GET /api/v1/venues/status/{status}` - Duruma göre tesisler
- `GET /api/v1/venues/city/{city}` - Şehre göre tesisler
- `GET /api/v1/venues/indoor/{isIndoor}` - Kapalı/Açık tesisler
- `GET /api/v1/venues/lighting/{hasLighting}` - Aydınlatmalı tesisler
- `GET /api/v1/venues/changing-rooms/{hasChangingRooms}` - Soyunma odalı tesisler
- `GET /api/v1/venues/medical-room/{hasMedicalRoom}` - Sağlık odalı tesisler
- `GET /api/v1/venues/capacity/{minCapacity}` - Minimum kapasiteli tesisler
- `GET /api/v1/venues/search?keyword={keyword}` - Tesis arama
- `POST /api/v1/venues` - Yeni tesis oluştur
- `PUT /api/v1/venues/{id}` - Tesis güncelle
- `DELETE /api/v1/venues/{id}` - Tesis kapat
- `PATCH /api/v1/venues/{id}/status` - Tesis durumu değiştir

#### Maç Yönetimi
- `GET /api/v1/matches` - Tüm maçları listele
- `GET /api/v1/matches/{id}` - Maç detayı
- `GET /api/v1/matches/competition/{competitionId}` - Müsabakaya göre maçlar
- `GET /api/v1/matches/status/{status}` - Duruma göre maçlar
- `GET /api/v1/matches/referee/{refereeId}` - Hakeme göre maçlar
- `GET /api/v1/matches/participant/{participantId}` - Katılımcıya göre maçlar
- `GET /api/v1/matches/date-range` - Tarih aralığına göre maçlar
- `GET /api/v1/matches/round/{roundNumber}` - Tura göre maçlar
- `GET /api/v1/matches/court/{courtNumber}` - Korta göre maçlar
- `GET /api/v1/matches/upcoming` - Yaklaşan maçlar
- `POST /api/v1/matches` - Yeni maç oluştur
- `PUT /api/v1/matches/{id}` - Maç güncelle
- `DELETE /api/v1/matches/{id}` - Maç iptal et
- `PATCH /api/v1/matches/{id}/status` - Maç durumu değiştir
- `PATCH /api/v1/matches/{id}/score` - Maç skoru güncelle

#### Katılımcı Yönetimi
- `GET /api/v1/participants` - Tüm katılımcıları listele
- `GET /api/v1/participants/{id}` - Katılımcı detayı
- `GET /api/v1/participants/competition/{competitionId}` - Müsabakaya göre katılımcılar
- `GET /api/v1/participants/user/{userId}` - Kullanıcıya göre katılımcılar
- `GET /api/v1/participants/status/{status}` - Duruma göre katılımcılar
- `GET /api/v1/participants/gender/{gender}` - Cinsiyete göre katılımcılar
- `GET /api/v1/participants/club/{clubName}` - Kulübe göre katılımcılar
- `GET /api/v1/participants/payment/{paymentStatus}` - Ödeme durumuna göre katılımcılar
- `GET /api/v1/participants/medical/{medicalCertificate}` - Sağlık raporu durumuna göre katılımcılar
- `GET /api/v1/participants/insurance/{insuranceStatus}` - Sigorta durumuna göre katılımcılar
- `GET /api/v1/participants/search?keyword={keyword}` - Katılımcı arama
- `GET /api/v1/participants/competition/{competitionId}/count` - Müsabaka katılımcı sayısı
- `POST /api/v1/participants` - Yeni katılımcı oluştur
- `PUT /api/v1/participants/{id}` - Katılımcı güncelle
- `DELETE /api/v1/participants/{id}` - Katılımcı çek
- `PATCH /api/v1/participants/{id}/status` - Katılımcı durumu değiştir
- `PATCH /api/v1/participants/{id}/payment` - Ödeme durumu güncelle
- `PATCH /api/v1/participants/{id}/medical` - Sağlık raporu durumu güncelle
- `PATCH /api/v1/participants/{id}/insurance` - Sigorta durumu güncelle

## Kurulum

### Gereksinimler
- Java 17
- Maven 3.6+
- Docker ve Docker Compose
- PostgreSQL 15
- Redis 7

### Backend Kurulumu

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd spor-musabaka-organizasyon
```

2. **Docker ile çalıştırın:**
```bash
# Backend'i derleyin
cd backend
mvn clean package -DskipTests

# Docker Compose ile başlatın
cd ..
docker-compose up -d
```

3. **Manuel kurulum:**
```bash
# PostgreSQL veritabanını oluşturun
createdb spor_musabaka_db

# Redis'i başlatın
redis-server

# Backend'i çalıştırın
cd backend
mvn spring-boot:run
```

### API Dokümantasyonu

Uygulama çalıştıktan sonra Swagger UI'a erişebilirsiniz:
- **Swagger UI:** http://localhost:8080/api/v1/swagger-ui.html
- **OpenAPI JSON:** http://localhost:8080/api/v1/api-docs

### Veritabanı Bağlantısı

- **Host:** localhost
- **Port:** 5432
- **Database:** spor_musabaka_db
- **Username:** postgres
- **Password:** password

## Kullanım

### Örnek API Çağrıları

1. **Yeni kullanıcı oluşturma:**
```bash
curl -X POST http://localhost:8080/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123",
    "email": "admin@example.com",
    "firstName": "Admin",
    "lastName": "User",
    "role": "ADMIN"
  }'
```

2. **Yeni müsabaka oluşturma:**
```bash
curl -X POST http://localhost:8080/api/v1/competitions \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Futbol Turnuvası 2024",
    "description": "Yıllık futbol turnuvası",
    "sportType": "FOOTBALL",
    "startDate": "2024-06-01T10:00:00",
    "endDate": "2024-06-15T18:00:00",
    "registrationDeadline": "2024-05-25T23:59:59",
    "maxParticipants": 16,
    "minAge": 18,
    "maxAge": 35,
    "genderCategory": "MALE",
    "entryFee": 100.0,
    "prizePool": 5000.0
  }'
```

3. **Yeni tesis oluşturma:**
```bash
curl -X POST http://localhost:8080/api/v1/venues \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Merkez Spor Salonu",
    "description": "Çok amaçlı spor salonu",
    "address": "Atatürk Caddesi No:123",
    "city": "Ankara",
    "capacity": 500,
    "isIndoor": true,
    "hasLighting": true,
    "hasChangingRooms": true,
    "hasMedicalRoom": true
  }'
```

4. **Müsabakaları listeleme:**
```bash
curl -X GET http://localhost:8080/api/v1/competitions
```

## Geliştirme

### Proje Yapısı
```
backend/
├── src/main/java/com/kamu/spor/
│   ├── config/          # Konfigürasyon sınıfları
│   ├── controller/      # REST Controller'lar
│   ├── dto/            # Data Transfer Objects
│   │   └── request/    # Request DTO'ları
│   ├── exception/      # Exception handling
│   ├── model/          # Entity sınıfları
│   ├── repository/     # Repository interface'leri
│   ├── service/        # Service sınıfları
│   └── SporMusabakaOrganizasyonApplication.java
├── src/main/resources/
│   └── application.yml
├── Dockerfile
└── pom.xml
```

### Özellikler

#### Validation
- Bean Validation ile veri doğrulama
- Custom validation mesajları
- Request DTO'ları ile güvenli veri girişi

#### Exception Handling
- Global exception handler
- Detaylı hata mesajları
- Validation error response'ları

#### Security
- Spring Security konfigürasyonu
- CORS desteği
- Role-based yetkilendirme

#### Logging
- SLF4J ile loglama
- Detaylı işlem logları
- Hata logları

### Test
```bash
# Unit testleri çalıştır
mvn test

# Integration testleri çalıştır
mvn verify
```

## Katkıda Bulunma

Projeye katkıda bulunmak için lütfen [CONTRIBUTING.md](../CONTRIBUTING.md) dosyasını inceleyin.

## Lisans

Bu proje açık kaynak lisansı altında yayınlanacaktır. Detaylar için [LICENSE](../LICENSE) dosyasına bakınız.

## İletişim

Proje hakkında sorularınız için issue açabilir veya proje ekibiyle iletişime geçebilirsiniz.
