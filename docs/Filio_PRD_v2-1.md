# Product Requirements Document (PRD) — Filio

**Versi:** 2.0 — revisi berdasarkan BRD Filio v2  
**Tanggal:** 31 Oktober 2026  
**Status:** Draft untuk review produk, desain, editorial, dan engineering  
**Platform:** iOS & Android — React Native/Expo (dipertahankan dari PRD awal)  
**Keterkaitan:** `Filio_BRD_v2.md`  
**Perhatian:** Daftar fitur yang tertulis **bukan klaim sudah diimplementasikan**.

## 1. Latar belakang dan perubahan arah

**Basis PRD awal:** Filio adalah aplikasi mobile yang mencatat aktivitas anak, mengikatnya ke keluarga, mendukung multi-tag 8 fitrah, menampilkan timeline dan statistik progress bar. Sasaran: orang tua muda dan praktisi homeschooling. 

**Keputusan desain yang diusulkan:** Filio menjadi **pendamping aktivitas dan refleksi keluarga**, dengan alur *Explore → Do → Capture → Reflect → Plan*. Tidak mengejar “keseimbangan 8 fitrah” yang didasarkan pada banyaknya tag sebagai representasi perkembangan anak.

**Copy positioning:** “Filio membantu keluarga menemukan ide aktivitas bersama anak, menyimpan momen bermakna, dan merefleksikan pengalaman pengasuhan.”

**Non-claims:** Filio tidak mengukur kecerdasan, kesehatan mental, bakat bawaan, kematangan seksual, tingkat keimanan, atau kualitas pengasuhan; bukan alat skrining/diagnosis atau pengganti konsultasi ahli.

## 2. Pengguna, ruang lingkup, dan outcome

| Persona | Tujuan | Pekerjaan utama |
|---|---|---|
| Orang tua primer (MVP) | Kegiatan sesuai kesempatan dan kebutuhan keluarga | Cari ide, catat momen, lihat ringkasan |
| Orang tua pendamping (V1.1) | Menjaga kesinambungan bersama pasangan | Lihat/edit sesuai izin, koordinasi |
| Praktisi home education (MVP) | Portofolio kegiatan | Timeline, kategori, refleksi |
| Kurator aktivitas komunitas (V1.1+) | Menyediakan inspirasi relevan | Kelola aktivitas publik terkurasi; tanpa akses data anak |

**Beachhead pilot [hipotesis]:** orang tua anak 3–9 tahun, dengan jalur kegiatan untuk keluarga yang tidak homeschooling. Usia pilot perlu diuji; bukan batas sahih teori fitrah.

**Outcome MVP:** keluarga aman membuat akun; menyelesaikan kegiatan atau catatan tanpa beban; mendapat saran tindak lanjut sederhana; memahami grafik sebagai catatan, bukan skor anak.

**North star usulan:** Weekly Meaningful Family Engagement (WMFE); diukur melalui event opt-in kegiatan/refleksi, tidak menggunakan data teks atau foto jurnal di alat analitik pihak ketiga.

## 3. Product principles

1. Anak bukan metrik kinerja; jangan berikan ranking/label personal.
2. Nilai ada pada relasi dan kualitas momen, bukan target pencatatan.
3. Tidak mencatat bukan berarti tidak melakukan aktivitas.
4. Gunakan bahasa empatik, nonkompetitif, tanpa rasa bersalah.
5. Perbedaan usia, latar keluarga, neurodiversitas, keterbatasan waktu dan akses bahan dipertimbangkan.
6. Privasi anak **default private** dan di bawah kendali orang tua/wali.
7. 8 fitrah adalah taksonomi interpretatif dengan definisi dan versi yang dikurasi, bukan standar klinis.
8. Transparansi ketika konten merupakan inspirasi umum versus rekomendasi yang dikaji ahli.

## 4. Ruang lingkup rilis dan prioritas

| Feature | MVP (P0/P1) | V1.1 | V2+ |
|---|---|---|---|
| Autentikasi dan Family | P0 | Invite/roles multi-parent | — |
| Profil anak minimal | P0 | Preferred interests | — |
| Jurnal multi-tag, timeline | P0 | Foto privat | Lampiran lanjutan |
| Ringkasan distribusi catatan per kategori | P0 | Filter waktu | Tren longitudinal terbatas |
| Ide aktivitas terkurasi (minimal set) | P1 | Katalog lebih kaya | Contributor-curated |
| Refleksi sederhana/next step | P1 | Weekly recap | Personal planning |
| Export/delete/privacy controls | P0 | Granular sharing | — |
| Komunitas publik | — | Kurasi saja | Bersyarat hasil risk review |
| AI berbasis data jurnal | — | — | Bersyarat dan opt-in |
| Payment | — | WTP experiment | Premium jika valid |

**Batas MVP:** tidak ada akun anak, feed publik, ranking anak, target wajib “8/8 fitrah”, diagnosis, AI tak terkurasi, iklan perilaku berbasis data anak, atau perpesanan anak.

## 5. User journey dan UX

### 5.1 Aktivasi pertama

1. Layar perkenalan: manfaat dan penjelasan privasi singkat.
2. Registrasi: nama panggilan orang tua, email, password; buat nama keluarga (boleh pseudonim).
3. Persetujuan dan pernyataan otoritas sebagai orang tua/wali sebelum membuat profil anak; kebijakan data mudah diakses.
4. Tambah anak dengan **nama panggilan** dan tanggal lahir (tanggal lahir hanya bila diperlukan rekomendasi usia; tampilkan kegunaannya). Minimalkan field.
5. Pilihan beranda: “Cari ide kegiatan” / “Catat momen” / “Lihat cerita keluarga”.
6. Tawarkan satu contoh aktivitas yang dapat dilakukan tanpa alat khusus; tidak memaksa input aktivitas.

### 5.2 Catat aktivitas (target ≤45 detik dalam pengujian)

Pilih anak → masukkan judul singkat atau template → tanggal (default hari ini) → tag kategori opsional/suggested dan dapat diedit → catatan pengalaman opsional → simpan → sukses. Jangan memaksa delapan tag atau panjang catatan.

### 5.3 Refleksi mingguan

Tampilkan beberapa aktivitas tercatat; pertanyaan ringan “Apa yang paling dinikmati anak?” dan “Minggu depan ingin mencoba apa?”; satu aksi kecil; tidak menampilkan teks “kurang” atau nilai gagal.

### 5.4 Dashboard anak

Header profil → kartu “Momen terakhir” → ringkasan “Aktivitas yang tercatat” → delapan progress bar **berdasarkan frekuensi tag atau jumlah aktivitas unik** dengan label metrik eksplisit → CTA ide berikutnya. Tampilkan periode dan `N` aktivitas. Jika N=0, empty state netral (“Belum ada catatan di periode ini”). Tidak menggunakan warna merah untuk kategori dengan nilai rendah. Jangan menggunakan denominator target normatif seperti “100% perkembangan”.

## 6. Persyaratan fungsional terinci dan acceptance criteria

### Epic A — Akun, keluarga, otorisasi

| ID | Prioritas | User story / requirement | Acceptance criteria |
|---|---|---|---|
| F-A01 | P0 | Pengguna dapat membuat akun & keluarga. | Email unik; validasi; password di-hash; family otomatis dibuat; tidak mengirim password ke log. |
| F-A02 | P0 | Login/logout/token aman. | Access token pendek + refresh token yang dapat dicabut (atau session server); logout revokes session; error generik untuk kredensial. |
| F-A03 | P0 | Anggota keluarga hanya melihat data keluarga berizin. | Semua endpoint child/activity memvalidasi family membership dari server, bukan percaya familyId dari JWT/request; cross-family IDOR ditolak. |
| F-A04 | P0 | Pengguna dapat membaca notice & memberi consent yang relevan. | Timestamp dan versi notice dicatat; pilihan opsional terpisah dari kebutuhan layanan; tidak ada akun anak. |
| F-A05 | P0 | Pengguna dapat meminta ekspor dan penghapusan data. | Alur jelas; identitas diverifikasi; eksekusi terkontrol termasuk backup retention policy; audit tanpa isi sensitif. |
| F-A06 | P1/V1.1 | Admin keluarga dapat mengundang pasangan/caregiver. | Kode kedaluwarsa/single-use; invitee memberi persetujuan; role viewer/editor; revoke langsung; perubahan tercatat. |

**Skenario penting:** dua orang tua berpisah, wali bukan orang tua biologis, akses caregiver sementara, satu user lebih dari satu keluarga (future model). Dalam MVP model satu keluarga per user dapat tetap digunakan **hanya bila** tidak mengunci migrasi ke membership many-to-many.

### Epic B — Anak

| ID | Prioritas | User story / requirement | Acceptance criteria |
|---|---|---|---|
| F-B01 | P0 | Buat profil anak minimal. | Nama panggilan wajib; tanggal lahir optional/required by chosen age-aware feature; hanya terlihat anggota berizin. |
| F-B02 | P0 | Daftar, edit dan hapus profil anak. | Konfirmasi penghapusan; entri terkait masuk prosedur delete/retention; tidak dapat mengambil profil milik keluarga lain. |
| F-B03 | P1 | Anak terpilih selalu jelas di aplikasi. | Header identitas anak dan switcher, menghindari salah input saudara. |

### Epic C — Jurnal aktivitas

| ID | Prioritas | User story / requirement | Acceptance criteria |
|---|---|---|---|
| F-C01 | P0 | Catat judul, deskripsi opsional, tanggal. | `activityDate` sesuai timezone Asia/Jakarta, dapat diubah; draft validation; server timestamp terpisah. |
| F-C02 | P0 | Multi-tag dari master 8 fitrah. | 0–8 tag pada draft, minimal 1 saat menyimpan jika analitik kategori dibutuhkan **atau** izinkan untagged dan tampilkan dalam ringkasan; tidak menggandakan tag sama. **Keputusan:** simpan tanpa tag diizinkan. |
| F-C03 | P0 | Timeline per anak. | Default terbaru; pagination; filter anak; edit/delete; audit edit minimal. |
| F-C04 | P1 | Refleksi pengalaman opsional. | Field `childResponse`/`parentReflection` bersifat bebas, tidak mewajibkan deskripsi sifat anak. |
| F-C05 | V1.1 | Lampiran foto privat. | Consent per upload, metadata EXIF/lokasi dihapus, ukuran/jenis terbatas, signed URLs, delete cascade, tidak publik. |

### Epic D — Klasifikasi fitrah dan insight

| ID | Prioritas | User story / requirement | Acceptance criteria |
|---|---|---|---|
| F-D01 | P0 | Pengguna melihat 8 kategori beserta penjelasan. | Label awal dipertahankan: Keimanan, Belajar, Bakat, Seksualitas, Estetika, Sosial, Jasmani, Perkembangan. Definisi harus disahkan panel reviewer sebelum public beta. |
| F-D02 | P0 | Hitung jumlah aktivitas yang ditag per kategori. | Satu aktivitas dihitung maksimum sekali per kategori; denominator ditampilkan; 1 aktivitas dapat muncul di beberapa kategori; jumlah per kategori boleh melebihi jumlah aktivitas. |
| F-D03 | P0 | Progress bar deskriptif. | Label “X aktivitas tercatat”; bukan persen capaian anak; bila persen distribusi digunakan, rumus dan konsekuensi multi-tag dijelaskan; lebih disarankan bar berskala maksimum per periode tanpa tujuan normatif. |
| F-D04 | P0 | Informasi keterbatasan interpretasi. | Copy: “Ini mencerminkan catatan aktivitas, bukan penilaian perkembangan anak.” Visible pada chart dan onboarding insight. |
| F-D05 | V1.1 | Filter periode. | Minggu/bulan/custom; recomputation konsisten; empty states. |
| F-D06 | V1.1? | Radar chart evaluasi ulang. | Hanya diluncurkan bila uji pengguna membuktikan tidak ditafsirkan sebagai skor/target normatif; default bukan radar. |

**Aturan metrik:** `count_by_category(c, period) = COUNT(DISTINCT activity_id)` pada activity milik anak yang aktif pada periode dan memiliki `FitrahTag=c`. `N = COUNT(DISTINCT activity_id)` termasuk untagged. Tidak ada peringkat “fitrah tertinggal”. Sistem tidak mengirim alert jika tidak ada aktivitas.

### Epic E — Inspirasi dan refleksi

| ID | Prioritas | User story / requirement | Acceptance criteria |
|---|---|---|---|
| F-E01 | P1 | Lihat aktivitas terkurasi dengan umur/perkiraan durasi/bahan. | Minimal koleksi editorial awal (mis. 24 aktivitas sebagai **target konten yang diusulkan**), semua memiliki safety note, source/editor, tanggal review. |
| F-E02 | P1 | Filter ide berdasarkan kondisi nyata. | Usia (jika tersedia), durasi, indoor/outdoor, biaya/bahan, aksesibilitas; jangan mensyaratkan data sensitif. |
| F-E03 | P1 | Selesaikan aktivitas dan buat jurnal dari template. | Satu-tap “Sudah dicoba” membuka pre-filled activity; tidak otomatis menyimpulkan perkembangan. |
| F-E04 | P1 | Reflection prompt mingguan. | Opsional, bisa dilewati; tersimpan privat; tidak mengeluarkan judgement dari jumlah tag. |
| F-E05 | V1.1 | Summary dan rencana minggu depan. | Deskriptif dan dapat diedit; tidak otomatis memberi skor anak. |

### Epic F — Komunitas (pasca MVP)

| ID | Scope | Requirement | Acceptance criteria |
|---|---|---|---|
| F-F01 | V1.1 | Kurator/editor mempublikasikan aktivitas ke katalog. | Approval editorial, audit revisi, tak ada akses ke child/activity private. |
| F-F02 | V2 (conditional) | Koleksi aktivitas per komunitas | Sharing default non-public; hanya template/ide, bukan catatan anak; moderator dan report-abuse. |
| F-F03 | Out of scope | Feed foto anak, leaderboard, komentar langsung pada profil anak | Tidak disediakan. |

### Epic G — AI (V2 bersyarat)

**Constraint:** Tidak menggunakan “fitrah terendah” sebagai indikator defisit anak. Rekomendasi awal berbasis aturan editorial dan preferensi keluarga (waktu, alat, usia), bukan inferensi AI dari data sensitif. Untuk setiap AI yang membaca jurnal privat: butuh opt-in granular, disclosure pemroses/lokasi, minimisasi, proteksi prompt injection, review konten, audit, delete propagation, dan kemampuan menonaktifkan tanpa kehilangan core experience. Tidak mengirimkan data anak ke training model eksternal secara default.

## 7. Information architecture

```
Filio
├── Beranda
│   ├── Pilih Anak
│   ├── Ide kegiatan hari ini
│   ├── Catat momen
│   └── Cerita terbaru
├── Aktivitas
│   ├── Katalog ide terkurasi
│   ├── Detail ide
│   └── Tandai sudah dicoba
├── Jurnal
│   ├── Timeline per anak
│   ├── Tambah/Edit aktivitas
│   └── Detail aktivitas & refleksi
├── Refleksi
│   ├── Ringkasan aktivitas tercatat
│   ├── Prompt refleksi
│   └── Rencana berikutnya
└── Keluarga & Pengaturan
    ├── Profil anggota/anak
    ├── Privasi, izin & consent
    ├── Ekspor/hapus data
    └── Bantuan & disclaimer
```

## 8. Data model usulan dan kompatibilitas

| Entitas | Field penting | Catatan |
|---|---|---|
| `Family` | id, displayName, createdAt | Existing |
| `User` | id, fullName, email, passwordHash, createdAt | Existing; password tidak plaintext |
| `FamilyMembership` | familyId, userId, role, status, invitedAt, revokedAt | Future-proof; migrasi dari User.familyId |
| `Child` | id, familyId, nickname, dateOfBirth?, createdAt, deletedAt | Hindari nama legal jika tidak diperlukan |
| `FitrahFrameworkVersion` | id, version, editorialStatus, publishedAt | Governance taksonomi |
| `FitrahTag` | id, frameworkVersionId, code, label, description | Pertahankan label awal hingga review |
| `Activity` | id, childId, createdBy, title, description?, activityDate, parentReflection?, createdAt, updatedAt, deletedAt | Timeline/portofolio |
| `ActivityFitrahTag` | activityId, fitrahTagId | Unique pair; tagging multi-kategori |
| `ActivityTemplate` | id, title, steps, ageMin?, ageMax?, durationMin?, materials?, safetyNotes, editorialStatus | Tidak memuat data anak |
| `ActivityTemplateTag` | templateId, fitrahTagId | Kurasi |
| `WeeklyReflection` | id, childId, weekStart, note?, nextStep?, authorId | Optional |
| `ConsentRecord` | id, subjectUserId, familyId, purpose, policyVersion, grantedAt, withdrawnAt | Audit consent |
| `AccessAudit` | id, actorId, action, entityType, entityId, timestamp | Hindari konten jurnal/log sensitif |
| `DeletionRequest` | id, requesterId, scope, status, submittedAt, completedAt | Hak data |

**Migration:** introspeksi skema Prisma existing → buat migrasi non-destruktif → backfill `FamilyMembership` dari `User.familyId` → enforce server-side policy → deploy bertahap. Jangan menganggap database awal sudah cocok tanpa pemeriksaan.

## 9. API contract konseptual

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/auth/register`, `/auth/login`, `/auth/refresh`, `/auth/logout` | Sessions |
| GET/PATCH | `/families/me` | Keluarga |
| GET/POST | `/children` | Anak family-scoped |
| GET/PATCH/DELETE | `/children/:id` | Role + ownership enforcement |
| GET/POST | `/children/:id/activities` | Filter/pagination |
| GET/PATCH/DELETE | `/activities/:id` | Otorisasi per object |
| GET | `/fitrah/categories` | Versioned taxonomy |
| GET | `/children/:id/insights?from&to` | Counts + metadata + disclaimer |
| GET | `/activity-templates` | Katalog/editorial filters |
| POST | `/children/:id/reflections` | Refleksi |
| GET/POST | `/privacy/export`, `/privacy/deletion-requests` | Hak data |

**Response insight minimal:** `{period, totalActivities, taggedActivities, categories:[{code,count}], methodVersion, disclaimer}`. `categories` adalah counts, bukan maturity scores.

## 10. Non-functional requirements dan keamanan

| Kategori | Standar MVP yang diusulkan |
|---|---|
| Auth | Password hash kuat bcrypt/Argon2id sesuai parameter modern, rate limiting, token revocation/rotation, TLS |
| Authorization | Family-scoped ABAC/RBAC server-side per endpoint; negative tests untuk IDOR/tenant leakage |
| Data anak | Minimal fields; strict retention; privacy policy; no public indexing; encryption in transit/at rest; controlled backups |
| Log & analytics | Tidak merekam nama/tanggal lahir/isi jurnal/token; hanya event agregat dan identifier pseudonim terbatas |
| Performance | P95 API non-cold start target <800 ms dalam pengujian standar; ukur cold start terpisah, tidak mengklaim SLA Cloud Run |
| Reliability | Error monitoring, alert untuk kegagalan autentikasi/migrasi; restore test dan backup policy |
| Accessibility | Font scalable, contrast, labels untuk screen reader, navigasi sederhana, Android low-end test |
| Offline | Tidak wajib MVP; draft lokal aman/queued write diuji untuk koneksi buruk bila diprioritaskan |
| Deployment | CI checks, test suite, image scan, migrations sebagai job terpisah dan idempotent (hindari menjalankan migration dari setiap container scale-out) |
| Compliance | Review UU PDP Pasal 25, PP TUNAS dan turunannya sesuai penerapan, PSE registration applicability, transfer luar negeri |
| Documentation | Data inventory, data flow, DPIA, runbook incident, consent policy, threat model, API spec |

**Stack:** frontend React Native + Expo/EAS; backend Node.js + Express; PostgreSQL/Neon + Prisma; Cloud Run container; GitHub CI/CD — **dipertahankan sebagai baseline existing**. AWS S3/GCS untuk foto hanya dipilih setelah data-residency, biaya dan security review. JWT yang memuat `familyId` **tidak boleh** menjadi satu-satunya sumber otorisasi saat role/membership bisa berubah.

## 11. Acceptance criteria end-to-end dan QA

1. User A keluarga A tidak dapat membaca/menulis child/activity keluarga B walau mengetahui ID (403/404 sesuai policy).
2. User tanpa consent/otoritas yang diperlukan tidak dapat melanjutkan pembuatan profil anak sebelum proses yang relevan selesai.
3. Setelah user mencatat aktivitas dengan tag Belajar dan Sosial, masing-masing count naik satu dan total activity naik satu, tanpa menghasilkan persentase perkembangan.
4. Aktivitas tanpa tag tetap muncul di timeline dan total aktivitas, tetapi tidak dihitung pada kategori.
5. Dashboard dengan nol data tidak memunculkan alarm “fitrah tertinggal”.
6. Penghapusan aktivitas mengubah statistik secara konsisten; soft-delete dan backup ditangani dalam kebijakan retensi.
7. Activity template bebas dari klaim diagnosis dan memiliki editorial review.
8. Pengguna dapat menolak notifikasi dan tetap menggunakan fungsi utama.
9. Export berisi data hanya yang berhak diakses, melalui proses aman; request deletion dapat dilacak.
10. Semua screenreader labels untuk actions utama diuji di Android/iOS.
11. Build Android dan iOS dilakukan melalui release pipeline yang tervalidasi; APK distribusi bukan bukti siap rilis publik.
12. Dalam usability test, mayoritas peserta menjelaskan grafik sebagai *catatan aktivitas*, bukan *skor perkembangan anak*.

## 12. Analitik produk dan eksperimen

| Event (tanpa PII anak) | Properti terbatas | Kegunaan |
|---|---|---|
| `onboarding_completed` | cohort, device_class | Aktivasi |
| `child_profile_created` | coarse_age_band? | Funnel (hindari DOB) |
| `activity_logged` | entry_mode, tagged_count | Friksi jurnal |
| `template_viewed`/`template_tried` | template_id | Value ide |
| `reflection_completed` | week_bucket | Revisit value |
| `insight_viewed` | chart_version | Interpretasi |
| `export_requested`/`deletion_requested` | status | Trust compliance |

**Core metrics:** activation (first meaningful action ≤7 hari), TTFV, median entry time, W1/W4 retention, % keluarga yang mencoba aktivitas, weekly reflection rate, privacy incidents, opt-out of notifications. **Jangan mengukur 'perkembangan anak' dari activity logs.**

**Eksperimen:** A/B onboarding ide-first vs jurnal-first; progress bar vs text summary dengan comprehension test; diary reminder (opt-in) vs no reminder; mode ultra-fast entry. Tetapkan data minimization dan persetujuan eksperimen.

## 13. Rencana delivery dan dependency

### Stabilization Sprint 0 — audit eksisting
- Inventaris kode/API/database sesuai PRD asli; verifikasi deployment, migrations, token, authorization.
- Security review dan privacy data map; backfill plan jika skema berubah.
- Editorial board mendefinisikan 8 fitrah dan disclaimer.
- Prototype dashboard dengan copy non-klinis dan usability testing.

### MVP revised — P0
- Akun/keluarga/profil anak + consent/privacy controls.
- Jurnal/timeline/multi-tag dan statistik *activity counts* yang benar.
- Contextual action di beranda, private-by-default, ekspor/penghapusan.
- QA security/UX, test release dan observability.

### MVP value enhancement — P1
- 24 curated activities sebagai target awal (jumlah bisa berubah setelah editorial capacity check).
- Template-based logging dan 1–2 prompt refleksi.
- Pilot bersama keluarga dan komunitas pengasuhan secara sukarela.

### V1.1
- Kolaborasi multi-caregiver, filter waktu, curated catalog lanjutan, foto private opsional, weekly review.

### V2 bersyarat
- Rekomendasi personal dan komunitas kurasi setelah pembuktian nilai, review keselamatan, privacy/legal, dan kapasitas operasi. Tidak mengasumsikan AI harus diluncurkan.

**Release gates:** security acceptance, consent and legal review, editorial taxonomy sign-off, analytics minimization, usability comprehension, restore verification, rollback plan, documented incident response.

## 14. Open questions dan trade-offs

- Apakah kerangka 8 fitrah perlu disajikan sebagai label terbuka atau dapat dipilih sesuai pendekatan keluarga? Harus diputuskan setelah riset dan review konten.
- Apa definisi dan sumber primer dari setiap fitrah, terutama Seksualitas dan Perkembangan? **Belum diverifikasi**.
- Apakah MVP harus mensyaratkan tanggal lahir presisi atau cukup kelompok usia? Minimasi vs personalisasi.
- Parent-only atau kelak anak mengakses? Untuk MVP pilih parent-only demi kesederhanaan, tetapi evaluasi applicability regulasi secara legal.
- Apakah freemium feasible? Belum ada WTP valid.
- Apakah mengizinkan shared custody atau beberapa keluarga per user? Tunda UI namun tidak mengunci skema.
- Apakah konten memerlukan advisory board profesional, fasilitator FBE, atau keduanya? Rekomendasi: keduanya untuk klaim dan keselamatan.
- Apakah cloud vendor cross-border memenuhi requirement hukum dan pilihan bisnis? Perlu counsel dan DPA.

## 15. Traceability perubahan dari PRD awal

| ID asli | Keputusan | ID baru |
|---|---|---|
| F-1.1, F-1.2 | Pertahankan akun/family, perluas keamanan sesi | F-A01–F-A05 |
| F-1.3 roadmap invite | Masuk V1.1 dengan RBAC/revocation | F-A06 |
| F-2.1, F-2.2 | Pertahankan, minimisasi identitas anak | F-B01–F-B03 |
| F-3.1–F-3.3 | Pertahankan, perbaiki UX dan privasi | F-C01–F-C05 |
| F-4.1 | Ubah dari skor keseimbangan menjadi jumlah aktivitas per kategori | F-D01–F-D04 |
| F-4.2 filter tanggal | Pertahankan V1.1 | F-D05 |
| Radar chart | Conditional, bukan otomatis roadmap | F-D06 |
| AI rekomendasi dari skor terendah | Ganti menjadi rekomendasi contextual opt-in, non-diagnostik | Epic G |
| Komunitas (judul fase 3) | Definisikan sebagai katalog terkurasi terlebih dulu | Epic F |

## 16. Sumber dan catatan verifikasi

- PRD asli pemilik produk: `prd_filio.md`, dibaca 31 Oktober 2026 (status implementasi tidak diaudit).
- BRD pendamping: `Filio_BRD_v2.md` — bagian 2 dan 14 memuat evidensi serta tautan riset primer/sekunder.
- WHO Nurturing Care framework: https://www.who.int/publications/i/item/9789290228318
- UNICEF parenting guidance: https://www.unicef.org/indonesia/id/laporan/panduan-penyusunan-program-pengasuhan-remaja
- UU PDP: https://peraturan.bpk.go.id/Home/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf
- Aturan perlindungan anak digital 2026: https://www.setneg.go.id/baca/index/lindungi_anak_di_ranah_digital_kemkomdigi_terbitkan_aturan_teknis_pp_tunas
- Kriteria PSE: https://pse.komdigi.go.id/panduan/kriteria-pendaftaran-pse-lingkup-privat

*Dokumen ini membedakan keadaan awal yang dilaporkan, evidensi eksternal, hipotesis, serta rekomendasi desain. Belum menggantikan studi pengguna, pemeriksaan ahli atau nasihat hukum.*
