-- Skema Database untuk Dinding Harapan (Wishes)
-- Jalankan skrip ini di SQL Editor Supabase Anda

-- 1. Hapus tabel jika sudah ada (PERHATIAN: Ini akan menghapus data yang ada)
DROP TABLE IF EXISTS wishes;

-- 2. Buat tabel wishes dengan ID integer berurutan
CREATE TABLE wishes (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  avatar_color TEXT NOT NULL DEFAULT 'bg-primary',
  avatar_icon TEXT NOT NULL DEFAULT 'User',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- 4. Kebijakan Keamanan (Policies)
-- Izinkan semua orang membaca pesan
CREATE POLICY "Allow public read access" ON wishes
  FOR SELECT USING (true);

-- Izinkan semua orang menambah pesan (Anonymous Insert)
CREATE POLICY "Allow public insert access" ON wishes
  FOR INSERT WITH CHECK (true);

-- 5. Aktifkan Real-time untuk tabel ini
-- Pastikan publikasi 'supabase_realtime' mencakup tabel wishes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'wishes'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE wishes;
  END IF;
END $$;

-- 6. Tambahkan data awal (Seed Data)
INSERT INTO wishes (name, message, avatar_color, avatar_icon)
VALUES 
  ('Andi Pratama', 'Selamat wisuda Jimmy! Perjalanan baru dimulai sekarang. Menyala abangku! 🔥', 'bg-primary', 'GraduationCap'),
  ('Siti Aminah', 'Bangga banget sama pencapaianmu. Sukses terus di dunia kerja nanti ya Jim!', 'bg-secondary', 'Heart'),
  ('Budi Santoso', 'Akhirnya S.Kom juga! Ditunggu traktirannya di Padang ya. Gaspol!', 'bg-accent', 'Zap'),
  ('Dina Larasati', 'Happy Graduation Jimmy! Semoga ilmu yang didapat berkah dan bermanfaat bagi sesama.', 'bg-purple-400', 'Star'),
  ('Eko Wijaya', 'Mantap Jimmy! Teknologi Informatika UPI YPTK bangga punya lulusan sepertimu.', 'bg-teal-400', 'Rocket');
