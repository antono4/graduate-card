
import data from '@/app/lib/placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

/**
 * Mendapatkan URL gambar berdasarkan ID tanpa versioning tambahan.
 * Path statis memungkinkan browser melakukan caching dengan lebih baik.
 */
export function getImageUrlById(id: string): string {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageUrl : `https://picsum.photos/seed/${id}/800/1000`;
}

export function getImageHintById(id: string): string {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? image.imageHint : 'placeholder image';
}
