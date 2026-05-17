
import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
const version = data.version || '1.0.0';

/**
 * Mendapatkan URL gambar berdasarkan ID dengan penambahan cache-busting versioning.
 * Jika Anda mengganti file gambar di folder public, cukup naikkan angka "version" di placeholder-images.json
 */
export function getImageUrlById(id: string): string {
  const image = PlaceHolderImages.find(img => img.id === id);
  const baseUrl = image ? image.imageUrl : `https://picsum.photos/seed/${id}/800/1000`;
  // Menambahkan parameter versi untuk menghindari cache browser yang membandel
  return `${baseUrl}?v=${version}`;
}

export function getImageHintById(id: string): string {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageHint : 'placeholder image';
}
