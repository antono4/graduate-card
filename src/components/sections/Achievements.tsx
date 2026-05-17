
"use client";

import { motion } from 'framer-motion';
import { Award, Zap, Star, Trophy } from 'lucide-react';
import { GraduateData } from '@/app/lib/graduate-data';

export function Achievements() {
  const achievements = [
    { title: "IPK MEMUASKAN", desc: "Konsistensi belajar selama 8 semester penuh.", color: "bg-primary" },
    { title: "PROYEK AKHIR", desc: "Membangun solusi teknologi inovatif.", color: "bg-secondary" },
    { title: "AKTIF ORGANISASI", desc: "Berperan aktif dalam pengembangan kampus.", color: "bg-accent" },
    { title: "OFFICIAL S.KOM", desc: "Puncak perjuangan gelar sarjana.", color: "bg-white" },
  ];
  const icons = [Award, Zap, Star, Trophy];

  return (
    <section className="py-20 sm:py-28 px-4 bg-white border-y-[2px] sm:border-y-[3px] border-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-headline font-black tracking-tighter uppercase mb-3 sm:mb-4 leading-none">JEJAK PERJUANGAN</h2>
          <p className="text-xs sm:text-sm md:text-lg font-bold text-muted-foreground uppercase tracking-[0.2em] sm:tracking-widest">Dedikasi Selama Masa Perkuliahan</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {achievements.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 sm:p-8 soft-brutalist-border soft-brutalist-shadow ${item.color} rounded-[24px] group`}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 soft-brutalist-border bg-white rounded-xl flex items-center justify-center mb-6 sm:mb-8 soft-brutalist-shadow group-hover:-translate-y-1 transition-transform">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                </div>
                <h4 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3 uppercase leading-tight">{item.title}</h4>
                <p className="font-bold text-xs sm:text-sm uppercase opacity-70 leading-snug">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
