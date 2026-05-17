
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'Undangan Wisuda Jimmy Randa Putra, S.Kom. | UPI YPTK Padang',
  description: 'Mari rayakan momen bersejarah wisuda Jimmy Randa Putra, S.Kom. dari Teknik Informatika UPI YPTK Padang pada 19 Mei 2026. Kehadiran Anda adalah kehormatan bagi kami.',
  keywords: ['Undangan Wisuda', 'Jimmy Randa Putra', 'S.Kom', 'Teknik Informatika', 'UPI YPTK Padang', 'Graduation Invitation', 'Padang', 'Sumatera Barat'],
  authors: [{ name: 'Jimmy Randa Putra' }],
  metadataBase: new URL('https://undangan-wisuda-jimmy.vercel.app'),
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎓</text></svg>',
  },
  openGraph: {
    title: 'Undangan Wisuda Jimmy Randa Putra, S.Kom. Official',
    description: 'Rayakan kelulusan Jimmy pada 19 Mei 2026 di UPI Convention Center Padang. Cek detail undangannya di sini!',
    url: 'https://undangan-wisuda-jimmy.vercel.app',
    siteName: 'Undangan Wisuda Jimmy',
    images: [
      {
        url: '/images/gallery-1.png',
        width: 1200,
        height: 630,
        alt: 'Pratinjau Undangan Wisuda Jimmy Randa Putra, S.Kom.',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Undangan Wisuda Jimmy Randa Putra, S.Kom.',
    description: 'Mari merayakan momen kelulusan Jimmy pada 19 Mei 2026.',
    images: ['/images/gallery-1.png'],
    creator: '@jimmyranda',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
