
"use client";

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { Gallery } from '@/components/sections/Gallery';
import { WishesHub } from '@/components/sections/WishesHub';
import { Countdown } from '@/components/ui/Countdown';
import { GraduateData } from '@/app/lib/graduate-data';
import { 
  GraduationCap, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  X, 
  MapPin, 
  Navigation,
  CheckCircle2,
  Lock,
  Instagram,
  Linkedin,
  MessageCircle,
  Heart,
  Copy,
  Zap,
  Check,
  Star,
  Flame
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const SectionPin = ({ color = "bg-primary" }: { color?: string }) => (
  <div className={`absolute -top-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 ${color} soft-brutalist-border rounded-full soft-brutalist-shadow z-30 flex items-center justify-center`}>
    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full opacity-50" />
  </div>
);

const Marquee = ({ isGraduated }: { isGraduated: boolean }) => {
  return (
    <div className="bg-black text-white py-3 sm:py-4 overflow-hidden whitespace-nowrap border-y-[3px] border-black flex relative z-30">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 sm:gap-8 items-center"
      >
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex gap-4 sm:gap-8 items-center">
            <span className="text-lg sm:text-2xl font-black uppercase tracking-tighter">
              {isGraduated ? "OFFICIAL S.KOM" : "TOP SECRET"}
            </span>
            <span className="text-primary text-xl sm:text-3xl">★</span>
            <span className="text-lg sm:text-2xl font-black uppercase tracking-tighter">CLASS OF 2026</span>
            <span className="text-secondary text-xl sm:text-3xl">★</span>
            <span className="text-lg sm:text-2xl font-black uppercase tracking-tighter">JIMMY RANDA PUTRA</span>
            <span className="text-accent text-xl sm:text-3xl">★</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function Home() {
  const { toast } = useToast();
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestName, setGuestName] = useState<string | null>(null);
  const [isGraduated, setIsGraduated] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { graduate, event, ui } = GraduateData as any;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const to = searchParams.get('to');
    if (to) setGuestName(to);
    
    if (!hasOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const targetDate = new Date(event.date);
    const checkStatus = () => {
      const now = new Date();
      setIsGraduated(now >= targetDate);
    };

    checkStatus();
    const timer = setInterval(checkStatus, 1000);
    return () => clearInterval(timer);
  }, [hasOpened, searchParams, event.date]);

  const handleOpenInvitation = () => {
    setHasOpened(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked or audio failed"));
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const copyAddress = () => {
    const fullAddress = `${event.locationName}, ${event.address}`;
    navigator.clipboard.writeText(fullAddress);
    toast({
      title: "Alamat Disalin!",
      description: "Silakan tempel di aplikasi ojek/taksi online Anda.",
    });
  };

  return (
    <main className="min-h-screen bg-background relative selection:bg-primary selection:text-black scroll-smooth font-body">
      <audio
        ref={audioRef}
        src="/music/background.mp3" 
        loop
      />

      <div className="fixed inset-0 bg-dot-pattern pointer-events-none opacity-20 z-0" />

      {hasOpened && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-accent z-[110] origin-left"
          style={{ scaleX }}
        />
      )}

      {hasOpened && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-4 left-4 z-[120] w-10 h-10 sm:w-12 sm:h-12 bg-white soft-brutalist-border rounded-full flex items-center justify-center soft-brutalist-shadow soft-brutalist-interactive"
        >
          {isPlaying ? <Volume2 className="w-4 h-4 sm:w-5 h-5 text-black" /> : <VolumeX className="w-4 h-4 sm:w-5 h-5 text-black" />}
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {!hasOpened ? (
          <motion.section
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 1.05, 
              filter: "blur(10px)",
              transition: { duration: 0.6, ease: "easeInOut" } 
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white p-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-dot-pattern opacity-30" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            
            <div className="w-full max-sm:max-w-[340px] max-w-md relative z-10 text-center">
              <motion.div 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="bg-white soft-brutalist-border soft-brutalist-shadow-lg p-6 sm:p-10 rounded-[32px] sm:rounded-[40px] relative"
              >
                <SectionPin color="bg-accent" />
                <div className="absolute -bottom-3 -right-3 w-8 h-8 bg-secondary soft-brutalist-border rounded-lg soft-brutalist-shadow z-20 flex items-center justify-center rotate-12">
                  <Star className="w-4 h-4 text-black fill-black" />
                </div>

                <div className="w-14 h-14 sm:w-20 sm:h-20 bg-primary soft-brutalist-border rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 soft-brutalist-shadow animate-bounce">
                  < GraduationCap className="w-7 h-7 sm:w-10 sm:h-10 text-black" />
                </div>
                
                <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground mb-3">
                  {isGraduated ? "KABAR BAHAGIA" : "UNDANGAN EKSKLUSIF"}
                </h4>
                
                <h1 className="text-3xl sm:text-5xl font-headline font-black mb-4 leading-[0.85] tracking-tighter uppercase text-black">
                  {isGraduated ? (
                    <>RESMI <span className="text-primary">LULUS</span></>
                  ) : (
                    <>UNDANGAN <span className="text-primary">WISUDA</span></>
                  )}
                </h1>

                <div className="mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tighter text-black leading-tight mb-2">
                    {graduate.fullName}
                  </h2>
                  <div className="min-h-[30px] sm:min-h-[40px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      {!isGraduated ? (
                        <motion.div
                          key="censored-label"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="inline-flex items-center bg-black text-white px-3 py-1 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-sm rotate-1 shadow-sm"
                        >
                          <Lock className="w-3 h-3 mr-2" /> TOP SECRET
                        </motion.div>
                      ) : (
                        <motion.div
                          key="revealed-label"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-primary font-headline text-xl sm:text-2xl font-black italic tracking-tighter"
                        >
                          {graduate.degree}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {guestName && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8 sm:mb-10 bg-white soft-brutalist-border soft-brutalist-shadow p-4 sm:p-5 rounded-[20px] sm:rounded-[24px] relative group"
                  >
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white px-3 py-1 text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] rounded-full soft-brutalist-border shadow-sm whitespace-nowrap">
                      TAMU SPESIAL
                    </div>
                    <div className="pt-1 sm:pt-2">
                      <p className="text-[8px] font-black uppercase text-muted-foreground mb-1 tracking-[0.3em]">KHUSUS UNTUK</p>
                      <p className="text-lg sm:text-2xl font-black text-accent uppercase tracking-tighter truncate leading-tight">
                        {guestName}
                      </p>
                    </div>
                  </motion.div>
                )}

                <Button 
                  onClick={handleOpenInvitation}
                  size="default"
                  className="w-full h-12 sm:h-14 text-sm sm:text-base font-black soft-brutalist-interactive rounded-xl sm:rounded-2xl group flex items-center justify-center gap-3"
                >
                  {isGraduated ? "LIHAT KABAR BAHAGIA" : "BUKA UNDANGAN"} 
                  <ArrowRight className="w-4 h-4 sm:w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </motion.div>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <Hero />
            </div>

            <Marquee isGraduated={isGraduated} />

            <section className="py-16 sm:py-24 px-4 bg-primary border-y-[3px] border-black overflow-hidden relative">
               <div className="absolute inset-0 bg-dot-pattern opacity-10" />
              <div className="max-w-5xl mx-auto text-center relative z-10">
                <AnimatePresence mode="wait">
                  {!isGraduated ? (
                    <motion.div
                      key="countdown-view"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <div className="relative inline-block mb-8 sm:mb-10">
                        <SectionPin color="bg-white" />
                        <h3 className="text-3xl sm:text-5xl font-headline font-black uppercase tracking-tighter text-black px-6 py-2 bg-white/20 rounded-2xl soft-brutalist-border">
                          HITUNG <span className="text-white">MUNDUR</span>
                        </h3>
                      </div>
                      <Countdown />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="celebration-view"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", damping: 15 }}
                      className="space-y-6"
                    >
                      <h2 className="text-4xl sm:text-7xl md:text-8xl font-headline font-black uppercase leading-[0.85] tracking-tighter text-black">
                        RESMI <span className="text-white">LULUS!</span>
                      </h2>

                      <div className="max-w-xl mx-auto bg-white soft-brutalist-border soft-brutalist-shadow p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] relative">
                        <SectionPin color="bg-accent" />
                        <p className="text-lg sm:text-2xl font-black uppercase tracking-tighter text-black leading-tight">
                          Selamat atas kelulusan<br/>
                          <span className="text-primary mt-1 block">{graduate.fullName}, {graduate.degree}</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <section className="py-16 sm:py-28 px-4 bg-white overflow-hidden relative">
              <div className="max-w-4xl mx-auto relative z-10">
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white soft-brutalist-border soft-brutalist-shadow-lg p-6 sm:p-14 relative rounded-[32px] sm:rounded-[40px]"
                >
                  <SectionPin color="bg-primary" />
                  <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-accent soft-brutalist-border rounded-full flex items-center justify-center soft-brutalist-shadow rotate-12">
                    <Flame className="w-6 h-6 text-white fill-white" />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.p 
                      key={isGraduated ? 'graduated-quote' : 'upcoming-quote'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl sm:text-4xl font-headline font-black uppercase leading-[0.9] tracking-tighter mb-6 sm:mb-8 text-black"
                    >
                      {isGraduated 
                        ? graduate.quote
                        : "Sedang berusaha keras agar foto di ijazah nanti minimal kelihatan mirip aslinya. Mohon doanya agar lancar sampai hari H ya!"
                      }
                    </motion.p>
                  </AnimatePresence>
                  <div className="h-1 bg-primary w-16 sm:w-20 mb-4 sm:mb-6" />
                  <h4 className="text-lg sm:text-3xl font-black uppercase tracking-tighter leading-none text-black">
                    {graduate.fullName}
                    {isGraduated && <span className="text-primary ml-2 font-headline italic">, {graduate.degree}</span>}
                  </h4>
                  <p className="text-[9px] sm:text-[10px] font-black uppercase text-muted-foreground mt-2 tracking-[0.3em]">Lulusan {graduate.major} • {graduate.university}</p>
                </motion.div>
              </div>
            </section>
            
            <Gallery onImageClick={setSelectedImage} />

            <WishesHub />

            <section className="py-16 sm:py-24 px-4 bg-white border-t-[3px] border-black relative overflow-hidden">
               <div className="max-w-4xl mx-auto relative z-10">
                 <motion.div
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="bg-white soft-brutalist-border soft-brutalist-shadow-lg p-6 sm:p-12 rounded-[40px] relative overflow-visible"
                 >
                    <div className="flex flex-col gap-6 relative z-10">
                      <div className="flex items-center gap-4 sm:gap-6 mb-2">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent soft-brutalist-border rounded-full flex items-center justify-center shrink-0 soft-brutalist-shadow">
                          <div className="w-3 h-3 bg-white rounded-full opacity-50" />
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-headline font-black leading-none uppercase tracking-tighter text-black">
                          {ui.giftSection.title}
                        </h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 sm:p-6 soft-brutalist-border bg-white rounded-2xl soft-brutalist-shadow">
                           <div className="w-8 h-8 bg-primary/20 soft-brutalist-border rounded-lg flex items-center justify-center shrink-0">
                             <Check className="w-4 h-4 text-black" />
                           </div>
                           <p className="text-sm sm:text-xl font-black text-black uppercase tracking-tighter leading-tight italic">
                             "{ui.giftSection.quote}"
                           </p>
                        </div>
                        
                        <div className="flex items-start gap-4 p-4 sm:p-6 soft-brutalist-border bg-white rounded-2xl soft-brutalist-shadow">
                           <div className="w-8 h-8 bg-secondary/20 soft-brutalist-border rounded-lg flex items-center justify-center shrink-0">
                             <Check className="w-4 h-4 text-black" />
                           </div>
                           <p className="text-sm sm:text-xl font-black text-black uppercase tracking-tighter leading-tight italic">
                             {ui.giftSection.footer}
                           </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col sm:flex-row items-center gap-2">
                        <div className="h-1 w-12 bg-primary" />
                        <p className="text-[10px] sm:text-xs font-bold text-black/40 uppercase tracking-[0.3em] flex items-center gap-2">
                          <Zap className="w-3 h-3 text-primary fill-primary" /> HARAP DIPATUHI DEMI KEESTETIKAN BERSAMA <Zap className="w-3 h-3 text-primary fill-primary" />
                        </p>
                      </div>
                    </div>
                 </motion.div>
               </div>
            </section>

            <section id="lokasi" className="py-20 sm:py-32 px-4 bg-white border-t-[3px] border-black relative overflow-hidden">
              <div className="max-w-3xl mx-auto relative z-10">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white soft-brutalist-border soft-brutalist-shadow-lg rounded-[32px] sm:rounded-[48px] overflow-visible"
                >
                  <div className="p-8 sm:p-16 text-center relative">
                    <SectionPin color="bg-secondary" />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary soft-brutalist-border rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 soft-brutalist-shadow">
                      <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                    </div>

                    <h2 className="text-3xl sm:text-6xl font-headline font-black leading-none uppercase tracking-tighter text-black mb-6 sm:mb-8">
                      LOKASI <span className="text-secondary">ACARA</span>
                    </h2>
                    
                    <div className="mb-8 sm:mb-12">
                      <h4 className="font-headline font-black text-xl sm:text-4xl uppercase text-black mb-2 sm:mb-3">
                        {event.locationName}
                      </h4>
                      <p className="font-bold text-xs sm:text-lg text-black uppercase opacity-60 leading-relaxed tracking-tight max-w-md mx-auto">
                        {event.address}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                      <Button asChild className="flex-1 h-14 sm:h-18 text-sm sm:text-lg font-black soft-brutalist-interactive group rounded-xl sm:rounded-2xl">
                        <a href={event.mapLink} target="_blank" rel="noopener noreferrer">
                          <Navigation className="mr-2 sm:mr-3 w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-1.5 transition-transform" /> 
                          GOOGLE MAPS
                        </a>
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={copyAddress}
                        className="flex-1 h-14 sm:h-18 text-sm sm:text-lg font-black soft-brutalist-interactive group rounded-xl sm:rounded-2xl"
                      >
                        <Copy className="mr-2 sm:mr-3 w-5 h-5 sm:w-7 sm:h-7" />
                        SALIN ALAMAT
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <footer className="py-16 sm:py-32 px-4 border-t-[3px] border-black bg-white overflow-hidden relative">
              <div className="max-w-6xl mx-auto text-center relative z-10">
                <div className="mb-8 sm:mb-12">
                  <div className="inline-flex items-center gap-2 bg-black text-white px-5 sm:px-6 py-2 rounded-full soft-brutalist-border soft-brutalist-shadow">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent fill-accent" />
                    <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em]">{ui.footer.thanksMessage}</span>
                  </div>
                </div>

                <h2 className="text-3xl sm:text-8xl font-headline font-black uppercase tracking-tighter text-black mb-6 leading-[0.85]">
                  {graduate.fullName}
                  {isGraduated ? (
                    <span className="text-primary italic block sm:inline">, {graduate.degree}</span>
                  ) : (
                    <div className="inline-flex items-center ml-0 sm:ml-4 mt-3 sm:mt-0 bg-black text-white px-3 py-1 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.2em] rounded-sm rotate-1 shadow-sm">
                      <Lock className="w-2.5 h-2.5 mr-2" /> TOP SECRET
                    </div>
                  )}
                </h2>

                <div className="flex justify-center gap-4 sm:gap-6 mb-10 sm:mb-12">
                  <a href={graduate.socials.instagram} target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 bg-white soft-brutalist-border rounded-xl flex items-center justify-center soft-brutalist-shadow soft-brutalist-interactive group">
                    <Instagram className="w-5 h-5 sm:w-6 h-6 text-black group-hover:text-accent transition-colors" />
                  </a>
                  <a href={graduate.socials.linkedin} target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 bg-white soft-brutalist-border rounded-xl flex items-center justify-center soft-brutalist-shadow soft-brutalist-interactive group">
                    <Linkedin className="w-5 h-5 sm:w-6 h-6 text-black group-hover:text-blue-600 transition-colors" />
                  </a>
                  <a href={`https://wa.me/${graduate.socials.whatsapp}`} target="_blank" className="w-10 h-10 sm:w-12 sm:h-12 bg-white soft-brutalist-border rounded-xl flex items-center justify-center soft-brutalist-shadow soft-brutalist-interactive group">
                    <MessageCircle className="w-5 h-5 sm:w-6 h-6 text-black group-hover:text-green-600 transition-colors" />
                  </a>
                </div>

                <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-black/40">
                  © 2026 {graduate.fullName.toUpperCase()} • {graduate.university.toUpperCase()}
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 sm:p-6 cursor-zoom-out backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative soft-brutalist-border bg-white rounded-2xl sm:rounded-3xl overflow-hidden soft-brutalist-shadow-lg">
                <img 
                  src={selectedImage} 
                  alt="Memory Detail" 
                  className="max-h-[80vh] sm:max-h-[85vh] w-auto block object-contain"
                />
              </div>
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white soft-brutalist-border rounded-full flex items-center justify-center soft-brutalist-shadow soft-brutalist-interactive z-50"
              >
                <X className="w-5 h-5 sm:w-6 h-6 text-black" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
