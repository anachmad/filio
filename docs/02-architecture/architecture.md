# Architecture

Status: draft
Owner: TBD

Sumber: [SAD v1.2](../Filio_SAD_v1.2_VPS_Cloudflare_Tunnel.md) (draft, belum disetujui). Dokumen ini mencatat arsitektur sasaran yang konsisten dengan keputusan di [decisions.md](decisions.md): frontend PWA (ADR-001) dan aplikasi plus PostgreSQL pada VPS dengan Docker (ADR-004 dan ADR-008). Bagian yang masih diusulkan ditandai. Kebutuhan sistem ada di [system-requirements.md](../01-requirements/system-requirements.md). Sebagian besar rincian dalam SAD sengaja tidak diulang; dokumen ini merujuk bagian SAD terkait. Keadaan kode saat ini belum diaudit untuk dokumen ini; hal itu dicatat sebagai TBD.

## System context, components, data flows and interfaces

### Konteks

Pengguna adalah orang tua atau wali yang memakai browser (PWA). Satu VPS menjalankan semua komponen produksi dalam kontainer Docker. Tidak ada layanan basis data atau hosting pihak ketiga pada target produksi (Neon dan Cloud Run tidak dipakai).

```
Orang tua / wali (browser, PWA)
        | HTTPS
        v
 [Jalur masuk publik: Cloudflare Tunnel - DIUSULKAN]
        v
 VPS (Docker)
   reverse proxy  -- /     --> frontend PWA (build statis)
                  -- /api  --> API Express
   API Express  --(jaringan privat)--> PostgreSQL (volume persisten)
 Backup terenkripsi di luar lokasi (uji restore berkala)
```

Reverse proxy melayani `/` dan `/api` pada satu origin, sehingga cookie sesi lebih sederhana dan CORS lebih sedikit. Pilihan jalur masuk (Cloudflare Tunnel), reverse proxy (Caddy atau Nginx), dan nama domain belum diputuskan. Jangan mengekspos port PostgreSQL atau API langsung ke internet.

### Komponen

| Komponen | Tanggung jawab | Status |
|---|---|---|
| Frontend PWA | Antarmuka pengguna, validasi form, klien API bertipe; hanya meng-cache aset statis | Diputuskan sebagai PWA; React, TypeScript, Vite masih diusulkan |
| API Express (modular monolith) | Autentikasi, sesi, otorisasi keluarga, aturan bisnis, akses data lewat Prisma | Express ada di repo saat ini; struktur modul diusulkan |
| PostgreSQL | Data keluarga, anak, aktivitas, consent, audit | Diputuskan self-hosted di VPS |
| Reverse proxy | Routing `/` dan `/api`, header keamanan | Diusulkan |
| Konektor tunnel | Publikasi HTTP tanpa membuka port masuk | Diusulkan |
| Job migrasi | Menjalankan migrasi Prisma terpisah dari aplikasi | Diusulkan |
| Job backup | Backup terenkripsi di luar lokasi | Diperlukan; mekanisme TBD |

Modul backend yang diusulkan SAD: `auth`, `families`, `children`, `activities`, `fitrah-taxonomy`, `insights`, `privacy-data-rights`, `activity-ideas` (P1), `reflections` (P1), `family-invitations` (V1.1), `media` (V1.1), dengan lapisan lintas modul untuk penanganan error, redaksi log, rate limiting, validasi, audit, dan ID permintaan. Aturan keamanan tidak boleh ditaruh di browser; izin di UI hanya untuk pengalaman pengguna.

Struktur kode saat ini: `server/` (Express, Prisma, fitur auth, child, activity) dan `mobile/` (React Native/Expo). Frontend PWA belum ada. Peta penggunaan ulang kode dan struktur repositori final: TBD (audit M0).

### Aliran data utama

1. **Masuk dan memuat dashboard.** Browser mengirim kredensial ke `POST /auth/login`; API memverifikasi dan membuat sesi; browser memuat identitas dan keluarga yang berizin, lalu daftar anak yang dibatasi pada keluarga itu.
2. **Menyimpan aktivitas.** Browser mengirim judul, tanggal, tag opsional; API memeriksa bahwa anak milik keluarga yang dapat diakses, memvalidasi tag, menyimpan dalam transaksi; browser membatalkan cache timeline dan insight, lalu memuat ulang hitungan.
3. **Ekspor dan hapus data.** Alur permintaan terverifikasi dengan status yang dapat dilacak.

Diagram urutan lengkap ada di SAD bagian 10.

### Antarmuka

Kontrak API konseptual, model data, dan perilaku lintas fitur dicatat di `system-requirements.md`. Tidak ada integrasi pihak ketiga yang menerima data anak.

## Constraints, risks, significant decisions and review evidence

### Batasan arsitektur

- Aplikasi privat secara default; otorisasi keluarga ditegakkan di server pada setiap endpoint.
- Data anak minimal; tidak ada telemetri pihak ketiga yang memuat nama anak, tanggal lahir, isi jurnal, atau foto.
- PWA online-first. Cache hanya untuk aset statis berversi; respons `/api` tidak di-cache (`no-store`). Cache klien dibersihkan saat logout dan ganti akun.
- Basis data tanpa port publik, hanya dapat dijangkau dari jaringan privat Docker; kredensial aplikasi bukan superuser.
- Migrasi Prisma tidak dijalankan dari setiap kontainer; dijalankan sebagai job terpisah dengan backup dan rencana rollback. Entrypoint server saat ini perlu diubah agar sesuai.
- Rahasia (kredensial basis data, token tunnel) tidak disimpan di repositori atau bundle klien.
- Rilis ditahan bila ada pemblokir rilis di `system-requirements.md`.

### Risiko arsitektur

| Risiko | Catatan | Mitigasi yang diperlukan |
|---|---|---|
| VPS tunggal sebagai titik kegagalan tunggal | Kehilangan VPS berarti layanan dan data lokal hilang | Backup terenkripsi di luar lokasi, konfigurasi dapat direproduksi, latihan pemulihan, penetapan RPO dan RTO |
| Hardening dan pembaruan menjadi tanggung jawab tim | Tidak ada layanan terkelola | Pembaruan keamanan, akses SSH terbatas, MFA akun penyedia, firewall menolak masukan secara default |
| Perubahan autentikasi memutus klien berjalan | Kode saat ini memakai Bearer JWT | Periode tumpang tindih terkendali, pantau, hapus rute lama setelah paritas |
| Migrasi data dari Neon | Belum diverifikasi ada data nyata | Audit M0, latihan `pg_dump` dan `pg_restore`, hindari dua sistem menerima penulisan |
| Kemampuan PWA lebih terbatas dari native, termasuk perilaku di iOS Safari | Tidak diukur | Uji perangkat nyata; evaluasi ulang native bila kebutuhan terbukti |
| Kebocoran data lintas keluarga | Risiko kritis di BRD | Uji IDOR dengan dua keluarga, kebijakan otorisasi terpusat |
| Dokumen dan kode tidak sinkron | Banyak dokumen masih menyebut React Native | Amandemen formal PRD dan dokumen terkait |

### Keputusan signifikan

Lihat [decisions.md](decisions.md): ADR-001 (PWA) dan ADR-004 serta ADR-008 (VPS dengan Docker) diputuskan pengguna; ADR lain masih diusulkan.

### Strategi migrasi

Fase M0 sampai M5 dari SAD bagian 14: audit dasar, kesiapan keamanan dan API, fondasi PWA, paritas fitur, peningkatan produk, pilot dan rilis. Gerbang M0 wajib sebelum migrasi apa pun yang bersifat destruktif. Jadwal dan penanggung jawab: TBD.

### Bukti peninjauan

Belum ada. Audit repositori, peninjauan keamanan independen, uji restore, dan persetujuan arsitektur belum dilakukan. Tanda tangan arsitektur pada SAD (pemilik produk, tech lead, peninjau keamanan dan privasi, DevOps) masih kosong. Catatan keamanan dan operasi ada di repo privat `filio-internal`.
