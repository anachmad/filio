# Filio

Filio adalah aplikasi parenting yang dirancang untuk membantu memantau aktivitas dan perkembangan anak, dengan fokus pada pendidikan berbasis fitrah.

## Gambaran Proyek

Proyek ini terdiri dari dua komponen utama:

1.  **Server**: Backend Node.js/Express dengan PostgreSQL dan Prisma.
2.  **Mobile**: Aplikasi mobile React Native (Expo).

## Mulai Cepat (Quick Start)

### 1. Pengaturan Server

Masuk ke direktori `server` dan ikuti instruksi di [server/README.md](./server/README.md) untuk mengatur database dan menjalankan server API.

```bash
cd server
npm install
# Konfigurasi .env
npx prisma migrate dev
npm run dev
```

### 2. Pengaturan Mobile

Masuk ke direktori `mobile` dan ikuti instruksi di [mobile/README.md](./mobile/README.md) untuk menjalankan aplikasi mobile.

```bash
cd mobile
npm install
npx expo start
```

## Dokumentasi

- [Dokumentasi Server](./server/README.md) - Referensi API, Skema Database.
- [Dokumentasi Mobile](./mobile/README.md) - Struktur Aplikasi, Navigasi, Pengaturan.

## Tech Stack

- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT.
- **Frontend**: React Native, Expo, React Navigation, Axios.
