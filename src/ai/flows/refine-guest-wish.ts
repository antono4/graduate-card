'use server';
/**
 * @fileOverview Alat GenAI untuk menyempurnakan pesan harapan tamu wisuda.
 *
 * - refineGuestWish - Fungsi yang menyempurnakan pesan harapan wisuda dari tamu.
 * - RefineGuestWishInput - Tipe input untuk fungsi refineGuestWish.
 * - RefineGuestWishOutput - Tipe return untuk fungsi refineGuestWish.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineGuestWishInputSchema = z.object({
  originalWish: z
    .string()
    .describe(
      'Pesan harapan wisuda asli dari tamu yang akan disempurnakan.'
    ),
});
export type RefineGuestWishInput = z.infer<typeof RefineGuestWishInputSchema>;

const RefineGuestWishOutputSchema = z.object({
  refinedMessage: z
    .string()
    .describe(
      'Pesan harapan wisuda yang disempurnakan, tetap mempertahankan jiwa pesan asli.'
    ),
});
export type RefineGuestWishOutput = z.infer<typeof RefineGuestWishOutputSchema>;

export async function refineGuestWish(
  input: RefineGuestWishInput
): Promise<RefineGuestWishOutput> {
  return refineGuestWishFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineGuestWishPrompt',
  input: {schema: RefineGuestWishInputSchema},
  output: {schema: RefineGuestWishOutputSchema},
  prompt: `Anda adalah asisten AI yang berspesialisasi dalam memperhalus pesan ucapan selamat wisuda tanpa menghilangkan kepribadian pengirim.

Tugas Anda adalah merapikan pesan yang diberikan agar lebih elegan dan enak dibaca, namun Anda HARUS SANGAT BERHATI-HATI untuk:
1. JANGAN menghapus atau mengubah istilah populer, slang, atau ekspresi khas seperti "menyala abangku", "gaspol", "mantap", "idola", atau sejenisnya.
2. Integrasikan ekspresi tersebut ke dalam kalimat yang lebih rapi secara tata bahasa.
3. Perbaiki ejaan dan tanda baca.
4. JANGAN mengubah makna asli atau membuat pesan menjadi terlalu kaku/formal jika aslinya akrab.
5. Cukup berikan hasil polesan pesan saja tanpa kata pengantar apa pun.

Pesan Asli: {{{originalWish}}}`,
});

const refineGuestWishFlow = ai.defineFlow(
  {
    name: 'refineGuestWishFlow',
    inputSchema: RefineGuestWishInputSchema,
    outputSchema: RefineGuestWishOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
