# 🍄 Super Mario Sosiologi XI - Kuis Interaktif Pembelajaran

> **Kuis Interaktif Sosiologi Kelas XI (Materi Kelompok Sosial dan Permasalahan Sosial Akibat Pengelompokan Sosial)**  
> Berbasis Game Petualangan 8-Bit Super Mario Bros dengan Animasi Asli, Backsound NES, Jamur Senjata Api, Pertarungan Bos Bowser, Penyelamatan Putri Peach, dan Rekapitulasi Nilai Otomatis ke Email Guru: `uripsupandi99@admin.sma.belajar.id`.

---

## 🚀 Panduan Menghubungkan ke GitHub dan Cloudflare Pages

Game ini sudah dikonfigurasi penuh dan siap dipublikasikan ke **GitHub** serta dideploy ke **Cloudflare Pages** secara gratis dengan performa tinggi global CDN.

---

### Langkah 1: Hubungkan & Push ke GitHub

1. Buka akun GitHub Anda di [https://github.com/new](https://github.com/new).
2. Buat repositori baru, misalnya dengan nama: `super-mario-sosiologi`.
3. Buka terminal di folder project ini dan jalankan perintah berikut:

```bash
# 1. Inisialisasi Git (jika belum)
git init
git branch -M main

# 2. Simpan semua file
git add .
git commit -m "feat: initial commit Super Mario Sosiologi XI lengkap dengan Cloudflare Pages & GitHub Actions"

# 3. Hubungkan ke repositori GitHub Anda (ganti USERNAME dengan username GitHub Anda)
git remote add origin https://github.com/USERNAME/super-mario-sosiologi.git

# 4. Unggah (push) ke GitHub
git push -u origin main
```

---

### Langkah 2: Hubungkan Repositori GitHub ke Cloudflare Pages

Cloudflare Pages menyediakan hosting gratis dengan performa sangat cepat di seluruh dunia dan SSL/HTTPS otomatis.

1. Buka Dashboard Cloudflare di [https://dash.cloudflare.com/](https://dash.cloudflare.com/).
2. Masuk ke menu **Workers & Pages** -> Klik tombol **Create Application** -> Pilih tab **Pages**.
3. Klik **Connect to Git** dan pilih akun GitHub Anda.
4. Pilih repositori `super-mario-sosiologi` yang baru saja Anda push.
5. Konfigurasikan **Build Settings**:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (kosongkan / default)
6. Di bagian **Environment Variables (opsional)**, tambahkan:
   - `NODE_VERSION` = `20`
   - `TEACHER_EMAIL` = `uripsupandi99@admin.sma.belajar.id`
7. Klik **Save and Deploy**!
8. Dalam waktu ~1 menit, game Anda akan aktif dengan alamat URL resmi seperti:
   `https://super-mario-sosiologi.pages.dev`!

Setiap kali Anda melakukan update kode dan `git push`, Cloudflare Pages akan otomatis mengompilasi dan memperbarui game secara langsung tanpa jeda (*zero-downtime deployment*).

---

### Konfigurasi Cloudflare Pages yang Telah Disediakan

Project ini sudah dilengkapi file konfigurasi khusus Cloudflare:
- `public/_redirects`: Mengarahkan semua rute SPA ke `/index.html 200` agar halaman tidak 404 saat di-refresh.
- `public/_headers`: Keamanan `X-Frame-Options`, `Content-Security`, dan kompresi aset statis.
- `wrangler.toml`: Konfigurasi Cloudflare Pages standar.
- `functions/api/scores.ts`: Cloudflare Pages Function otomatis untuk menyimpan skor di Cloudflare Edge.
- `.github/workflows/deploy.yml`: Otomatisasi GitHub Actions CI/CD.

---

## 🎮 Fitur Permainan

1. **35 Soal AKM Literasi Berita Terkini 2026**:
   - Soal otentik Level Kognitif Bloom: **C3 (Aplikasi)**, **C4 (Analisis)**, dan **C5 (Evaluasi)**.
   - Pembahasan pedagogis sosiologis lengkap pada setiap soal.
2. **Backsound & Audio Asli NES Super Mario Bros**:
   - Synthesizer Web Audio API murni (zero-dependency, bebas CORS).
   - Lagu *Overworld Theme*, *Castle Theme*, suara koin, lompat, injak musuh, jamur 1-Up, nafas api Bowser, dan lagu kemenangan penyelamatan putri.
3. **Maksimal 10 Nyawa & Monster Goomba**:
   - Siswa memiliki 10 nyawa maksimal. Siswa dapat menginjak Goomba atau menembaknya.
4. **🍄 Jamur & Senjata Api (Fire Mario)**:
   - Menyundul balok `[?]` atau menjawab soal memunculkan Super Mushroom.
   - Mario berubah menjadi *Fire Mario* dan dapat menembakkan bola api menggunakan tombol `[TEMBAK 🔥]` atau keyboard `F`!
5. **👑 Pertarungan Bos Monster (Bowser) & Penyelamatan Putri**:
   - Di babak akhir (Soal 31–35), siswa bertarung di Kastil Bowser di atas jembatan lahar panas.
   - Kalahkan Bowser untuk menyelamatkan Putri Peach dan membuka cutscene apresiasi!
6. **Ketik Manual Nama & Kelas Siswa**:
   - Siswa mengetik nama dan kelas secara mandiri sebelum petualangan dimulai.
7. **Kirim Nilai Otomatis ke Email Guru**:
   - Nilai, analisis kognitif, dan rekomendasi tindak lanjut belajar langsung dicatat dan dapat dikirim ke: `uripsupandi99@admin.sma.belajar.id`.
   - Dilengkapi **Panel Guru** terpadu untuk rekapitulasi nilai dan unduh format Excel/CSV.

---

## 🛠️ Perintah Pengembangan Lokal

```bash
# Install dependensi
npm install

# Jalankan dev server lokal
npm run dev

# Kompilasi build produksi
npm run build

# Uji linting TypeScript
npm run lint
```

---

Dibuat dengan ❤️ untuk Pembelajaran Sosiologi Interaktif Tingkat SMA Tahun Pelajaran 2026.  
**Guru Pengampu:** Urip Supandi, S.Pd (`uripsupandi99@admin.sma.belajar.id`)
