
# 🎓 Undangan Wisuda Jimmy Randa Putra, S.Kom.

Undangan wisuda digital premium dengan estetika **Soft Neo-Brutalism**. Dirancang khusus untuk merayakan momen bersejarah kelulusan Jimmy Randa Putra, S.Kom. dari **Universitas Putra Indonesia YPTK Padang**.

## ✨ Fitur Utama
- **🎨 Desain Neo-Brutalist**: Tampilan unik, berani, dan modern dengan kontras tinggi namun tetap nyaman di mata (Soft Style).
- **🖼️ Smart Thumbnail**: Pratinjau gambar otomatis saat link dibagikan di WhatsApp/Media Sosial menggunakan format **WebP** yang ringan.
- **🤖 AI Message Refinement**: Integrasi **Genkit (Google Gemini)** untuk membantu tamu memoles pesan ucapan agar lebih elegan.
- **💬 Dinding Harapan Real-time**: Didukung oleh **Supabase** untuk mengirim dan menampilkan doa dari tamu secara instan.
- **⏳ Countdown Berbasis Event**: Hitung mundur otomatis menuju hari H (19 Mei 2026).
- **📱 Responsive & Interactive**: Animasi halus menggunakan **Framer Motion** dan hiasan "Stickers" yang estetik.

## 🚀 Cara Agar Thumbnail Muncul di WhatsApp
Jika gambar thumbnail belum muncul saat link dibagikan, ikuti langkah wajib ini:

1. **Kompres Gambar**: Pastikan file `public/images/og-image.webp` berukuran di bawah **300KB**. Ukuran file yang terlalu besar (di atas 1MB) seringkali diblokir oleh bot WhatsApp.
2. **Deploy ke Vercel**: Pastikan web sudah online. Thumbnail tidak akan muncul jika link berasal dari localhost.
3. **Gunakan Debugger**: 
   - Buka [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
   - Masukkan URL website Anda.
   - Klik tombol **Debug**.
   - Jika data lama muncul, klik tombol **Scrape Again** beberapa kali hingga gambar baru muncul.
4. **Update Cache WhatsApp**: WhatsApp mungkin butuh waktu untuk menghapus cache lama. Cobalah kirim link ke kontak yang belum pernah menerima link tersebut.

## 📄 Lisensi
Proyek ini dilisensikan di bawah [MIT License](LICENSE).

---
**Build with 💛 by Jimmy Randa Putra**
