
# 🎓 Undangan Wisuda Jimmy Randa Putra, S.Kom.

Undangan wisuda digital premium dengan estetika **Soft Neo-Brutalism**. Dirancang khusus untuk merayakan momen bersejarah kelulusan Jimmy Randa Putra, S.Kom. dari **Universitas Putra Indonesia YPTK Padang**.

## ✨ Fitur Utama
- **🎨 Desain Neo-Brutalist**: Tampilan unik, berani, dan modern dengan kontras tinggi namun tetap nyaman di mata (Soft Style).
- **🤖 AI Message Refinement**: Integrasi **Genkit (Google Gemini)** untuk membantu tamu memoles pesan ucapan agar lebih elegan tanpa menghilangkan gaya khas pengirim.
- **💬 Dinding Harapan Real-time**: Didukung oleh **Supabase** untuk mengirim dan menampilkan doa dari tamu secara instan dengan fitur avatar kustom.
- **⏳ Countdown Berbasis Event**: Hitung mundur otomatis menuju hari H (19 Mei 2026).
- **📱 Responsive & Interactive**: Animasi halus menggunakan **Framer Motion** dan layout yang optimal untuk perangkat mobile.
- **🎵 Musik Latar**: Pengalaman imersif dengan kontrol musik yang mudah digunakan.
- **🗺️ Integrasi Lokasi**: Navigasi Google Maps langsung dari undangan.

## 🛠️ Tech Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI**: [Genkit](https://firebase.google.com/docs/genkit) + Google Gemini
- **Database/Real-time**: [Supabase](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Memulai (Local Setup)

1. **Clone repositori:**
   ```bash
   git clone https://github.com/jimmyranda/undangan-wisuda-jimmy.git
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Environment:**
   Buat file `.env` di root folder dan isi kredensial berikut:
   ```env
   GOOGLE_GENAI_API_KEY=your_key_here
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

## 📄 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---
**Build with 💛 by Jimmy Randa Putra**
