# Business Requirements Document (BRD) — Filio

**Versi:** 2.0 (usulan untuk validasi)  
**Tanggal:** 31 Oktober 2026  
**Status:** Draft strategis — belum disetujui pemilik produk  
**Dasar:** `prd_filio.md` (PRD awal, MVP v1.0) dan riset sekunder Indonesia  
**Pemilik keputusan:** Product Owner Filio (TBD)

> **Penanda evidensi:** **[ASLI]** dari PRD yang diberikan; **[RISET]** temuan sumber eksternal; **[HIPOTESIS]** dugaan yang harus divalidasi; **[USULAN]** keputusan desain/bisnis yang belum disetujui. Dokumen ini tidak mengklaim bahwa wawancara pelanggan, audit keamanan, atau pengujian pasar sudah dilakukan.

## 1. Executive summary

**[ASLI]** Filio adalah aplikasi iOS/Android yang membantu orang tua mencatat aktivitas anak, menghubungkannya dengan 8 fitrah, dan melihat sebaran aktivitas pada progress bar. Target awal adalah orang tua muda serta praktisi home education/homeschooling. Teknologi yang disebut: React Native/Expo, Express, PostgreSQL/Neon, Prisma, Cloud Run, GitHub CI/CD. Status implementasi dalam dokumen awal: autentikasi, profil anak, jurnal multi-tag, progress bar, dan backend production diklaim selesai; APK belum dirilis. Status ini **belum diverifikasi secara teknis**.

**[USULAN]** Filio diposisikan sebagai **pendamping pengasuhan reflektif berbasis aktivitas keluarga**, bukan alat ukur klinis kemampuan atau kualitas anak. Janji nilai: *membantu orang tua menemukan ide aktivitas yang realistis, melakukannya bersama anak, menyimpan cerita bermakna, dan merefleksikan pengalaman untuk menentukan langkah berikutnya*. Kerangka 8 fitrah tetap menjadi ciri khas, dengan keterbatasan interpretasi yang jelas.

**Keputusan strategis yang diusulkan:** pertahankan inti jurnal + tagging, perbaiki semantik analitik, tambahkan manfaat praktis berupa inspirasi aktivitas dan refleksi ringan; tunda komunitas sosial terbuka serta AI generatif berbasis data anak sampai tata kelola matang.

## 2. Konteks dan bukti pasar Indonesia

| Temuan | Implikasi untuk Filio | Klasifikasi |
|---|---|---|
| Survei APJII 2026 dilaporkan mencatat 235,26 juta pengguna internet dan penetrasi 81,72%; tidak berarti seluruhnya orang tua atau prospek Filio. | Kanal mobile memungkinkan distribusi, tetapi TAM tidak boleh disamakan dengan pengguna internet. | [RISET] [S1] |
| PrimaKu menonjolkan pertumbuhan, perkembangan, imunisasi, konsultasi, dan komunitas; Teman Bumil memiliki milestone, konten, dan komunitas. | Pasar parenting digital sudah kompetitif; jangan bersaing sebagai aplikasi rekam medis generik. | [RISET] [S2][S3] |
| WHO/UNICEF menekankan nurturing care, hubungan responsif dan pengasuhan sesuai tahapan perkembangan. | Fokus pada kualitas interaksi dan kebutuhan kontekstual, bukan frekuensi kategori yang identik. | [RISET] [S4][S5] |
| Data pribadi anak diperlakukan secara khusus menurut UU 27/2022; PP 17/2025 dan aturan teknis 2026 relevan terhadap layanan digital yang digunakan/diakses anak. | Parent-controlled account, minimisasi data, privasi default, penilaian risiko hukum sejak awal. | [RISET] [S6][S7] |
| Kewajiban pendaftaran PSE lingkup privat bergantung pada kriteria layanan dan penyelenggara. | Tinjau kewajiban legal sebelum publikasi komersial. | [RISET] [S8] |

**Batas evidensi:** Belum tersedia studi primer tentang frekuensi penggunaan jurnal parenting, besaran willingness-to-pay, conversion, atau tingkat retensi segmen sasaran. Klaim masalah dan manfaat berikut adalah hipotesis sampai diuji.

## 3. Problem discovery — lintas perspektif

### 3.1 Perspektif orang tua

| Jobs-to-be-done | Masalah yang diduga dialami | Konsekuensi | Respons produk |
|---|---|---|---|
| “Saat waktu saya terbatas, bantu pilih kegiatan bermanfaat tanpa persiapan rumit.” | Kebingungan memilih aktivitas dan rasa bersalah tidak melakukan 'cukup banyak'. | Aplikasi jurnal saja dianggap tugas tambahan. | Ide kegiatan sederhana berdasarkan usia, waktu, bahan, konteks; boleh tanpa mencatat. |
| “Bantu saya mengingat momen kecil dan memahami minat anak.” | Dokumentasi tercecer di galeri/chat; observasi subjektif mudah terlupa. | Sulit melihat cerita dan perubahan dalam jangka waktu panjang. | Timeline, catatan bebas, minat yang diamati, refleksi mingguan. |
| “Bantu saya dan pasangan merawat proses pengasuhan bersama.” | Tanggung jawab tidak merata dan catatan tersebar. | Kurang kesinambungan aktivitas. | Akses caregiver berbasis izin dan audit ringan. |
| “Jangan buat saya merasa anak dinilai atau dibanding-bandingkan.” | Grafik skor bisa menimbulkan guilt, pressure, salah tafsir. | Kepercayaan pengguna turun. | Insight deskriptif, tidak ada peringkat/label anak. |

**Segmen awal [USULAN]:** orang tua anak usia 3–9 tahun yang tertarik aktivitas bersama, refleksi pengasuhan, dan home education. Usia ini adalah hipotesis beachhead, **bukan batas validitas kerangka fitrah**; perlu diuji dengan pengguna. Segmen 0–2 tahun dan remaja membutuhkan kurasi berbeda.

### 3.2 Perspektif komunitas dan pendidik

Komunitas keluarga dan praktisi pendidikan dapat mengkurasi kegiatan yang sesuai budaya dan ketersediaan bahan lokal; menjadi sumber trust dan akuisisi. Risiko: dogmatisme satu pendekatan, aktivitas viral tanpa peninjauan, tekanan sosial, dan publikasi foto/data anak. **[USULAN]** Mulai dari *library aktivitas terkurasi* dan program kelompok **tanpa akses otomatis ke data jurnal keluarga**. Fitur feed, komentar publik, profil publik anak, dan leaderboard tidak masuk MVP.

### 3.3 Perspektif bisnis

Problem monetisasi utama bukan membuat grafik melainkan membuktikan *habit value* tanpa meningkatkan beban orang tua. Kompetisi dari catatan WhatsApp, galeri, buku, dan aplikasi parenting lain menuntut value proposition khas. Kanal awal yang dapat diuji: pilot komunitas, referral caregiver, konten edukasi; monetisasi hipotesis freemium (jurnal dasar gratis, paket konten premium/ekspor refleksi premium/kolaborasi tingkat lanjut) dan lisensi komunitas kurasi B2B2C tanpa penjualan data anak.

## 4. Pernyataan masalah dan kesempatan

**Problem statement:** Orang tua yang ingin mendampingi tumbuh kembang anak secara holistik kesulitan mengubah niat menjadi kegiatan yang sesuai keseharian, mendokumentasikan pengalaman secara ringan, dan merefleksikan kebutuhan berikutnya tanpa mengubah anak menjadi objek penilaian.

**Opportunity statement [HIPOTESIS]:** Produk yang menghubungkan inspirasi aktivitas, praktik bersama, dokumentasi, dan refleksi dapat mempertahankan keterlibatan lebih baik daripada pencatat aktivitas dan dashboard distribusi tag saja.

**Alternatif yang dipertimbangkan:** (A) jurnal fitrah saja — biaya rendah tetapi utilitas harian terbatas; (B) platform stimulasi/medis — kompetisi dan kewajiban klinis tinggi; (C) pendamping aktivitas dan refleksi berbasis fitrah — **pilihan yang direkomendasikan**; (D) jejaring sosial parenting — risiko moderasi dan privasi tinggi untuk tahap awal.

## 5. Visi, prinsip, hasil bisnis

**Visi:** Setiap keluarga dapat mengenali dan merawat keunikan anak melalui pengalaman nyata, hubungan hangat, dan refleksi yang tidak menghakimi.

**Misi awal:** Mempermudah aktivitas bersama anak dan menyediakan memori serta insight deskriptif bagi orang tua.

**Prinsip produk:** (1) hubungan dan pengalaman lebih penting dari skor; (2) anak bukan KPI; (3) kurangnya catatan bukan bukti kurangnya stimulasi; (4) konten fitrah disertai kejelasan metode dan sumber; (5) privacy by default; (6) relevan untuk kondisi Indonesia; (7) inklusif berbagai pola keluarga dan kemampuan anak; (8) tidak membuat diagnosis/terapi.

**North-star metric [USULAN]:** *Weekly Meaningful Family Engagement* (WMFE): jumlah keluarga aktif yang dalam 7 hari menyelesaikan setidaknya satu aktivitas bersama atau refleksi bermakna (disertai sinyal eksplisit pengguna), dengan verifikasi definisi tidak sekadar klik. Mulai dari pengukuran perilaku proxy, jangan mengklaim kualitas pengasuhan terukur.

| Tujuan | Indikator validasi (target eksperimen, bukan forecast) |
|---|---|
| Memastikan masalah nyata | ≥20 wawancara mendalam lintas segmen; ≥60% peserta target mengonfirmasi masalah utama tanpa dipancing. |
| Membuktikan nilai pengalaman | ≥70% peserta pilot mampu menyelesaikan onboarding dan membuat entri pertama secara mandiri. |
| Menjaga friksi rendah | Median waktu mencatat aktivitas ringkas ≤45 detik dalam usability test. |
| Menguji retensi | D7 dan W4 cohort retention diamati; target go/no-go disetujui setelah baseline beta (contoh W4 ≥25% untuk eksperimen awal, bukan benchmark pasar). |
| Kepercayaan dan keselamatan | 100% jalur data anak terbatas pada anggota berizin dalam pengujian; tidak ada exposure P0/P1 terbuka. |
| Menguji monetisasi | WTP interview dan price test; jangan mengasumsikan conversion hingga diuji. |

**Guardrail metrics:** penghapusan akun berhasil, jumlah insiden akses data, persentase pengguna yang menafsirkan grafik sebagai diagnosis (target mendekati nol), dropout saat onboarding, jumlah notifikasi yang dimatikan, frekuensi laporan konten.

## 6. Posisi dan ruang lingkup bisnis

| Area | MVP revisi | V1.1 | V2+ |
|---|---|---|---|
| Family & child profile | ✓ | Kolaborasi caregiver | Role komunitas terbatas |
| Activity journal + multi-tag | ✓ | Foto privat opsional | Media/ekspor lebih kaya |
| Ringkasan distribusi tag | ✓ dengan disclaimer dan sampel | Tren & refleksi mingguan | Rekomendasi personal tervalidasi |
| Aktivitas terkurasi | Koleksi kecil manual, opsional | Filter usia/waktu/bahan | Kontributor terkurasi |
| Refleksi dan next step | Template sederhana | Ringkasan mingguan | Assistant dengan kontrol privasi |
| Komunitas | Pilot offline/kemitraan | Ruang koleksi terkurasi | Fitur sosial hanya setelah risk assessment |
| Pembayaran | Tidak | Eksperimen WTP | Freemium/paket bila terbukti |

**Out of scope MVP:** diagnosis, developmental screening tervalidasi, prediksi bakat/sifat anak, child account, publikasi jurnal/foto anak ke feed publik, direct messaging anak, iklan tertarget berbasis profil anak, AI yang mengirim data anak ke model pihak ketiga tanpa pengaturan khusus, rekomendasi mutlak berdasarkan 'skor terendah'.

## 7. Kerangka 8 fitrah: batas dan tata kelola

**[ASLI]** Master kategori: Keimanan, Belajar, Bakat, Seksualitas, Estetika, Sosial, Jasmani, Perkembangan.

**[TEMUAN]** Istilah pada sumber Fitrah Based Education bervariasi dalam literatur sekunder (misalnya belajar dan bernalar, estetika dan bahasa, individualitas dan sosialitas). Karena PRD asli menyebut 8 label tertentu, **jangan mengubahnya diam-diam**. Sebelum memublikasikan panduan, panel penasihat yang memahami FBE dan pakar perkembangan anak perlu mengonfirmasi definisi, nama resmi, usia relevan, contoh, serta status klaim. Hindari asumsi bahwa jumlah tag = capaian perkembangan.

**[USULAN]** Struktur `FitrahFrameworkVersion` dan `FitrahCategory` yang dapat diberi versi; untuk MVP label awal dipertahankan dengan definisi sementara dan catatan editorial. 'Fitrah seksualitas' harus dipaparkan sebagai konteks identitas, batas tubuh, penghargaan diri dan relasi sesuai usia, bukan inferensi orientasi seksual atau data intim; akses kontennya dikurasi hati-hati. Dashboard diberi judul **'Aktivitas yang tercatat menurut kategori'**, tidak 'skor keseimbangan anak'.

## 8. Model bisnis dan strategi go-to-market

**Persona pembeli/pengguna:** (A) orang tua yang menggunakan langsung; (B) pasangan/caregiver dengan akses; (C) fasilitator komunitas yang mengkurasi konten, bukan pemilik data anak; (D) mitra pendidikan/kreator konten (disetujui dan diaudit).

**Discovery funnel [USULAN]:** konten edukasi pendek → komunitas/landing page → instalasi → pengalaman pertama tanpa friksi → 1 aktivitas nyata → refleksi mingguan → referral sukarela. Pengujian kanal dilakukan pada kelompok kecil dan dilacak dengan consent.

**Monetisasi [HIPOTESIS]:** gratis untuk pencatatan inti dan privasi/ekspor data dasar; premium untuk pustaka tematik mendalam, kolaborasi lanjutan, format kenangan dan personal planning. Jangan mengenakan biaya untuk penghapusan/akses data atau kontrol keselamatan. Tidak menjual data anak. Alternatif: workshop bersama komunitas dengan tata kelola konten, tidak berdasarkan akses jurnal pribadi.

**Unit economics yang perlu diukur:** CAC per kanal, aktivasi, retensi cohort, conversion trial-to-paid, ARPPU, biaya hosting per keluarga, support cost, gross margin, refund. **Belum ada dasar angka harga atau proyeksi pendapatan**, sehingga belum dibuat TAM/SAM/SOM numerik atau forecast ARR.

## 9. Business requirements (BR)

| ID | Kebutuhan bisnis | Prioritas | Ukuran keberhasilan |
|---|---|---|---|
| BR-01 | Keluarga dapat mulai dengan aman dan cepat | Must | Onboarding berhasil, tidak ada child self-signup |
| BR-02 | Jurnal nyaman digunakan tanpa rasa bersalah | Must | Waktu input dan feedback kualitatif |
| BR-03 | 8 fitrah tersedia sebagai klasifikasi interpretatif, bukan skor klinis | Must | Uji comprehension grafik |
| BR-04 | Orang tua mendapatkan ide tindakan selanjutnya | Must | Aktivitas yang dipilih/dicoba |
| BR-05 | Pengalaman pengasuhan dapat direfleksikan | Must | Penggunaan weekly reflection |
| BR-06 | Data tiap keluarga terisolasi dan dapat dikelola | Must | Security test, privacy request SLA |
| BR-07 | Keluarga bisa bekerja sama secara aman | Should | Akses role-based dan revocation |
| BR-08 | Komunitas dapat mendukung kurasi tanpa mengakses jurnal pribadi | Should | Audit konten/izin |
| BR-09 | Ada kemampuan menguji WTP tanpa menjual data anak | Could | WTP research, pilot conversion |
| BR-10 | Platform mudah dipelihara dan dipantau | Must | Error rate, recovery and deployment checks |

## 10. Risiko, kontrol, dan pemilik

| Risiko | Tingkat awal | Mitigasi | Owner usulan |
|---|---|---|---|
| Salah tafsir chart menjadi diagnosis | Tinggi | Ubah copy; tampilkan jumlah data, keterbatasan, tanpa skor normatif; usability test | Product + content expert |
| Kebocoran data sensitif anak | Kritis | Minimisasi, authorization per object, audit, enkripsi, penghapusan, DPIA | Engineering + privacy/legal |
| Bias budaya/agama/keluarga | Tinggi | Pengungkapan filosofi, pilihan bahasa inklusif, review konten | Editorial board |
| Retensi rendah karena input membebani | Tinggi | Template 1-tap, rekomendasi praktis, no-streak pressure | Product |
| Ketidakakuratan AI/konten | Tinggi | Tunda AI; editorial review, disclaimer, safety escalation | Content/AI lead |
| Monetisasi gagal | Sedang | WTP test, community pilot; bertahap | Business lead |
| Cost cold-start dan migrasi bersamaan | Sedang | Observability dan release checklist, pisahkan migrasi dari traffic | Tech lead |

**Regulasi:** lakukan telaah penasehat hukum terhadap status pengendali/pemroses, retensi, transfer lintas negara (Cloud Run/Neon), hak subjek data, kewajiban pendaftaran PSE, pemrosesan data anak dan kemungkinan penerapan PP TUNAS pada aplikasi parent-only. Tidak menyimpulkan bahwa fitur parent-only otomatis bebas dari seluruh ketentuan.

## 11. Rencana validasi dan keputusan go/no-go

**Sprint discovery (2–4 minggu, target perencanaan, bukan janji jadwal):** 20–30 wawancara orang tua (orang tua bekerja, ayah/ibu, homeschool dan non-homeschool, berbagai usia); 5–8 fasilitator/pendidik; 2–3 reviewer substansi FBE/perkembangan; mapping aktivitas aktual via diary study sukarela. Jangan meminta data identitas anak yang tidak diperlukan.

**Pilot (4–8 minggu):** 30–50 keluarga secara opt-in; randomisasi atau perbandingan kelompok hanya bila etis dan disetujui; ukur TTFV, jurnal terselesaikan, kegunaan refleksi, W4 retention, distress akibat skor, consent comprehension, support issues. Observasi tidak membuktikan dampak perkembangan anak tanpa studi yang tepat.

**Go/no-go:** lakukan iterasi jika orang tua menyukai ide namun tidak memakai rutin; hentikan/ubah fitur jika menciptakan kecemasan, salah diagnosis, atau risiko privasi; lanjut investasi kanal premium hanya jika manfaat berulang dan kemauan membayar terbukti.

## 12. Dependensi dan keputusan terbuka

1. Konfirmasi daftar, definisi, dan hak penggunaan materi kerangka 8 fitrah; identifikasi advisor.
2. Putuskan persona awal dan rentang usia pilot.
3. Putuskan apakah pengalaman pertama berawal dari aktivitas, jurnal, atau keduanya melalui tes.
4. Pastikan desain izin keluarga: orang tua/wali, caregiver, kasus pengasuhan terpisah, pencabutan akses.
5. Periksa inventaris dan deployment kode yang sudah ada sebelum perubahan arsitektur.
6. Setujui definisi event analytics yang tidak mengirim isi jurnal/identitas anak ke alat pihak ketiga.
7. Legal review lintas yurisdiksi penyimpanan, PSE dan kebijakan privasi sebelum publik beta.
8. Tentukan sumber pendanaan pilot, kapasitas kurasi dan moderasi konten.

## 13. Traceability dari PRD lama ke keputusan bisnis

| PRD awal | Arah revisi | Alasan |
|---|---|---|
| Family/User/Child | Dipertahankan; ditambah family member roles/consent | Isolasi dan kolaborasi aman |
| Activity multi-tag | Dipertahankan; opsi draft, reflection, optional metadata | Kurangi friksi, tambah kegunaan |
| Progress bar total tag | Dipertahankan sebagai distribusi catatan, bukan capaian anak | Validitas interpretasi |
| Radar chart V1.1 | Ditunda sampai copy/interpretasi teruji | Risiko skor semu |
| Upload foto V1.1 | Opsional setelah privacy/security readiness | Data sensitif dan biaya |
| AI based on lowest score V2 | Diganti prinsip rekomendasi berbasis preferensi/konteks, tetap human-controlled | Tidak menstigma anak |
| Community V2 judul (tanpa rincian fitur) | Kurasi dan pilot dulu; sosial publik bukan MVP | Keamanan dan moderasi |

## 14. Sumber dan tingkat kepercayaan

- **[S0] Sumber internal:** `prd_filio.md`, diunggah pemilik produk, 105 baris, 31 Oktober 2026. Status implementasi merupakan klaim dokumen, bukan hasil audit.
- **[S1]** IndonesiaBaik / APJII, *81,72% warga Indonesia terhubung internet* (survei 2026): https://indonesiabaik.id/infografis/semakin-digital-8172-warga-indonesia-sudah-terhubung-internet
- **[S2]** PrimaKu, listing Google Play, diakses 31 Oktober 2026: https://play.google.com/store/apps/details?id=com.primaku.app
- **[S3]** Teman Bumil, halaman fitur: https://www.temanbumilparenting.com/aplikasi
- **[S4]** WHO, *Rapid assessment of national preparedness for implementing nurturing care* (2021): https://www.who.int/publications/i/item/9789290228318
- **[S5]** UNICEF Indonesia, *Panduan Penyusunan Program Pengasuhan Remaja* (2021): https://www.unicef.org/indonesia/id/laporan/panduan-penyusunan-program-pengasuhan-remaja
- **[S6]** UU Republik Indonesia No. 27 Tahun 2022 tentang Perlindungan Data Pribadi, khususnya Pasal 25: https://peraturan.bpk.go.id/Home/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf
- **[S7]** PP No. 17 Tahun 2025, Permenkomdigi No. 9 Tahun 2026 (ringkasan pemerintah): https://www.setneg.go.id/baca/index/lindungi_anak_di_ranah_digital_kemkomdigi_terbitkan_aturan_teknis_pp_tunas
- **[S8]** Komdigi, kriteria PSE privat: https://pse.komdigi.go.id/panduan/kriteria-pendaftaran-pse-lingkup-privat
- **[S9]** Jurnal terkait pembahasan Fitrah Based Education (literatur sekunder, perlu verifikasi definisi primer): https://journal.iaincurup.ac.id/index.php/paud/article/download/1909/pdf

*Catatan: referensi pasar dan hukum adalah hasil riset sekunder per 31 Oktober 2026, bukan opini hukum ataupun validasi ilmiah khusus instrumen 8 fitrah.*
