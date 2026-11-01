# System Requirements

Status: draft
Owner: TBD

Sumber: bagian 8 sampai 10 dari [PRD v2.0](../Filio_PRD_v2-1.md) dan bagian 7 sampai 9, 12 dan 13 dari [SAD v1.2](../Filio_SAD_v1.2_VPS_Cloudflare_Tunnel.md). Keduanya berstatus draft dan belum disetujui. Dokumen ini hanya memuat kebutuhan sistem (perilaku, antarmuka, batasan, NFR). Keputusan arsitektur dan alasannya dicatat di [architecture.md](../02-architecture/architecture.md) dan [decisions.md](../02-architecture/decisions.md), bukan di sini. Kebutuhan fungsional pengguna ada di [product-requirements.md](product-requirements.md), dengan ID `FR-xx`. Semua angka adalah usulan, bukan SLA yang dijanjikan. Hal yang belum diketahui dicatat sebagai TBD.

## System behavior, interfaces and constraints

### Konflik sumber yang belum diputuskan: platform dan hosting

PRD v2.0 mempertahankan baseline React Native/Expo di iOS dan Android dengan backend Express, PostgreSQL (Neon) dan Cloud Run. SAD v1.2 mengusulkan hal berbeda: PWA React (web-first) menggantikan React Native, serta satu VPS dengan PostgreSQL self-hosted dan Cloudflare Tunnel tanpa Neon dan Cloud Run. SAD sendiri menyatakan PRD harus diperbarui secara formal untuk perubahan platform, dan perubahan itu belum disetujui. Repositori saat ini berisi `mobile/` (React Native/Expo) dan `server/` (Express, Prisma).

Dampak pada dokumen ini:
- Kebutuhan di bawah dibuat netral platform bila memungkinkan.
- Kebutuhan yang bergantung pada platform diberi tanda `[platform: TBD]`.
- Keputusan platform dan hosting: TBD, sampai ADR terkait disetujui (lihat `decisions.md`).
- SAD merujuk `Filio_PRD_v2.md`, sedangkan berkas yang ada bernama `Filio_PRD_v2-1.md`. Kesetaraan keduanya belum dikonfirmasi.

### Perilaku sistem

Rincian per fitur ada di FR; yang berikut adalah perilaku lintas fitur.

1. **Isolasi keluarga.** Setiap akses data anak, aktivitas dan refleksi ditentukan di server berdasarkan keanggotaan keluarga pengguna yang sedang login. `familyId` dari token, URL atau body tidak boleh menjadi satu-satunya dasar otorisasi. Daftar data difilter di tingkat database. (FR-A03, FR-B02)
2. **Sesi.** Sesi dapat dicabut. Logout mencabut sesi di server. Pesan kegagalan login generik. (FR-A02) Mekanisme: sesi server dengan cookie `HttpOnly; Secure; SameSite` (usulan SAD) atau token pendek dengan refresh token yang dapat dicabut (usulan PRD). Pilihan final: TBD `[platform: TBD]`.
3. **Perhitungan insight.** Hitungan per kategori dan total memakai aktivitas unik (`COUNT(DISTINCT activity_id)`) pada anak yang berizin dan periode terpilih. Aktivitas tanpa tag masuk total tetapi tidak masuk kategori. Satu aktivitas boleh muncul di beberapa kategori, sehingga jumlah antar-kategori dapat melebihi total. Bila persentase ditampilkan, denominatornya adalah jumlah aktivitas tercatat pada periode itu, dan label menyatakannya. Tidak ada skor, ambang atau penanda keterlambatan. `N` nol menghasilkan keadaan kosong netral. (FR-D02, FR-D03)
4. **Tanggal aktivitas.** `activityDate` adalah tanggal kalender lokal (Asia/Jakarta di MVP), bukan timestamp yang bergeser zona waktu. Timestamp pembuatan dan perubahan dari server disimpan terpisah, dalam UTC. (FR-C01)
5. **Penghapusan.** Penghapusan aktivitas dan anak memengaruhi statistik secara konsisten. Soft-delete, retensi dan pembersihan backup mengikuti kebijakan retensi (nilai: TBD). (FR-B02, FR-A05, AC-06)
6. **Hak data.** Ekspor dan permintaan penghapusan melalui alur terverifikasi dan dapat dilacak. Ekspor hanya memuat data yang berhak diakses peminta. (FR-A05)
7. **Consent.** Waktu dan versi pemberitahuan privasi dicatat. Pilihan opsional dipisah dari kebutuhan layanan. (FR-A04)
8. **Analitik dan log.** Tidak ada nama anak, tanggal lahir, isi jurnal, foto atau token di log, analitik atau layanan pihak ketiga. Hanya event agregat atau berpengenal pseudonim terbatas. Pencatatan audit tidak memuat isi jurnal.
9. **Caching data pribadi.** Respons berisi identitas, jurnal atau refleksi tidak disimpan di cache persisten klien. Cache klien dibersihkan saat logout, ganti akun dan sesi habis. Untuk PWA: respons `/api` bersifat `Cache-Control: no-store`, dan service worker hanya menyimpan aset statis berversi `[platform: TBD]`.
10. **Ketersediaan offline.** MVP online-first. Draf offline tidak wajib; bila dipilih, hanya setelah threat model dan dengan opt-in serta masa berlaku. Keputusan: TBD.
11. **Taksonomi.** Delapan kategori fitrah disimpan dengan versi kerangka. Label awal dipertahankan sampai review editorial (FR-D01).

### Antarmuka eksternal dan API

Kontrak berikut konseptual dan harus dipetakan ke API yang ada sebelum dipakai. Jangan memaksa perubahan rute yang memutus klien yang sudah berjalan. Awalan versi (SAD usul `/api/v1`) dan penamaan final: TBD. Respons JSON, tanda waktu ISO 8601 UTC, amplop error konsisten (`code`, `message`, `requestId`) dengan error validasi per field.

| Metode | Endpoint (usulan) | Perilaku | FR |
|---|---|---|---|
| POST | `/auth/register` | Membuat pengguna dan keluarga dalam satu transaksi | FR-A01 |
| POST | `/auth/login` | Membuat sesi; throttling | FR-A02 |
| POST | `/auth/logout` | Mencabut sesi | FR-A02 |
| POST | `/auth/refresh` | Hanya bila memakai refresh token (PRD) | FR-A02 |
| GET | `/auth/me` | Identitas dan keanggotaan keluarga yang berizin (SAD) | FR-A03 |
| GET, PATCH | `/families/me` | Data keluarga (PRD) | FR-A03 |
| GET, POST | `/children` | Daftar dan buat, dalam lingkup keluarga | FR-B01, FR-B02 |
| GET, PATCH, DELETE | `/children/:id` | Pemeriksaan kepemilikan dan peran di server | FR-B02 |
| GET, POST | `/children/:id/activities` | Filter dan pagination | FR-C01, FR-C03 |
| GET, PATCH, DELETE | `/activities/:id` | Otorisasi per objek lewat anak ke keluarga | FR-C01, FR-C03 |
| GET | `/fitrah/categories` | Taksonomi berversi | FR-D01 |
| GET | `/children/:id/insights?from&to` | Hitungan, metadata, disclaimer | FR-D02 sampai FR-D05 |
| GET | `/activity-templates` (PRD) atau `/activity-ideas` (SAD) | Katalog terkurasi; nama final: TBD | FR-E01, FR-E02 |
| GET, POST | `/children/:id/reflections` | Refleksi privat | FR-C04, FR-E04 |
| POST, GET | `/privacy/export` dan `/privacy/deletion-requests` (PRD); `/privacy/exports` (SAD) | Alur hak data; nama final: TBD | FR-A05 |

Respons insight minimal: `{period, totalActivities, taggedActivities, categories:[{code,count}], methodVersion, disclaimer}`. `categories` adalah hitungan, bukan skor kematangan.

Pola otorisasi yang wajib: muat objek, tolak bila tidak ada, cari keanggotaan aktif pengguna pada keluarga objek, tolak bila tidak ada atau izin tidak cukup (404 atau 403 sesuai kebijakan pengungkapan, belum diputuskan), lalu jalankan operasi dengan lingkup keluarga yang diotorisasi.

### Model data

| Entitas | Field penting | Catatan |
|---|---|---|
| `Family` | id, nama tampilan, createdAt | Sudah ada |
| `User` | id, nama, email, passwordHash, createdAt | Sudah ada; email unik ternormalisasi; password tidak pernah plaintext atau di log |
| `FamilyMembership` | familyId, userId, role, status, invitedAt, revokedAt | Usulan; unik `(familyId, userId)`; migrasi dari `User.familyId`; penundaan boleh bila risiko migrasi tinggi, asal desain otorisasi mengantisipasinya |
| `Child` | id, familyId, nickname, dateOfBirth?, createdAt, deletedAt | Data minimal; hindari nama legal |
| `FitrahFrameworkVersion` | id, version, editorialStatus, publishedAt | Tata kelola taksonomi |
| `FitrahTag` | id, frameworkVersionId, code, label, description | Label awal dipertahankan |
| `Activity` | id, childId, createdBy, title, description?, activityDate, parentReflection?, createdAt, updatedAt, deletedAt | Pelaku audit tercatat |
| `ActivityFitrahTag` | activityId, fitrahTagId | Pasangan unik; tanpa tag ganda |
| `ActivityTemplate`, `ActivityTemplateTag` | judul, langkah, usia, durasi, bahan, safetyNotes, editorialStatus | Tidak memuat data anak; P1 |
| `WeeklyReflection` | id, childId, weekStart, note?, nextStep?, authorId | Opsional; P1 |
| `ConsentRecord` | id, subjectUserId, familyId, purpose, policyVersion, grantedAt, withdrawnAt | Audit consent |
| `AccessAudit` | id, actorId, action, entityType, entityId, timestamp | Tanpa isi jurnal |
| `DeletionRequest` | id, requesterId, scope, status, submittedAt, completedAt | Hak data |
| `Session` | id, userId, tokenHash, expiresAt, revokedAt | Hanya bila memakai sesi server (SAD) `[platform: TBD]` |

PRD dan SAD menamai sebagian entitas berbeda (misalnya `ActivityFitrahTag` dan `ActivityFitrah`, `WeeklyReflection` dan `Reflection`, `DeletionRequest` dan `DataRequest`). Nama final: TBD. Migrasi dari skema yang ada harus non-destruktif, dengan pengisian `FamilyMembership` dari `User.familyId` dan kebijakan server-side diberlakukan bertahap. Skema Prisma yang ada diinventaris dahulu dan tidak diasumsikan cocok.

### Batasan

- Hanya orang tua atau wali yang memiliki akun. Tidak ada akun anak, profil publik atau pendaftaran mandiri oleh anak.
- Data anak minimal, privat secara default dan tidak dapat diindeks publik. Tidak ada lokasi presisi yang wajib. Foto bukan kebutuhan P0.
- Data anak tidak dikirim ke layanan AI atau pelatihan model pihak ketiga secara default.
- Basis teknologi saat ini: React Native/Expo, Node.js dengan Express, PostgreSQL dengan Prisma, GitHub untuk CI/CD. Tempat hosting dan opsi PWA: TBD (lihat konflik di atas).
- Penyimpanan foto (V1.1) dipilih hanya setelah tinjauan residensi data, biaya dan keamanan.
- Migrasi Prisma tidak dijalankan dari setiap kontainer yang di-scale (PRD dan SAD sepakat); dijalankan sebagai job terpisah yang idempoten dengan rencana backup dan rollback.
- Kewajiban hukum yang berlaku (UU 27/2022 termasuk Pasal 25, PP 17/2025 dan aturan turunannya, status PSE, transfer lintas negara) belum ditelaah penasihat hukum (TBD).
- Epic AI dan komunitas publik di luar lingkup MVP; perubahan lingkup memerlukan keputusan arsitektur dan tinjauan risiko baru.

## FR and NFR identifiers, acceptance criteria and verification links

Kebutuhan fungsional memakai ID `FR-xx` yang didefinisikan di [product-requirements.md](product-requirements.md) beserta kriteria penerimaannya; dokumen ini tidak menduplikasinya. Bagian berikut mendefinisikan NFR. Seluruh target berstatus usulan. Kolom Sumber menunjukkan asal; bila PRD dan SAD berbeda, keduanya dicatat. Kolom Verifikasi menunjuk bukti yang diperlukan dan dicatat di [verification.md](../04-quality/verification.md) serta [traceability.md](../04-quality/traceability.md). Belum ada bukti yang tercatat.

| ID | Kategori | Kebutuhan | Sumber | Verifikasi | Terkait |
|---|---|---|---|---|---|
| NFR-01 | Autentikasi | Hash password kuat (bcrypt atau Argon2id dengan parameter modern); hash bcrypt lama tetap dapat diverifikasi saat migrasi; rate limiting login dan rute tulis, ekspor dan reset; TLS di semua jalur | PRD 10, SAD 9.2 | Uji integrasi, pemeriksaan konfigurasi | FR-A01, FR-A02 |
| NFR-02 | Otorisasi | Otorisasi berbasis keluarga di server per endpoint; uji negatif IDOR dan kebocoran antar-keluarga dengan sedikitnya dua keluarga | PRD 10 dan 11, SAD 8 | Uji integrasi, AC-01 | FR-A03, FR-B02 |
| NFR-03 | Sesi dan browser | Sesi dapat dicabut dan dirotasi saat login; bila web: cookie `Secure`, `HttpOnly`, `SameSite`, perlindungan CSRF, daftar izin CORS eksplisit; tidak menyimpan token di `localStorage` atau `sessionStorage`; transisi dari Bearer JWT tidak memutus klien berjalan | SAD 9.1 | Uji keamanan browser | FR-A02 `[platform: TBD]` |
| NFR-04 | Data anak | Field minimal; retensi ketat; enkripsi saat transit dan saat disimpan; backup terkontrol; kebijakan retensi, pembersihan backup dan format ekspor ditetapkan sebelum publikasi (nilai: TBD) | PRD 10, SAD 7.2 | Tinjauan privasi, DPIA | FR-A05, FR-B02 |
| NFR-05 | Log dan analitik | Tidak ada nama, tanggal lahir, isi jurnal, foto atau token di log, analitik dan observabilitas pihak ketiga | PRD 10 dan 12, SAD 12 | Inspeksi log, audit privasi | Bagian Perilaku 8 |
| NFR-06 | Header dan input | Validasi dan normalisasi input di server, batas ukuran body, header keamanan, CSP bila web, pemindaian dependensi, rahasia di luar repositori dan bundle klien dengan prosedur rotasi | SAD 9.2 | SAST, pemindaian dependensi, tinjauan keamanan | Seluruh FR |
| NFR-07 | Performa API | P95 baca kurang dari 800 ms pada kondisi normal (bukan cold start), dalam pengujian standar; cold start diukur terpisah; tidak ada klaim SLA | PRD 10, SAD 12 | Telemetri API dan latensi query | Seluruh FR |
| NFR-08 | Performa UX | LCP 2,5 detik atau kurang pada p75 di kondisi seluler representatif, setelah pengujian baseline (hanya jika web) | SAD 12 | Web Vitals privasi-aman | `[platform: TBD]` |
| NFR-09 | Ketersediaan | Target sementara 99,5% keberhasilan API per bulan di luar pemeliharaan terencana; disesuaikan setelah pilot; bukan SLA | SAD 12 (tidak ada di PRD) | Probe sintetis dan log | BR-10 |
| NFR-10 | Keandalan dan pemulihan | Pemantauan error; alert untuk kegagalan autentikasi dan migrasi; kebijakan backup; uji restore berkala; RPO dan RTO: TBD berdasarkan hasil uji restore | PRD 10, SAD 11.1 dan 12 | Latihan restore, pemantauan backup | BR-10 |
| NFR-11 | Aksesibilitas | Font dapat diskalakan, kontras, label pembaca layar, navigasi sederhana, uji Android kelas bawah; target WCAG 2.2 AA untuk alur utama (dari SAD) | PRD 10, SAD 12 | Otomatis dan manual, AC-10 | FR-C03, FR-D03 |
| NFR-12 | Kompatibilitas | Android Chrome dan Samsung Internet, iOS Safari, desktop evergreen terbaru (jika web); perangkat iOS dan Android untuk aplikasi native (jika native) | SAD 12 | QA perangkat nyata | `[platform: TBD]` |
| NFR-13 | PWA | Manifest dapat diinstal, ikon benar, kerangka statis offline, aksi esensial jujur saat offline (hanya jika web) | SAD 12 | Lighthouse dan perangkat fisik | `[platform: TBD]` |
| NFR-14 | Offline | Tidak wajib di MVP; bila diprioritaskan, antrean tulis dan draf lokal diuji untuk koneksi buruk | PRD 10, SAD 9.3 | Uji koneksi buruk | Keputusan terbuka |
| NFR-15 | Deployment | CI dengan lint, tes, SAST dan pemindaian dependensi; pemindaian image; migrasi sebagai job terpisah dan idempoten; rollback API dan frontend ke tag sebelumnya; migrasi basis data kompatibel mundur; build rilis tervalidasi (AC-11) | PRD 10, SAD 11 dan 13 | Pipeline CI, staging, smoke test | BR-10 |
| NFR-16 | Integritas data | Tidak ada akses lintas keluarga; tidak ada pasangan aktivitas dan tag ganda (constraint database); hitungan insight konsisten setelah edit dan hapus | SAD 12 | Uji integrasi dan constraint, AC-04, AC-06 | FR-C02, FR-D02 |
| NFR-17 | Kepatuhan | Tinjauan UU 27/2022, PP 17/2025 dan turunannya, penerapan PSE, transfer lintas negara dan perjanjian pemroses sebelum beta publik | PRD 10, SAD 9.2 | Catatan telaah hukum (belum ada) | BR-06 |
| NFR-18 | Dokumentasi | Inventaris data, aliran data, DPIA, runbook insiden, kebijakan consent, threat model, spesifikasi API tersedia | PRD 10 | Keberadaan dan isi dokumen | BR-06, BR-10 |
| NFR-19 | Infrastruktur VPS | Hanya berlaku bila SAD disetujui: database tanpa port publik, jaringan privat, backup terenkripsi di luar lokasi, kredensial tunnel dikelola sebagai rahasia, SSH hanya lewat jalur terbatas, health check dan batas sumber daya | SAD 4, 11 | Tinjauan konfigurasi, latihan restore | `[platform: TBD]` |

### Pemblokir rilis

Dari SAD bagian 13 dan PRD bagian 13; rilis ditahan bila salah satu terjadi: kebocoran data lintas keluarga; respons sensitif ter-cache; bypass autentikasi atau CSRF; penyimpanan tidak aman atau rahasia terungkap; jalur ekspor dan hapus data tanpa pemilik; rollback gagal; metrik perkembangan berlabel skor yang keliru. Gerbang tambahan dari PRD: keamanan, consent dan legal, pengesahan taksonomi, minimisasi analitik, uji pemahaman, verifikasi restore, rencana rollback, respons insiden.

### Strategi pengujian minimum

Unit (matematika insight multi-tag, parsing tanggal, helper izin, skema input); integrasi API (CRUD, constraint database, kedaluwarsa dan pencabutan sesi, rate limit, IDOR dua keluarga, peran akses); kontrak (kesesuaian rute yang ada, amplop error); E2E (daftar, buat anak, catat aktivitas tanpa tag dan multi-tag, dashboard, edit dan hapus, ekspor dan permintaan hapus); keamanan (daftar periksa relevan ASVS, CSRF, XSS, CORS, kebocoran konten, pemindaian dependensi); kegunaan dan aksesibilitas (PRD AC-12); deployment (migrasi staging, rollback, smoke test). Saat ini `server/package.json` belum memiliki tes, jadi seluruh bukti di atas belum ada.

### Keterkaitan

Seluruh NFR di atas belum memiliki ID uji `TC-`. Penautan ke kasus uji dan bukti dicatat di [traceability.md](../04-quality/traceability.md) (TBD). Persetujuan: belum ada. Karena profil business-critical, persetujuan teknis dan tinjauan keamanan independen dicatat di `approvals.md` pada repo privat `filio-internal`; penyetuju dan tanggal: TBD.
