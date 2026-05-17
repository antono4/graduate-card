"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getImageUrlById, getImageHintById } from '@/lib/placeholder-images';

interface GalleryProps {
  onImageClick?: (url: string) => void;
}

export function Gallery({ onImageClick }: GalleryProps) {
  const images = [
    { id: 'gallery-1', span: 'md:col-span-8', aspect: 'aspect-video md:aspect-auto' },
    { id: 'gallery-2', span: 'md:col-span-4', aspect: 'aspect-square md:aspect-auto' },
    { id: 'gallery-3', span: 'md:col-span-4', aspect: 'aspect-square md:aspect-auto' },
    { id: 'gallery-4', span: 'md:col-span-8', aspect: 'aspect-video md:aspect-auto' },
  ];

  return (
    <section className="py-16 sm:py-24 px-4 overflow-hidden bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-[0.85] mb-4 text-black">
              ARSIP<br/><span className="text-primary">MEMORI</span>
            </h2>
            <p className="text-sm sm:text-base font-bold leading-relaxed max-w-md opacity-70">
              Kilas balik perjalanan yang membentuk masa depan. Setiap foto menyimpan cerita perjuangan.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-primary font-black text-6xl lg:text-8xl opacity-10 leading-none select-none">
              2022 • 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6 lg:h-[650px]">
          {images.map((img, idx) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onImageClick?.(getImageUrlById(img.id))}
              className={`${img.span} ${img.aspect} relative soft-brutalist-border soft-brutalist-shadow overflow-hidden rounded-[24px] group cursor-zoom-in`}
            >
              <Image 
                src={getImageUrlById(img.id)} 
                alt={`Memory ${idx + 1}`} 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                data-ai-hint={getImageHintById(img.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
