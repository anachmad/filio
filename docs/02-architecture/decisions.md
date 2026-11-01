# Decisions

Status: draft
Owner: TBD

Sumber usulan: [SAD v1.2](../Filio_SAD_v1.2_VPS_Cloudflare_Tunnel.md), bagian 3. Penomoran ADR mengikuti SAD agar rujukan tetap stabil. Persetujuan formal oleh pihak yang berwenang belum ada, jadi ADR berstatus "Diputuskan pengguna" belum berstatus approved menurut standar dokumentasi. Hal yang belum diketahui dicatat sebagai TBD.

Arti status: **Diputuskan pengguna** berarti pengguna proyek menyatakan keputusan itu dalam sesi kerja; **Diusulkan** berarti ada di SAD tetapi belum diputuskan.

## Significant ADR identifiers, context, options and decisions

### ADR-001: Frontend web-first berupa PWA, menggantikan React Native

- **Status:** Diputuskan pengguna, 2026-11-01. Persetujuan formal: TBD.
- **Konteks:** PRD v2.0 mempertahankan React Native/Expo sebagai baseline. Repositori saat ini memiliki `mobile/` (React Native/Expo) dan APK belum dirilis. SAD mengusulkan web-first agar iterasi produk lebih cepat, onboarding lewat URL dari komunitas, dan satu pengalaman web responsif.
- **Opsi:**
  1. Tetap React Native/Expo (PRD v2.0).
  2. PWA web-first sebagai frontend utama.
  3. Expo Web, yaitu memakai ulang kode React Native untuk web. Ditolak sementara oleh SAD; audit penggunaan ulang kode bisa mengubah penilaian.
  4. Dua UI sekaligus (React Native dan PWA). Ditolak sementara oleh SAD karena menggandakan pengujian dan pemeliharaan sebelum pasar divalidasi.
  5. Next.js. Ditolak sementara oleh SAD; relevan bila SEO atau konten publik menjadi prioritas.
- **Keputusan:** opsi 2. PWA menjadi frontend utama.
- **Konsekuensi:**
  - Aplikasi di toko aplikasi dan APK tidak lagi menjadi syarat MVP (SAD bagian 14). PRD dan dokumen yang menyebut iOS dan Android perlu diperbarui secara formal; SAD menyatakan PRD harus diamandemen untuk perubahan platform.
  - Kemampuan native (tugas latar belakang, integrasi OS) lebih terbatas; evaluasi ulang bila kebutuhan terbukti.
  - Repositori `mobile/` dibiarkan utuh atau diarsipkan sampai paritas fungsional di browser terbukti. Tidak ada pengembangan fitur ganda.
  - Perlu desain ulang kebijakan cache, sesi, dan aksesibilitas untuk browser (lihat `system-requirements.md`, NFR-03, NFR-08, NFR-11, NFR-13).
  - Dokumen UI/UX di [ui-ux.md](../01-requirements/ui-ux.md) harus mengacu ke web.
- **Peninjau dan referensi:** SAD v1.2 bagian 3. Peninjau: TBD.

### ADR-004 dan ADR-008: Aplikasi dan basis data pada satu VPS dengan Docker

- **Status:** Diputuskan pengguna, 2026-11-01, untuk cakupan di bawah. Persetujuan formal: TBD.
- **Konteks:** PRD dan dokumen awal menyebut PostgreSQL di Neon dan backend di Cloud Run, namun keadaan nyata belum diaudit. SAD mengusulkan seluruh komponen berjalan di satu VPS.
- **Opsi:**
  1. Neon dan Cloud Run (PRD v2.0).
  2. Aplikasi dan PostgreSQL pada satu VPS dalam kontainer Docker.
  3. Komponen terpisah di beberapa host. Tidak dibahas SAD untuk MVP.
- **Keputusan (cakupan yang diputuskan):** frontend, API, dan PostgreSQL berjalan di VPS, dikemas dengan Docker. PostgreSQL self-hosted dengan Prisma. Neon dan Cloud Run tidak menjadi target produksi.
- **Belum diputuskan dan tetap berstatus Diusulkan:** Cloudflare Tunnel sebagai jalur masuk publik, pilihan reverse proxy (Caddy atau Nginx), Docker Compose sebagai orkestrator, satu VPS tunggal versus beberapa, penyedia dan spesifikasi VPS, serta domain.
- **Konsekuensi:**
  - VPS tunggal adalah titik kegagalan tunggal. Wajib ada backup terenkripsi di luar lokasi, pemantauan, dan prosedur pemulihan yang diuji.
  - Tim bertanggung jawab atas hardening VPS, pembaruan OS dan PostgreSQL, backup, pemulihan, dan ketersediaan.
  - Basis data tidak boleh memiliki port publik dan hanya dapat dijangkau dari jaringan privat Docker.
  - Migrasi Prisma berjalan sebagai job terpisah, bukan dari entrypoint kontainer (lihat ADR-010).
  - Migrasi dari Neon hanya dilakukan bila data nyata ada; itu diverifikasi di audit M0. Jika tidak ada data, cukup migrasi skema.
  - Perubahan ini memengaruhi RPO dan RTO, yang masih TBD, dan wajib tercermin di dokumen pemulihan pada repo privat `filio-internal`.
- **Peninjau dan referensi:** SAD v1.2 bagian 3, 4, 11. Peninjau keamanan independen: TBD (diwajibkan oleh profil business-critical).

## Consequences, status, owner and review references

### ADR yang masih diusulkan (belum diputuskan)

Semua butir berikut berasal dari SAD v1.2 dan belum dikonfirmasi. Beberapa bergantung pada keputusan PWA di atas.

| ID | Usulan | Status | Catatan |
|---|---|---|---|
| ADR-002 | React, TypeScript, dan Vite SPA | Diusulkan | Pilihan pustaka final dikunci setelah audit kompatibilitas |
| ADR-003 | Express sebagai modular monolith | Diusulkan | Hindari microservices sampai ada kebutuhan skala |
| ADR-005 | Privat secara default; otorisasi berbasis keluarga di server | Diusulkan | Sejalan dengan FR-A03 dan NFR-02 |
| ADR-006 | Sesi web yang dapat dicabut lewat cookie `HttpOnly; Secure; SameSite` | Diusulkan | Perlu proteksi CSRF dan strategi transisi dari Bearer JWT |
| ADR-007 | PWA online-first; hanya cache aset statis | Diusulkan | Draf offline ditunda sampai threat model |
| ADR-009 | Metrik sebagai catatan aktivitas, bukan skor anak | Diusulkan | Sejalan dengan BRD dan PRD |
| ADR-010 | Migrasi Prisma sebagai job terpisah, bukan lewat entrypoint | Diusulkan | Entrypoint saat ini menjalankan migrasi; perlu perubahan |

ADR-005, ADR-009, dan ADR-010 menegaskan keputusan yang sudah ada di PRD, BRD, atau pengamatan kode. Keputusan pada ADR-006 menentukan bentuk API sesi dan sebaiknya diputuskan sebelum pekerjaan M1.

### Pertanyaan terbuka yang memengaruhi ADR

Dari SAD bagian 17. Yang dicakup keputusan hari ini: nomor 11 (VPS dan basis data) sebagian. Sisanya tetap terbuka: audit repositori, strategi sesi, domain dan Cloudflare, tata kelola data, migrasi keanggotaan, prioritas MVP, offline, taksonomi, observabilitas, semantik tanggal, dan operasi tunnel.

### Pemilik dan peninjauan

Pemilik keputusan: TBD. Peninjau yang diwajibkan untuk profil business-critical: peninjau arsitektur dan keamanan independen, serta persetujuan bisnis dan teknis terpisah; pencatatannya ada di repo privat `filio-internal`. Belum ada peninjauan yang dilakukan.
