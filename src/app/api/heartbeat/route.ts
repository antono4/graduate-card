
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/**
 * API Route ini berfungsi sebagai 'Heartbeat' untuk menjaga Supabase tetap aktif.
 * Panggil URL ini menggunakan layanan Cron-job gratis.
 */
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    // Melakukan query ringan untuk memicu aktivitas database
    const { data, error } = await supabase.from('wishes').select('id').limit(1);

    if (error) throw error;

    return NextResponse.json({ 
      status: 'success', 
      message: 'Supabase is alive and kicking!',
      timestamp: new Date().toISOString() 
    });
  } catch (err: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: err.message 
    }, { status: 500 });
  }
}
