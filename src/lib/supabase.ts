
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Pastikan hanya menggunakan Anon Key untuk Client-side (Keamanan)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
