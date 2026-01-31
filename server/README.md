# Filio Server

Ini adalah backend server untuk aplikasi Filio, dibangun menggunakan Express.js dan Prisma.

## Daftar Isi
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Variabel Lingkungan](#variabel-lingkungan)
- [Skema Database](#skema-database)
- [Referensi API](#referensi-api)

## Prasyarat
- Node.js (v18+ direkomendasikan)
- PostgreSQL

## Instalasi

1. Masuk ke direktori server:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Siapkan database:
   ```bash
   npx prisma migrate dev
   ```

4. Jalankan server development:
   ```bash
   npm run dev
   ```

## Variabel Lingkungan
Buat file `.env` di dalam direktori `server` dengan variabel berikut:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/filio_db?schema=public"
JWT_SECRET="kunci_rahasia_jwt_anda"
```

## Skema Database

Database terdiri dari model inti berikut:

- **User**: Merepresentasikan orang tua/wali yang terdaftar.
- **Family**: Mengelompokkan pengguna dan anak-anak bersama.
- **Child**: Merepresentasikan profil anak dalam sebuah keluarga.
- **Activity**: Mencatat aktivitas yang dilakukan oleh anak.
- **FitrahTag**: Tag untuk mengkategorikan aktivitas berdasarkan fitrah.

## Referensi API

### Autentikasi

#### Registrasi User
- **URL**: `/api/auth/register`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "fullName": "John Doe"
  }
  ```

#### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

#### Dapatkan Profil User Saat Ini
- **URL**: `/api/auth/me`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

### Anak (Children)

#### Buat Profil Anak
- **URL**: `/api/children`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "name": "Alice",
    "dateOfBirth": "2018-01-01T00:00:00.000Z"
  }
  ```

#### Dapatkan Semua Data Anak
- **URL**: `/api/children`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`

### Aktivitas (Activities)

#### Buat Aktivitas Baru
- **URL**: `/api/activities`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
    "title": "Membaca Quran",
    "description": "Membaca Surah Al-Fatihah",
    "childId": "uuid-of-child",
    "fitrahTags": ["Spiritual"]
  }
  ```

#### Dapatkan Aktivitas Berdasarkan Anak
- **URL**: `/api/activities/child/:childId`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
