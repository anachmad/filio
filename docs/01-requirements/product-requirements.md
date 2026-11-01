# Product Requirements

Status: draft
Owner: TBD

Sumber: [PRD v2.0](../Filio_PRD_v2-1.md) (draft untuk review produk, desain, editorial dan engineering; belum disetujui). Dokumen ini merangkum kebutuhan produk dari PRD tersebut dan menautkannya ke kebutuhan bisnis di `business-requirements.md` (repo privat `filio-internal`). Daftar fitur adalah kebutuhan, bukan klaim sudah diimplementasikan. Data model, API konseptual dan kebutuhan non-fungsional masuk ke [system-requirements.md](system-requirements.md). Hal yang belum diketahui dicatat sebagai TBD.

Penomoran: ID `F-xx` di PRD sumber ditulis `FR-xx` di sini dengan huruf dan angka yang sama (misalnya `F-A01` menjadi `FR-A01`). Kolom BR pada tabel adalah usulan keterkaitan dan perlu dikonfirmasi pemilik produk. ID BR mengikuti BRD bagian 9 dan harus selaras dengan `business-requirements.md` di repo privat `filio-internal`.

## Users, use cases and product outcomes

### Pengguna

| Persona | Rilis | Tujuan | Pekerjaan utama |
|---|---|---|---|
| Orang tua primer | MVP | Kegiatan sesuai kesempatan dan kebutuhan keluarga | Cari ide, catat momen, lihat ringkasan |
| Praktisi home education | MVP | Portofolio kegiatan | Timeline, kategori, refleksi |
| Orang tua pendamping | V1.1 | Kesinambungan bersama pasangan | Lihat atau edit sesuai izin, koordinasi |
| Kurator aktivitas komunitas | V1.1+ | Menyediakan inspirasi relevan | Kelola aktivitas terkurasi, tanpa akses data anak |

Segmen pilot yang dihipotesiskan: orang tua anak usia 3 sampai 9 tahun, termasuk keluarga yang tidak homeschooling. Rentang usia pilot belum diputuskan (TBD) dan bukan batas validitas kerangka fitrah.

### Pernyataan posisi dan non-claim

Filio membantu keluarga menemukan ide aktivitas bersama anak, menyimpan momen bermakna dan merefleksikan pengalaman pengasuhan. Alur produk: Explore, Do, Capture, Reflect, Plan.

Filio tidak mengukur kecerdasan, kesehatan mental, bakat bawaan, kematangan seksual, tingkat keimanan atau kualitas pengasuhan. Filio bukan alat skrining atau diagnosis dan bukan pengganti konsultasi ahli.

### Outcome MVP

1. Keluarga membuat akun dengan aman.
2. Keluarga menyelesaikan kegiatan atau catatan tanpa beban.
3. Keluarga mendapat saran tindak lanjut sederhana.
4. Pengguna memahami grafik sebagai catatan aktivitas, bukan skor anak.

North star yang diusulkan: Weekly Meaningful Family Engagement (WMFE), diukur lewat event opt-in tanpa mengirim teks atau foto jurnal ke alat analitik pihak ketiga. Definisi final: TBD.

### Prinsip produk

1. Anak bukan metrik kinerja; tidak ada ranking atau label personal.
2. Nilai ada pada relasi dan kualitas momen, bukan target pencatatan.
3. Tidak mencatat bukan berarti tidak melakukan aktivitas.
4. Bahasa empatik, nonkompetitif, tanpa rasa bersalah.
5. Perbedaan usia, latar keluarga, neurodiversitas, waktu dan akses bahan dipertimbangkan.
6. Privasi anak private secara default dan dikendalikan orang tua atau wali.
7. Delapan fitrah adalah taksonomi interpretatif yang diberi versi, bukan standar klinis.
8. Konten umum dibedakan secara transparan dari rekomendasi yang dikaji ahli.

### Ruang lingkup dan prioritas rilis

| Fitur | MVP | V1.1 | V2+ |
|---|---|---|---|
| Autentikasi dan keluarga | P0 | Undangan dan peran multi-parent | Tidak ada |
| Profil anak minimal | P0 | Minat anak | Tidak ada |
| Jurnal multi-tag dan timeline | P0 | Foto privat | Lampiran lanjutan |
| Ringkasan distribusi catatan per kategori | P0 | Filter waktu | Tren longitudinal terbatas |
| Ide aktivitas terkurasi (set minimal) | P1 | Katalog lebih kaya | Kontributor terkurasi |
| Refleksi sederhana dan langkah berikutnya | P1 | Rekap mingguan | Perencanaan personal |
| Ekspor, hapus dan kontrol privasi | P0 | Berbagi granular | Tidak ada |
| Komunitas publik | Tidak ada | Hanya kurasi | Bersyarat hasil risk review |
| AI berbasis data jurnal | Tidak ada | Tidak ada | Bersyarat dan opt-in |
| Pembayaran | Tidak ada | Eksperimen WTP | Premium jika terbukti |

Di luar MVP: akun anak, feed publik, ranking anak, target wajib "8/8 fitrah", diagnosis, AI tanpa kurasi, iklan perilaku berbasis data anak, perpesanan anak.

### Alur pengguna utama

**Aktivasi pertama.**
1. Layar perkenalan berisi manfaat dan penjelasan privasi singkat.
2. Registrasi: nama panggilan orang tua, email, password, nama keluarga (boleh pseudonim).
3. Persetujuan dan pernyataan otoritas sebagai orang tua atau wali sebelum membuat profil anak.
4. Tambah anak dengan nama panggilan dan tanggal lahir. Tanggal lahir hanya diminta bila perlu untuk rekomendasi usia, dan kegunaannya ditampilkan. Field diminimalkan.
5. Pilihan beranda: cari ide kegiatan, catat momen, lihat cerita keluarga.
6. Satu contoh aktivitas tanpa alat khusus ditawarkan; input aktivitas tidak dipaksa.

**Catat aktivitas** (target 45 detik atau kurang dalam usability test). Pilih anak, isi judul singkat atau template, tanggal (default hari ini), tag kategori opsional dan dapat diedit, catatan opsional, simpan. Delapan tag dan panjang catatan tidak diwajibkan.

**Refleksi mingguan.** Menampilkan beberapa aktivitas tercatat, dua pertanyaan ringan ("Apa yang paling dinikmati anak?" dan "Minggu depan ingin mencoba apa?"), satu aksi kecil. Tidak ada teks "kurang" atau nilai gagal.

**Dashboard anak.** Header profil, kartu momen terakhir, ringkasan aktivitas tercatat, delapan progress bar berdasarkan jumlah aktivitas unik dengan label metrik eksplisit, ajakan ide berikutnya. Periode dan jumlah aktivitas `N` ditampilkan. Jika `N` nol, tampil keadaan kosong netral ("Belum ada catatan di periode ini"). Tidak memakai warna merah untuk nilai rendah dan tidak memakai denominator target normatif.

Struktur navigasi: Beranda, Aktivitas, Jurnal, Refleksi, Keluarga dan Pengaturan (PRD bagian 7). Spesifikasi UI/UX rinci: TBD di [ui-ux.md](ui-ux.md).

## FR identifiers, acceptance criteria and links to business requirements

Prioritas mengikuti PRD: P0 dan P1 untuk MVP, V1.1 dan V2 untuk rilis berikutnya.

### Epic A: Akun, keluarga, otorisasi

| ID | Prioritas | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-A01 | P0 | Pengguna dapat membuat akun dan keluarga. | Email unik; validasi input; password di-hash; keluarga dibuat otomatis; password tidak masuk log. | BR-01 |
| FR-A02 | P0 | Login, logout dan token aman. | Access token pendek dan refresh token yang dapat dicabut (atau session server); logout mencabut sesi; pesan error kredensial generik. | BR-01, BR-06 |
| FR-A03 | P0 | Anggota hanya melihat data keluarga yang berizin. | Semua endpoint anak dan aktivitas memvalidasi keanggotaan keluarga di server, bukan memercayai `familyId` dari JWT atau request; akses lintas keluarga (IDOR) ditolak. | BR-06 |
| FR-A04 | P0 | Pengguna membaca pemberitahuan privasi dan memberi consent. | Waktu dan versi pemberitahuan dicatat; pilihan opsional terpisah dari kebutuhan layanan; tidak ada akun anak. | BR-01, BR-06 |
| FR-A05 | P0 | Pengguna dapat meminta ekspor dan penghapusan data. | Alur jelas; identitas diverifikasi; eksekusi terkontrol termasuk kebijakan retensi backup; audit tanpa isi sensitif. | BR-06 |
| FR-A06 | P1/V1.1 | Admin keluarga mengundang pasangan atau caregiver. | Kode kedaluwarsa dan sekali pakai; invitee memberi persetujuan; peran viewer atau editor; pencabutan berlaku langsung; perubahan tercatat. | BR-07 |

Skenario penting: dua orang tua berpisah, wali bukan orang tua biologis, akses caregiver sementara, satu pengguna di lebih dari satu keluarga (model masa depan). Model satu keluarga per pengguna di MVP boleh dipertahankan hanya bila tidak mengunci migrasi ke keanggotaan many-to-many.

### Epic B: Anak

| ID | Prioritas | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-B01 | P0 | Membuat profil anak minimal. | Nama panggilan wajib; tanggal lahir opsional atau wajib sesuai fitur sadar-usia yang dipilih; hanya terlihat oleh anggota berizin. | BR-01, BR-06 |
| FR-B02 | P0 | Daftar, edit dan hapus profil anak. | Konfirmasi penghapusan; entri terkait masuk prosedur hapus dan retensi; profil keluarga lain tidak dapat diakses. | BR-06 |
| FR-B03 | P1 | Anak terpilih selalu jelas. | Header identitas anak dan pengalih anak, untuk mencegah salah input antar saudara. | BR-02 |

### Epic C: Jurnal aktivitas

| ID | Prioritas | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-C01 | P0 | Mencatat judul, deskripsi opsional, tanggal. | `activityDate` mengikuti zona waktu Asia/Jakarta dan dapat diubah; validasi draft; timestamp server terpisah. | BR-02 |
| FR-C02 | P0 | Multi-tag dari master 8 fitrah. | 0 sampai 8 tag; tag ganda tidak diperbolehkan. Keputusan PRD: menyimpan tanpa tag diizinkan. | BR-02, BR-03 |
| FR-C03 | P0 | Timeline per anak. | Default terbaru; pagination; filter anak; edit dan hapus; audit edit minimal. | BR-02 |
| FR-C04 | P1 | Refleksi pengalaman opsional. | Field `childResponse` atau `parentReflection` bebas dan tidak mewajibkan deskripsi sifat anak. | BR-05 |
| FR-C05 | V1.1 | Lampiran foto privat. | Consent per unggahan; metadata EXIF dan lokasi dihapus; ukuran dan jenis dibatasi; signed URL; hapus berantai; tidak publik. | BR-06 |

### Epic D: Klasifikasi fitrah dan insight

| ID | Prioritas | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-D01 | P0 | Pengguna melihat 8 kategori beserta penjelasan. | Label awal dipertahankan: Keimanan, Belajar, Bakat, Seksualitas, Estetika, Sosial, Jasmani, Perkembangan. Definisi harus disahkan panel reviewer sebelum beta publik. | BR-03 |
| FR-D02 | P0 | Menghitung aktivitas yang ditag per kategori. | Satu aktivitas dihitung paling banyak sekali per kategori; denominator ditampilkan; satu aktivitas dapat muncul di beberapa kategori, sehingga jumlah per kategori boleh melebihi jumlah aktivitas. | BR-03 |
| FR-D03 | P0 | Progress bar deskriptif. | Label "X aktivitas tercatat", bukan persen capaian anak. Bila persen distribusi dipakai, rumus dan konsekuensi multi-tag dijelaskan. PRD lebih menyarankan bar berskala maksimum per periode tanpa tujuan normatif. | BR-03 |
| FR-D04 | P0 | Informasi keterbatasan interpretasi. | Teks "Ini mencerminkan catatan aktivitas, bukan penilaian perkembangan anak." tampil pada grafik dan onboarding insight. | BR-03 |
| FR-D05 | V1.1 | Filter periode. | Minggu, bulan, kustom; perhitungan ulang konsisten; ada keadaan kosong. | BR-03 |
| FR-D06 | V1.1 (kondisional) | Evaluasi ulang radar chart. | Hanya diluncurkan bila uji pengguna membuktikan tidak ditafsirkan sebagai skor atau target normatif; default bukan radar. Status V1.1 ditandai tanda tanya di PRD sumber, jadi TBD. | BR-03 |

Aturan metrik: `count_by_category(c, period) = COUNT(DISTINCT activity_id)` pada aktivitas anak yang aktif pada periode dan bertag `c`. `N = COUNT(DISTINCT activity_id)`, termasuk yang tanpa tag. Tidak ada peringkat "fitrah tertinggal". Sistem tidak mengirim alert bila tidak ada aktivitas.

### Epic E: Inspirasi dan refleksi

| ID | Prioritas | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-E01 | P1 | Melihat aktivitas terkurasi dengan usia, perkiraan durasi, bahan. | Koleksi editorial awal (24 aktivitas adalah target konten yang diusulkan, belum disetujui); semua punya safety note, sumber atau editor, dan tanggal review. | BR-04 |
| FR-E02 | P1 | Menyaring ide menurut kondisi nyata. | Usia (bila tersedia), durasi, indoor atau outdoor, biaya dan bahan, aksesibilitas; tidak mensyaratkan data sensitif. | BR-04 |
| FR-E03 | P1 | Menyelesaikan aktivitas dan membuat jurnal dari template. | Satu ketukan "Sudah dicoba" membuka aktivitas terisi awal; tidak menyimpulkan perkembangan. | BR-04, BR-02 |
| FR-E04 | P1 | Prompt refleksi mingguan. | Opsional dan dapat dilewati; tersimpan privat; tidak menghasilkan penilaian dari jumlah tag. | BR-05 |
| FR-E05 | V1.1 | Ringkasan dan rencana minggu depan. | Deskriptif dan dapat diedit; tidak memberi skor anak. | BR-05 |

### Epic F: Komunitas (pasca MVP)

| ID | Rilis | Kebutuhan | Acceptance criteria | BR |
|---|---|---|---|---|
| FR-F01 | V1.1 | Kurator atau editor memublikasikan aktivitas ke katalog. | Persetujuan editorial; audit revisi; tidak ada akses ke data anak atau aktivitas privat. | BR-08 |
| FR-F02 | V2 (kondisional) | Koleksi aktivitas per komunitas. | Berbagi default tidak publik; hanya template atau ide, bukan catatan anak; moderator dan lapor penyalahgunaan. | BR-08 |
| FR-F03 | Di luar lingkup | Feed foto anak, leaderboard, komentar langsung pada profil anak. | Tidak disediakan. | BR-08 |

### Epic G: AI (V2 bersyarat)

Kebutuhan ini tidak dijadwalkan. Batasan dari PRD: tidak memakai "fitrah terendah" sebagai indikator defisit anak; rekomendasi awal berbasis aturan editorial dan preferensi keluarga (waktu, alat, usia). AI yang membaca jurnal privat mensyaratkan opt-in granular, pengungkapan pemroses dan lokasi, minimisasi data, proteksi prompt injection, review konten, audit, propagasi penghapusan, dan kemampuan dimatikan tanpa kehilangan pengalaman inti. Data anak tidak dikirim ke pelatihan model eksternal secara default. ID FR untuk epic ini: TBD, ditetapkan saat masuk lingkup.

## End-to-end acceptance criteria

| ID | Kriteria | FR terkait |
|---|---|---|
| AC-01 | Pengguna keluarga A tidak dapat membaca atau menulis data anak dan aktivitas keluarga B walau mengetahui ID (403 atau 404 sesuai kebijakan). | FR-A03 |
| AC-02 | Pengguna tanpa consent atau pernyataan otoritas yang diperlukan tidak dapat membuat profil anak. | FR-A04, FR-B01 |
| AC-03 | Aktivitas bertag Belajar dan Sosial menaikkan masing-masing hitungan satu dan total aktivitas satu, tanpa menghasilkan persentase perkembangan. | FR-D02, FR-D03 |
| AC-04 | Aktivitas tanpa tag muncul di timeline dan total aktivitas, tetapi tidak dihitung pada kategori. | FR-C02, FR-D02 |
| AC-05 | Dashboard tanpa data tidak memunculkan alarm "fitrah tertinggal". | FR-D03 |
| AC-06 | Penghapusan aktivitas mengubah statistik secara konsisten; soft-delete dan backup mengikuti kebijakan retensi. | FR-C03, FR-D02 |
| AC-07 | Template aktivitas bebas klaim diagnosis dan lolos review editorial. | FR-E01 |
| AC-08 | Pengguna dapat menolak notifikasi dan tetap memakai fungsi utama. | Tidak ada FR khusus; notifikasi: TBD |
| AC-09 | Ekspor hanya berisi data yang berhak diakses lewat proses aman; permintaan penghapusan dapat dilacak. | FR-A05 |
| AC-10 | Label screen reader untuk aksi utama diuji di Android dan iOS. | NFR aksesibilitas, lihat `system-requirements.md` |
| AC-11 | Build Android dan iOS lewat pipeline rilis tervalidasi; APK distribusi bukan bukti siap rilis publik. | NFR deployment, lihat `system-requirements.md` |
| AC-12 | Dalam usability test, mayoritas peserta menjelaskan grafik sebagai catatan aktivitas, bukan skor perkembangan anak. Ambang "mayoritas": TBD. | FR-D03, FR-D04 |

## Analytics and experiments

Event hanya agregat atau berpengenal pseudonim terbatas, tanpa PII anak: `onboarding_completed`, `child_profile_created` (pita usia kasar, hindari tanggal lahir), `activity_logged`, `template_viewed` dan `template_tried`, `reflection_completed`, `insight_viewed`, `export_requested` dan `deletion_requested`. Definisi event final harus disetujui (BRD keputusan terbuka nomor 6).

Metrik inti: aktivasi (aksi bermakna pertama dalam 7 hari), waktu menuju nilai pertama, median waktu input, retensi W1 dan W4, persentase keluarga yang mencoba aktivitas, tingkat refleksi mingguan, insiden privasi, opt-out notifikasi. Perkembangan anak tidak diukur dari log aktivitas.

Eksperimen yang diusulkan: onboarding ide-first lawan jurnal-first; progress bar lawan ringkasan teks dengan uji pemahaman; pengingat opsional lawan tanpa pengingat; mode input super cepat. Setiap eksperimen memerlukan minimisasi data dan persetujuan.

## Open questions

Dari PRD bagian 14; semuanya belum diputuskan:

1. Kerangka 8 fitrah sebagai label tetap atau dapat dipilih sesuai pendekatan keluarga.
2. Definisi dan sumber primer tiap fitrah, terutama Seksualitas dan Perkembangan (belum diverifikasi).
3. Tanggal lahir presisi atau cukup kelompok usia.
4. Parent-only untuk MVP dan penerapan regulasi bila anak kelak mengakses; perlu telaah hukum.
5. Kelayakan freemium; belum ada WTP yang valid.
6. Hak asuh bersama atau beberapa keluarga per pengguna: UI ditunda, skema tidak dikunci.
7. Dewan penasihat profesional, fasilitator FBE, atau keduanya (rekomendasi PRD: keduanya).
8. Kecukupan vendor cloud lintas negara terhadap persyaratan hukum; perlu penasihat hukum dan DPA.

Gerbang rilis dari PRD (keamanan, consent dan legal, pengesahan taksonomi, minimisasi analitik, uji pemahaman, verifikasi restore, rencana rollback, respons insiden) dikelola di [plan.md](../03-delivery/plan.md) dan [verification.md](../04-quality/verification.md).

## Traceability dari PRD awal

| ID PRD awal | Keputusan | ID di dokumen ini |
|---|---|---|
| F-1.1, F-1.2 | Pertahankan akun dan keluarga, perluas keamanan sesi | FR-A01 sampai FR-A05 |
| F-1.3 (undangan) | V1.1 dengan RBAC dan pencabutan | FR-A06 |
| F-2.1, F-2.2 | Pertahankan, minimalkan identitas anak | FR-B01 sampai FR-B03 |
| F-3.1 sampai F-3.3 | Pertahankan, perbaiki UX dan privasi | FR-C01 sampai FR-C05 |
| F-4.1 | Dari skor keseimbangan menjadi jumlah aktivitas per kategori | FR-D01 sampai FR-D04 |
| F-4.2 | Filter tanggal, V1.1 | FR-D05 |
| Radar chart | Kondisional | FR-D06 |
| AI dari skor terendah | Diganti rekomendasi kontekstual opt-in, non-diagnostik | Epic G |
| Komunitas | Katalog terkurasi lebih dulu | Epic F |

Catatan verifikasi: status implementasi pada PRD awal tidak diaudit; keadaan kode saat ini diperiksa terpisah dan dicatat di [verification.md](../04-quality/verification.md) (TBD).
