"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduateData } from '@/app/lib/graduate-data';

export function Countdown() {
  const { event } = GraduateData;
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(event.date);
    const timer = setInterval(() => {
      const now = new Date();
      const difference = target.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  const items = [
    { label: 'HARI', value: timeLeft.days, color: 'bg-primary' },
    { label: 'JAM', value: timeLeft.hours, color: 'bg-secondary' },
    { label: 'MENIT', value: timeLeft.minutes, color: 'bg-accent' },
    { label: 'DETIK', value: timeLeft.seconds, color: 'bg-white' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
      {items.map((item, idx) => (
        <motion.div 
          key={item.label}
          initial={{ rotate: -2, scale: 0.95 }}
          whileInView={{ rotate: idx % 2 === 0 ? 2 : -2, scale: 1 }}
          className={`${item.color} p-5 sm:p-8 md:p-10 soft-brutalist-border soft-brutalist-shadow flex flex-col items-center justify-center relative overflow-hidden group rounded-2xl sm:rounded-3xl`}
        >
          <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tabular-nums leading-none group-hover:scale-110 transition-transform text-black">
            {item.value < 10 ? `0${item.value}` : item.value}
          </span>
          <span className="text-[10px] sm:text-xs md:text-lg lg:text-xl font-black mt-3 sm:mt-5 border-t-[1.5px] sm:border-t-2 md:border-t-4 border-black w-full text-center pt-1 sm:pt-2 uppercase tracking-widest text-black">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}