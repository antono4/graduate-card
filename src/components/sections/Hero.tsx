
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrlById, getImageHintById } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { GraduateData } from '@/app/lib/graduate-data';
import { Calendar, Clock, MapPin, CalendarPlus, Share2, Navigation, Sparkles, EyeOff, CheckCircle2, Zap, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Komponen Sticker untuk Hero
const Sticker = ({ icon: Icon, color = "bg-primary", position = "top-left" }: { icon: any, color?: string, position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) => {
  const posClasses = {
    "top-left": "-top-4 -left-4 rotate-[-12deg]",
    "top-right": "-top-4 -right-4 rotate-[12deg]",
    "bottom-left": "-bottom-4 -left-4 rotate-[15deg]",
    "bottom-right": "-bottom-4 -right-4 rotate-[-15deg]"
  };

  return (
    <div className={`absolute ${posClasses[position]} w-10 h-10 sm:w-12 sm:h-12 ${color} soft-brutalist-border rounded-xl soft-brutalist-shadow-lg z-40 flex items-center justify-center`}>
      <Icon className="w-5 h-5 sm:w-6 h-6 text-black" />
    </div>
  );
};

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [isGraduated, setIsGraduated] = useState(false);
  const { toast } = useToast();
  const { graduate, event } = GraduateData as any;
  
  const portraitUrl = getImageUrlById('graduate-portrait');
  const portraitHint = getImageHintById('graduate-portrait');
  
  useEffect(() => {
    setMounted(true);
    
    const targetDate = new Date(event.date);
    const checkStatus = () => {
      const now = new Date();
      setIsGraduated(now >= targetDate);
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [event.date]);

  if (!mounted) return null;

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  const formattedTime = eventDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + " WIB";

  const addToCalendar = () => {
    const start = event.date.replace(/-|:|\.\d\d\d/g, "");
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=Wisuda+${graduate.fullName}&dates=${start}/${start}&details=Perayaan+Wisuda+${graduate.fullName}&location=${event.locationName}&sf=true&output=xml`;
    window.open(url, '_blank');
    toast({
      title: "Membuka Kalender",
      description: "Menambahkan jadwal wisuda ke Google Calendar Anda.",
    });
  };

  const shareInvitation = () => {
    if (navigator.share) {
      navigator.share({
        title: `Undangan Wisuda ${graduate.fullName}`,
        text: `Mari merayakan momen wisuda ${graduate.fullName} pada ${formattedDate}!`,
        url: window.location.href,
      }).catch(() => {
        toast({ title: "Gagal membagikan", description: "Coba salin link secara manual." });
      });
    } else {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      toast({
        title: "Link disalin!",
        description: "Tautan undangan telah disalin ke clipboard Anda.",
      });
    }
  };

  return (
    <section className="relative flex items-center justify-center py-12 sm:py-20 px-4 bg-background overflow-visible min-h-[80vh] lg:min-h-[85vh]">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-20" />
      
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="soft-brutalist-border soft-brutalist-shadow-lg bg-white rounded-[32px] sm:rounded-[40px] overflow-visible relative"
        >
          <Sticker icon={Star} color="bg-accent" position="top-left" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-visible relative">
            {/* Image Side */}
            <div className="lg:col-span-5 relative h-[500px] sm:h-[550px] lg:h-auto border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black overflow-hidden group rounded-t-[29px] lg:rounded-l-[37px] lg:rounded-tr-none">
              <Image 
                src={portraitUrl} 
                alt={graduate.fullName} 
                fill 
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                priority
                data-ai-hint={portraitHint}
              />
              <div className="absolute top-4 right-4 z-20">
                <Button 
                  variant="secondary" 
                  size="icon" 
                  onClick={shareInvitation}
                  className="rounded-full soft-brutalist-shadow w-10 h-10 bg-white soft-brutalist-interactive"
                >
                  <Share2 className="w-5 h-5 text-black" />
                </Button>
              </div>
              <div className="absolute bottom-6 left-4 right-4 z-20">
                <div className="bg-white soft-brutalist-border soft-brutalist-shadow px-4 py-3 rounded-xl sm:rounded-2xl relative">
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-secondary soft-brutalist-border rounded-full flex items-center justify-center shadow-sm">
                    <Sparkles className="w-3 h-3 text-black" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-black uppercase leading-none tracking-tighter text-black flex items-center flex-wrap gap-2">
                    {graduate.fullName}
                    <AnimatePresence mode="wait">
                      {!isGraduated ? (
                        <motion.span
                          key="censored-hero"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="bg-black text-white text-[8px] sm:text-[9px] px-2 py-1 flex items-center gap-1 rounded-sm rotate-1"
                        >
                          <EyeOff className="w-2.5 h-2.5" /> [REDACTED]
                        </motion.span>
                      ) : (
                        <motion.span
                          key="revealed-hero"
                          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                          animate={{ opacity: 1, scale: 1, rotate: 0 }}
                          className="text-primary font-black flex items-center"
                        >
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" /> {graduate.degree}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </h2>
                </div>
              </div>
            </div>

            {/* Content Side - Fixed Radius Bug */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white relative rounded-b-[29px] lg:rounded-r-[37px] lg:rounded-bl-none">
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="inline-block bg-secondary/20 text-secondary-foreground px-4 py-1.5 soft-brutalist-border font-black text-[9px] uppercase rounded-full tracking-widest relative">
                    <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-primary rounded-full border border-black" />
                    {graduate.university}
                  </span>
                  {isGraduated && (
                    <motion.span 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
                      className="bg-green-400 text-black px-3 py-1.5 soft-brutalist-border font-black text-[9px] uppercase rounded-full tracking-widest flex items-center gap-1 shadow-sm"
                    >
                      <CheckCircle2 className="w-3 h-3" /> OFFICIAL
                    </motion.span>
                  )}
                </div>
                
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[0.85] mb-8 lg:mb-10 tracking-tighter uppercase text-black font-headline">
                  MOMEN<br/><span className="text-primary">{isGraduated ? 'KELULUSAN' : 'WISUDA'}</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 lg:mb-10">
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary soft-brutalist-border rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-3 transition-transform soft-brutalist-shadow relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-black" />
                      <Calendar className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-black uppercase opacity-40 tracking-widest">
                        {isGraduated ? 'Momen Bersejarah' : 'Hari & Tanggal'}
                      </p>
                      <p className="text-sm sm:text-base font-black leading-none text-black mt-1">{formattedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary soft-brutalist-border rounded-xl flex items-center justify-center shrink-0 group-hover:-rotate-3 transition-transform soft-brutalist-shadow relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-black" />
                      <Clock className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[8px] sm:text-[9px] font-black uppercase opacity-40 tracking-widest">
                        {isGraduated ? 'Waktu Pelaksanaan' : 'Waktu'}
                      </p>
                      <p className="text-sm sm:text-base font-black leading-none text-black mt-1">{formattedTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 group sm:col-span-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent soft-brutalist-border rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-3 transition-transform text-white soft-brutalist-shadow relative">
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full border border-black" />
                      <MapPin className="w-5 h-5 sm:w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] sm:text-[9px] font-black uppercase opacity-40 tracking-widest">Lokasi Acara</p>
                      <p className="text-sm sm:text-base font-black leading-tight text-black mt-1 line-clamp-1">{event.locationName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                {!isGraduated && (
                  <Button 
                    variant="accent" 
                    className="flex-1 soft-brutalist-interactive text-white rounded-xl font-black h-12 sm:h-14" 
                    onClick={addToCalendar}
                  >
                    <CalendarPlus className="mr-2 w-5 h-5" /> SIMPAN JADWAL
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="flex-1 soft-brutalist-interactive rounded-xl font-black h-12 sm:h-14" 
                  onClick={() => document.getElementById('lokasi')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Navigation className="mr-2 w-5 h-5" /> LIHAT LOKASI
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
