# Charter

Status: draft
Owner: TBD

Sumber: BRD v2.0 (disimpan di repo privat `filio-internal`; draft strategis, belum disetujui pemilik produk). Seluruh isi di bawah adalah rangkuman usulan BRD dan belum merupakan keputusan yang disetujui. Hal yang belum diketahui dicatat sebagai TBD.

## Problem, objectives, scope and exclusions

### Masalah

Orang tua yang ingin mendampingi tumbuh kembang anak secara holistik kesulitan mengubah niat menjadi kegiatan yang sesuai keseharian, mendokumentasikan pengalaman secara ringan, dan merefleksikan kebutuhan berikutnya tanpa menjadikan anak objek penilaian. Klaim masalah ini masih hipotesis; belum ada studi primer (BRD bagian 2 dan 4).

### Gambaran produk

Filio adalah aplikasi iOS/Android (React Native/Expo dengan backend Express, PostgreSQL dan Prisma) yang membantu orang tua mencatat aktivitas anak dan menghubungkannya dengan 8 fitrah. Posisi yang diusulkan: pendamping pengasuhan reflektif berbasis aktivitas keluarga, bukan alat ukur klinis kemampuan atau kualitas anak. Status implementasi pada dokumen awal belum diverifikasi secara teknis.

### Tujuan

Tujuan berikut adalah target eksperimen validasi, bukan forecast. Target go/no-go final: TBD, disetujui setelah baseline beta.

| Tujuan | Indikator validasi (BRD bagian 5) |
|---|---|
| Memastikan masalah nyata | Minimal 20 wawancara mendalam lintas segmen; minimal 60% peserta target mengonfirmasi masalah utama tanpa dipancing. |
| Membuktikan nilai pengalaman | Minimal 70% peserta pilot menyelesaikan onboarding dan membuat entri pertama secara mandiri. |
| Menjaga friksi rendah | Median waktu mencatat aktivitas ringkas 45 detik atau kurang dalam usability test. |
| Menguji retensi | Retensi D7 dan W4 diamati; ambang go/no-go: TBD. |
| Menjaga kepercayaan dan keselamatan | Seluruh jalur data anak terbatas pada anggota berizin dalam pengujian; tidak ada exposure P0/P1 terbuka. |
| Menguji monetisasi | Wawancara WTP dan price test; tidak mengasumsikan konversi. |

North-star metric yang diusulkan: Weekly Meaningful Family Engagement (WMFE). Definisi final: TBD.

### Kebutuhan bisnis

BR-01 sampai BR-10 didefinisikan di BRD bagian 9 dan dirujuk dari `business-requirements.md` di repo privat `filio-internal`.

### Ruang lingkup MVP (usulan)

- Profil keluarga dan anak.
- Jurnal aktivitas dengan multi-tag 8 fitrah.
- Ringkasan distribusi tag dengan disclaimer dan jumlah sampel.
- Koleksi kecil aktivitas terkurasi (opsional) dan template refleksi sederhana.
- Pilot komunitas offline atau melalui kemitraan.

### Di luar lingkup MVP (usulan)

Diagnosis; developmental screening tervalidasi; prediksi bakat atau sifat anak; akun anak; publikasi jurnal atau foto anak ke feed publik; direct messaging anak; iklan tertarget berbasis profil anak; AI yang mengirim data anak ke model pihak ketiga tanpa pengaturan khusus; rekomendasi mutlak berdasarkan skor terendah; pembayaran.

### Prinsip dan batasan

Hubungan dan pengalaman lebih penting dari skor; anak bukan KPI; privacy by default; tidak ada diagnosis atau terapi; data anak tidak dijual. Dashboard disebut "Aktivitas yang tercatat menurut kategori", bukan skor keseimbangan anak.

### Risiko utama

Risiko lengkap ada di BRD bagian 10. Yang kritis atau tinggi: kebocoran data sensitif anak (kritis); salah tafsir grafik sebagai diagnosis; bias budaya, agama dan keluarga; retensi rendah; ketidakakuratan konten atau AI. Register risiko berbasis ID RSK-: TBD.

### Profil proyek

Profil: business-critical (dipilih karena data anak bersifat sensitif; konfirmasi persetujuan formal: TBD, lihat `approvals.md` di repo privat `filio-internal`). UI ada (aplikasi mobile).

## Project owner, stakeholders, decisions and approvals

### Pemilik

Product Owner Filio: TBD (nama dan peran belum dicatat di BRD).

### Pemangku kepentingan

| Peran | Keterangan | Nama |
|---|---|---|
| Product Owner | Pemilik keputusan produk | TBD |
| Orang tua | Pengguna langsung | Tidak berlaku |
| Pasangan atau caregiver | Pengguna dengan akses berizin | Tidak berlaku |
| Fasilitator komunitas | Mengkurasi konten, bukan pemilik data anak | TBD |
| Mitra pendidikan atau kreator konten | Perlu disetujui dan diaudit | TBD |
| Engineering / tech lead | Arsitektur, keamanan, operasi | TBD |
| Privacy / legal | Telaah UU PDP, PSE, data anak | TBD |
| Editorial board / pakar FBE dan perkembangan anak | Konfirmasi definisi 8 fitrah dan review konten | TBD |
| Business lead | Monetisasi dan go-to-market | TBD |

### Keputusan terbuka

Dari BRD bagian 12; semuanya belum diputuskan:

1. Daftar, definisi dan hak penggunaan materi kerangka 8 fitrah; advisor.
2. Persona awal dan rentang usia pilot.
3. Apakah pengalaman pertama berawal dari aktivitas, jurnal, atau keduanya.
4. Desain izin keluarga: orang tua atau wali, caregiver, pengasuhan terpisah, pencabutan akses.
5. Inventaris dan deployment kode yang sudah ada sebelum perubahan arsitektur.
6. Definisi event analytics yang tidak mengirim isi jurnal atau identitas anak ke pihak ketiga.
7. Legal review lintas yurisdiksi penyimpanan, PSE dan kebijakan privasi sebelum beta publik.
8. Sumber pendanaan pilot, kapasitas kurasi dan moderasi konten.

### Persetujuan

Belum ada persetujuan. Charter ini, BRD, PRD dan SAD berstatus draft. Pencatatan persetujuan bisnis dan teknis yang terpisah dilakukan di `approvals.md` pada repo privat `filio-internal`. Penyetuju: TBD.
