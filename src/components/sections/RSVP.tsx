
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Send } from 'lucide-react';
import { GraduateData } from '@/app/lib/graduate-data';

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const { event } = GraduateData;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section id="rsvp" className="py-20 px-4 bg-secondary/20">
        <div className="max-w-xl mx-auto">
          <div className="bg-white soft-brutalist-border soft-brutalist-shadow-lg p-8 md:p-12 text-center rounded-[24px]">
            <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase leading-none">Dikonfirmasi!</h2>
            <p className="text-sm md:text-lg font-bold mb-8 opacity-70">Respons Anda telah tercatat. Terima kasih atas partisipasinya!</p>
            <Button onClick={() => setSubmitted(false)} className="w-full h-14 soft-brutalist-interactive rounded-xl">KEMBALI</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="py-24 px-4 bg-primary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4">KONFIRMASI?</h2>
          <p className="text-sm md:text-lg font-black bg-white inline-block px-6 py-2 soft-brutalist-border rounded-full shadow-sm">
            Mohon konfirmasi kehadiran sebelum {event.rsvpDeadline}.
          </p>
        </div>

        <div className="bg-white soft-brutalist-border soft-brutalist-shadow-lg p-6 md:p-10 rounded-[32px]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest opacity-50 ml-1">Nama Lengkap</Label>
                <Input placeholder="NAMA LENGKAP" className="soft-brutalist-input h-14" required />
              </div>
              <div className="space-y-2">
                <Label className="font-black uppercase text-[10px] tracking-widest opacity-50 ml-1">Alamat Email</Label>
                <Input type="email" placeholder="EMAIL@DOMAIN.COM" className="soft-brutalist-input h-14" required />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="font-black uppercase text-[10px] tracking-widest opacity-50 ml-1">Status Kehadiran</Label>
              <RadioGroup defaultValue="attending" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-5 soft-brutalist-border bg-white cursor-pointer hover:bg-secondary/10 transition-colors rounded-xl">
                  <RadioGroupItem value="attending" id="attending" className="w-5 h-5" />
                  <Label htmlFor="attending" className="font-black text-sm md:text-base cursor-pointer uppercase">Saya Akan Hadir</Label>
                </div>
                <div className="flex items-center space-x-3 p-5 soft-brutalist-border bg-white cursor-pointer hover:bg-accent/10 transition-colors rounded-xl">
                  <RadioGroupItem value="declining" id="declining" className="w-5 h-5" />
                  <Label htmlFor="declining" className="font-black text-sm md:text-base cursor-pointer uppercase">Maaf, Berhalangan</Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full h-16 bg-accent text-white soft-brutalist-interactive rounded-2xl">
              KIRIM KONFIRMASI <Send className="ml-3 w-5 h-5" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
