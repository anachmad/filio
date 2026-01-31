# Aplikasi Mobile Filio

Ini adalah aplikasi mobile untuk Filio, dibangun menggunakan React Native dan Expo.

## Daftar Isi
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Struktur Proyek](#struktur-proyek)
- [Navigasi](#navigasi)
- [Scripts](#scripts)

## Prasyarat
- Node.js (v18+ direkomendasikan)
- Expo CLI (opsional, tapi direkomendasikan)
- Android Studio / Xcode (untuk simulator) atau aplikasi Expo Go di perangkat fisik Anda.

## Instalasi

1. Masuk ke direktori mobile:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server development:
   ```bash
   npx expo start
   ```

## Struktur Proyek

```
mobile/
├── src/
│   ├── api/          # Klien API dan panggilan service
│   ├── components/   # Komponen UI yang dapat digunakan kembali
│   ├── constants/    # Konstanta aplikasi (warna, string, dll.)
│   ├── context/      # React Context (contoh: AuthContext)
│   └── screens/      # Layar (Screen) aplikasi
├── App.tsx           # Titik masuk utama dan pengaturan navigasi
└── app.json          # Konfigurasi Expo
```

## Navigasi

Aplikasi ini menggunakan `react-navigation` dengan Stack Navigator.

### Auth Stack (Belum Terautentikasi)
- **Login**: Layar login untuk pengguna yang sudah ada.
- **Register**: Layar pendaftaran untuk pengguna baru.

### Main Stack (Terautentikasi)
- **Dashboard**: Tampilan utama yang menampilkan anak-anak dan aktivitas terbaru.
- **AddChild**: Formulir untuk menambahkan profil anak baru.
- **ChildDetail**: Tampilan detail aktivitas anak tertentu.
- **AddActivity**: Formulir untuk mencatat aktivitas baru bagi anak.

## Scripts

- `npm start`: Menjalankan server development Expo.
- `npm run android`: Menjalankan di emulator/perangkat Android.
- `npm run ios`: Menjalankan di simulator/perangkat iOS.
- `npm run web`: Menjalankan di browser web.
