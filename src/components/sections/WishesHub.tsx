"use client";

import { useState, useEffect } from 'react';
import { motion as framerMotion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Sparkles, 
  Send, 
  User, 
  MessageCircle, 
  Loader2, 
  Heart, 
  Star, 
  Smile, 
  Zap, 
  Check, 
  GraduationCap, 
  Coffee, 
  Music, 
  Rocket, 
  Flame,
  Target,
  Crown
} from 'lucide-react';
import { refineGuestWish } from '@/ai/flows/refine-guest-wish';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
  avatar_color: string;
  avatar_icon: string;
}

const COLOR_OPTIONS = [
  'bg-primary',
  'bg-secondary',
  'bg-accent',
  'bg-blue-400',
  'bg-purple-400',
  'bg-orange-400',
  'bg-teal-400',
  'bg-pink-400',
  'bg-indigo-500',
  'bg-green-400',
  'bg-red-400',
  'bg-yellow-400',
];

const ICON_OPTIONS = [
  { name: 'User', icon: User },
  { name: 'Heart', icon: Heart },
  { name: 'Star', icon: Star },
  { name: 'Smile', icon: Smile },
  { name: 'Zap', icon: Zap },
  { name: 'GraduationCap', icon: GraduationCap },
  { name: 'Coffee', icon: Coffee },
  { name: 'Music', icon: Music },
  { name: 'Rocket', icon: Rocket },
  { name: 'Flame', icon: Flame },
  { name: 'Crown', icon: Crown },
  { name: 'Target', icon: Target },
];

const SUGGESTIONS = [
  { label: "🚀 Karir", text: "Selamat atas gelarnya! Semoga karir ke depannya makin menyala dan sukses besar!" },
  { label: "✨ Bahagia", text: "Happy Graduation! Semoga ilmu yang didapat berkah dan hidup makin penuh kebahagiaan." },
  { label: "🌟 Sukses", text: "S.Kom nih bos! Mantap bang Jimmy, gaspol terus buat kesuksesan berikutnya!" },
  { label: "💻 Tech", text: "Gelar S.Kom sudah di tangan. Saatnya guncang dunia teknologi! Menyala abangku!" },
];

export function WishesHub() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [selectedIconName, setSelectedIconName] = useState(ICON_OPTIONS[0].name);
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefining, setIsRefining] = useState(false);
  const [mounted, setMounted] = useState(false);

  const MAX_NAME_CHARS = 50;
  const MAX_MESSAGE_CHARS = 500;

  useEffect(() => {
    setMounted(true);
    fetchWishes();
    
    const channel = supabase
      .channel('wishes-realtime-channel')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'wishes' }, 
        (payload) => {
          const newWish = payload.new as Wish;
          setWishes((prev) => [newWish, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchWishes() {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching wishes:', error);
    } else {
      setWishes(data || []);
    }
    setIsLoading(false);
  }

  const formatRelativeTime = (dateString: string) => {
    if (!mounted) return "";
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) return `${diffInDays} hari yang lalu`;
    
    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths} bulan yang lalu`;
    
    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears} tahun yang lalu`;
  };

  const getIconComponent = (iconName: string) => {
    const option = ICON_OPTIONS.find(opt => opt.name === iconName);
    return option ? option.icon : User;
  };

  const handleRefine = async () => {
    if (!message) return;
    setIsRefining(true);
    try {
      const result = await refineGuestWish({ originalWish: message });
      setMessage(result.refinedMessage.substring(0, MAX_MESSAGE_CHARS));
      toast({ title: "Disempurnakan!", description: "AI telah merapikan pesan Anda tanpa mengubah gaya khasnya." });
    } catch (error) {
      toast({ variant: "destructive", title: "Gagal", description: "AI sedang sibuk." });
    } finally {
      setIsRefining(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || name.length > MAX_NAME_CHARS || message.length > MAX_MESSAGE_CHARS) return;
    
    const { error } = await supabase
      .from('wishes')
      .insert([{ 
        name, 
        message, 
        avatar_color: selectedColor,
        avatar_icon: selectedIconName
      }]);

    if (error) {
      toast({ variant: "destructive", title: "Gagal Mengirim", description: "Terjadi kesalahan pada database." });
    } else {
      setName('');
      setMessage('');
      toast({ title: "Pesan Terkirim", description: "Terima kasih atas doa terbaiknya!" });
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    setMessage(suggestionText);
    toast({
      title: "Pesan Dimuat",
      description: "Anda bisa mengedit pesan ini sebelum mengirim.",
      duration: 2000,
    });
  };

  return (
    <section id="wishes" className="relative py-20 sm:py-28 px-4 border-t-[3px] border-black bg-white overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-40" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 sm:mb-12 gap-8">
          <framerMotion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
             <h2 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase leading-[0.85] mb-4 sm:mb-6 tracking-tighter text-black">
               DINDING<br/><span className="text-accent">HARAPAN</span>
             </h2>
             <p className="text-sm sm:text-base md:text-lg font-bold text-black uppercase opacity-60">Tinggalkan doa dan ucapan terbaik untuk Jimmy.</p>
          </framerMotion.div>
          
          <framerMotion.div 
            initial={{ scale: 0, rotate: -10 }}
            whileInView={{ scale: 1, rotate: 2 }}
            viewport={{ once: true }}
            className="bg-primary soft-brutalist-border p-4 sm:p-5 soft-brutalist-shadow rounded-2xl relative"
          >
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent soft-brutalist-border rounded-full flex items-center justify-center text-white soft-brutalist-shadow animate-pulse">
              <Star className="w-4 h-4 fill-white" />
            </div>
            <div className="flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-black" />
              <span className="text-xl sm:text-2xl font-black text-black">{wishes.length} Pesan</span>
            </div>
          </framerMotion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <framerMotion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white soft-brutalist-border soft-brutalist-shadow p-6 sm:p-8 rounded-[24px] lg:sticky lg:top-24"
            >
              <h3 className="text-xl sm:text-2xl font-black mb-6 uppercase text-black">Tulis Ucapan</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest block opacity-60">1. Pilih Warna Avatar</label>
                  <div className="grid grid-cols-6 gap-2">
                    {COLOR_OPTIONS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "w-full aspect-square rounded-full soft-brutalist-border transition-all relative",
                          color,
                          selectedColor === color ? "soft-brutalist-shadow scale-110 z-10" : "opacity-60 hover:opacity-100 scale-90"
                        )}
                      >
                        {selectedColor === color && <Check className="w-3 h-3 mx-auto text-black" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest block opacity-60">2. Pilih Ikon Avatar</label>
                  <div className="grid grid-cols-6 gap-2">
                    {ICON_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = selectedIconName === opt.name;
                      return (
                        <button
                          key={opt.name}
                          type="button"
                          onClick={() => setSelectedIconName(opt.name)}
                          className={cn(
                            "w-full aspect-square rounded-xl soft-brutalist-border flex items-center justify-center transition-all bg-white",
                            isSelected ? "soft-brutalist-shadow scale-110 z-10 border-black bg-primary" : "opacity-60 hover:opacity-100 scale-90"
                          )}
                        >
                          <Icon className="w-4 h-4 text-black" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl soft-brutalist-border">
                  <div className={cn("w-10 h-10 soft-brutalist-border rounded-xl flex items-center justify-center", selectedColor)}>
                    {(() => {
                      const Icon = getIconComponent(selectedIconName);
                      return <Icon className="w-5 h-5 text-black" />;
                    })()}
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest leading-none">Pratinjau Avatar</p>
                    <p className="text-[10px] font-bold opacity-40 mt-1">Muncul di samping pesan Anda</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest">Nama</label>
                    <span className="text-[8px] opacity-40">{name.length}/{MAX_NAME_CHARS}</span>
                  </div>
                  <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={MAX_NAME_CHARS} placeholder="Nama Anda" className="soft-brutalist-input h-12" required />
                </div>
                
                <div className="space-y-2 relative">
                  <div className="flex justify-between">
                    <label className="text-[10px] font-black uppercase tracking-widest">Pesan Doa</label>
                    <span className="text-[8px] opacity-40">{message.length}/{MAX_MESSAGE_CHARS}</span>
                  </div>
                  
                  {/* AI Suggestions Row */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => handleSuggestionClick(s.text)}
                        className="bg-white soft-brutalist-border px-2 py-1 rounded-lg text-[9px] font-black uppercase hover:bg-secondary/10 transition-colors soft-brutalist-shadow active:translate-y-[1px] active:shadow-none"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <Textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={MAX_MESSAGE_CHARS} placeholder="Tulis ucapan..." className="soft-brutalist-input min-h-[140px] pb-14 resize-none" required />
                    <Button type="button" onClick={handleRefine} disabled={isRefining || !message} variant="accent" size="sm" className="absolute bottom-3 right-3 h-9 rounded-lg text-white font-bold">
                      {isRefining ? <Loader2 className="w-3 h-3 animate-spin" /> : <><Sparkles className="w-3 h-3 mr-2" /> Polesi AI</>}
                    </Button>
                  </div>
                </div>
                
                <Button type="submit" size="default" variant="secondary" className="w-full h-14 soft-brutalist-interactive rounded-xl font-black">
                  <Send className="mr-2 w-5 h-5" /> KIRIM PESAN
                </Button>
              </form>
            </framerMotion.div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  <p className="font-black uppercase text-xs tracking-widest opacity-40">Memuat Doa...</p>
                </div>
              ) : wishes.length === 0 ? (
                <div className="bg-white soft-brutalist-border soft-brutalist-shadow p-12 rounded-[32px] text-center">
                   <Smile className="w-16 h-16 mx-auto mb-4 opacity-20" />
                   <p className="font-black uppercase text-sm opacity-40 tracking-widest">Belum ada doa. Jadi yang pertama!</p>
                </div>
              ) : (
                <FramerAnimatePresence initial={false}>
                  {wishes.map((wish, idx) => {
                    const Icon = getIconComponent(wish.avatar_icon);
                    return (
                      <framerMotion.div
                        key={wish.id} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => setSelectedWish(wish)}
                        className="bg-white soft-brutalist-border soft-brutalist-shadow p-4 sm:p-5 flex gap-4 rounded-[24px] group cursor-pointer hover:bg-secondary/5 transition-colors"
                      >
                        <div className={cn("w-12 h-12 sm:w-14 sm:h-14 soft-brutalist-border rounded-2xl flex items-center justify-center shrink-0", wish.avatar_color)}>
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="text-sm sm:text-lg font-black uppercase truncate text-black">{wish.name}</h4>
                            <span className="text-[9px] font-bold opacity-40">{formatRelativeTime(wish.created_at)}</span>
                          </div>
                          <p className="text-sm sm:text-base font-bold leading-relaxed text-black italic line-clamp-2">"{wish.message}"</p>
                        </div>
                      </framerMotion.div>
                    );
                  })}
                </FramerAnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedWish} onOpenChange={(open) => !open && setSelectedWish(null)}>
        <DialogContent className="max-w-xl p-6 sm:p-8 soft-brutalist-border rounded-[32px] bg-white border-black">
          <DialogHeader className="mb-6">
            <div className="flex items-center gap-4">
              <div className={cn("w-14 h-14 soft-brutalist-border rounded-2xl flex items-center justify-center", selectedWish?.avatar_color)}>
                {selectedWish && (() => {
                  const Icon = getIconComponent(selectedWish.avatar_icon);
                  return <Icon className="w-7 h-7 text-black" />;
                })()}
              </div>
              <div>
                <DialogTitle className="text-xl sm:text-2xl font-black uppercase">{selectedWish?.name}</DialogTitle>
                <p className="text-[10px] font-bold opacity-40">{selectedWish?.created_at && formatRelativeTime(selectedWish.created_at)}</p>
              </div>
            </div>
          </DialogHeader>
          <p className="text-lg md:text-xl font-bold italic leading-relaxed">"{selectedWish?.message}"</p>
          <div className="mt-8 flex justify-end">
            <Button onClick={() => setSelectedWish(null)} className="h-12 px-8 soft-brutalist-interactive rounded-xl" variant="outline">TUTUP</Button>
          </div>
        </DialogContent>
      </Dialog>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
      `}</style>
    </section>
  );
}
